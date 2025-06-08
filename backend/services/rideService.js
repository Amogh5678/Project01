import rideModel from "../models/ridesModel.js";
import { fetchDistance } from "./mapsService.js";
import crypto from 'crypto'

export const getFareService = async (pickup, destination)=>{
    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }

    const distanceData = await fetchDistance(pickup, destination);

    const baseFare = {
        auto: 30,
        car: 50,
        moto: 20
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        moto: 8
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        moto: 1.5
    };

    if (!distanceData || !distanceData.distance || !distanceData.duration) {
        throw new Error('Invalid distance data received');
    }

    const fare = {
        auto: Math.round(baseFare.auto + ((distanceData.distance.value / 1000) * perKmRate.auto) + ((distanceData.duration.value / 60) * perMinuteRate.auto)),
        car: Math.round(baseFare.car + ((distanceData.distance.value / 1000) * perKmRate.car) + ((distanceData.duration.value / 60) * perMinuteRate.car)),
        moto: Math.round(baseFare.moto + ((distanceData.distance.value / 1000) * perKmRate.moto) + ((distanceData.duration.value / 60) * perMinuteRate.moto))
    };


    return fare;
}
function getOtp(num) {
    function generateOtp(num) {
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return otp;
    }
    return generateOtp(num);
}

export const createRide = async({
    user, pickup, destination, vehicleType
}) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required');
    }

    const fare = await getFareService(pickup, destination);

    console.log(fare);

    const ride = rideModel.create({
        user,
        pickup,
        destination,
        otp: getOtp(6),
        fare: fare[ vehicleType ]
    })

    return ride;
}