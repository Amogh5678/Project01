const mongoose = require('mongoose');

const pricingSchema = new mongoose.Schema(
  {
    vehicleType: { type: String, enum: ['auto', 'car', 'moto'], required: true },
    baseFare: { type: Number, required: true },
    perKmRate: { type: Number, required: true },
    perMinuteRate: { type: Number, required: true },
    surgeMultiplier: { type: Number, default: 1 }, // keep 1 by default
    city: { type: String, default: 'GLOBAL' },     // optional: for future city-wise pricing
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

// prevent duplicates per (city, vehicleType)
pricingSchema.index({ city: 1, vehicleType: 1 }, { unique: true });

module.exports = mongoose.model('Pricing', pricingSchema);
