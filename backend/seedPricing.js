require('dotenv').config();
const mongoose = require('mongoose');
const Pricing = require('./models/pricing.model.js');

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // same URI as your app
    const docs = [
      { city: 'GLOBAL', vehicleType: 'auto', baseFare: 30, perKmRate: 10, perMinuteRate: 2,   surgeMultiplier: 1 },
      { city: 'GLOBAL', vehicleType: 'car',  baseFare: 50, perKmRate: 15, perMinuteRate: 3,   surgeMultiplier: 1 },
      { city: 'GLOBAL', vehicleType: 'moto', baseFare: 20, perKmRate: 8,  perMinuteRate: 1.5, surgeMultiplier: 1 },
    ];

    // idempotent upserts
    await Promise.all(docs.map(d =>
      Pricing.updateOne(
        { city: d.city, vehicleType: d.vehicleType },
        { $set: d },
        { upsert: true }
      )
    ));
    console.log('✅ Pricing seeded/updated');
  } catch (e) {
    console.error(e);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
})();
