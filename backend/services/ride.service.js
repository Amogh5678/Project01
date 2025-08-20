const rideModel = require('../models/ride.model.js');
const mapService = require('./maps.service.js');
const Pricing = require('../models/pricing.model.js'); // NEW

const bcrypt = require('bcrypt');
const crypto = require('crypto');

// async function getFare(pickup, destination) {

//     if (!pickup || !destination) {
//         throw new Error('Pickup and destination are required');
//     }

//     const distanceTime = await mapService.getDistanceTime(pickup, destination);

//     const baseFare = {
//         auto: 30,
//         car: 50,
//         moto: 20
//     };

//     const perKmRate = {
//         auto: 10,
//         car: 15,
//         moto: 8
//     };

//     const perMinuteRate = {
//         auto: 2,
//         car: 3,
//         moto: 1.5
//     };



//     const fare = {
//         auto: Math.round(baseFare.auto + ((distanceTime.distance.value / 1000) * perKmRate.auto) + ((distanceTime.duration.value / 60) * perMinuteRate.auto)),
//         car: Math.round(baseFare.car + ((distanceTime.distance.value / 1000) * perKmRate.car) + ((distanceTime.duration.value / 60) * perMinuteRate.car)),
//         moto: Math.round(baseFare.moto + ((distanceTime.distance.value / 1000) * perKmRate.moto) + ((distanceTime.duration.value / 60) * perMinuteRate.moto))
//     };

//     return fare;

// }

async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error('Pickup and destination are required');
  }

  const distanceTime = await mapService.getDistanceTime(pickup, destination);
  const km = (distanceTime.distance.value || 0) / 1000; // meters -> km
  const minutes = (distanceTime.duration.value || 0) / 60; // seconds -> minutes

  // fetch active pricing rows (GLOBAL for now)
  const vehicleTypes = ['auto', 'car', 'moto'];
  const pricingDocs = await Pricing.find({
    vehicleType: { $in: vehicleTypes },
    city: 'GLOBAL',
    active: true
  });

  // index by vehicleType
  const byType = {};
  for (const doc of pricingDocs) byType[doc.vehicleType] = doc;

  // compute dynamic fares
  const fare = {};
  for (const vt of vehicleTypes) {
    const p = byType[vt];
    if (!p) continue; // not configured
    const raw =
      p.baseFare +
      (km * p.perKmRate) +
      (minutes * p.perMinuteRate);

    // apply surge on the total (you can change to apply only on variable component if you prefer)
    fare[vt] = Math.round(raw * (p.surgeMultiplier || 1));
  }

  return fare; // { auto, car, moto } (only for those configured)
}

module.exports.getFare = getFare;


function getOtp(num) {
    function generateOtp(num) {
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return otp;
    }
    return generateOtp(num);
}


// module.exports.createRide = async ({
//     user, pickup, destination, vehicleType
// }) => {
//     if (!user || !pickup || !destination || !vehicleType) {
//         throw new Error('All fields are required');
//     }

//     const fare = await getFare(pickup, destination);



//     const ride = rideModel.create({
//         user,
//         pickup,
//         destination,
//         otp: getOtp(6),
//         fare: fare[ vehicleType ]
//     })

//     return ride;
// }

module.exports.createRide = async ({ user, pickup, destination, vehicleType }) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error('All fields are required');
  }

  // reuse the dynamic pricing result for all types
  const fareMap = await getFare(pickup, destination);
  if (!fareMap[vehicleType]) {
    throw new Error(`Pricing not configured for ${vehicleType}`);
  }

  const ride = rideModel.create({
    user,
    pickup,
    destination,
    otp: getOtp(6),
    fare: fareMap[vehicleType],  // snapshot final fare
    vehicleType
  });

  return ride;
};

module.exports.confirmRide = async ({
    rideId, captain
}) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'accepted',
        captain: captain._id
    })

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    return ride;
}

module.exports.startRide = async ({ rideId, otp, captain }) => {
    if (!rideId || !otp) {
        throw new Error('Ride id and OTP are required');
    }

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'accepted') {
        throw new Error('Ride not accepted');
    }

    if (ride.otp !== otp) {
        throw new Error('Invalid OTP');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'ongoing'
    })

    return ride;
}

module.exports.endRide = async ({ rideId, captain }) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    const ride = await rideModel.findOne({
        _id: rideId,
        captain: captain._id
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'ongoing') {
        throw new Error('Ride not ongoing');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'completed'
    })

    return ride;
}
    