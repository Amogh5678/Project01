import { createRide, getFareService } from "../services/rideService.js";
import { validationResult } from "express-validator";

export const rideCreate = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { userId, pickup, destination, vehicleType } = req.body;

    try {
        const ride = await createRide({ user: req.user._id, pickup, destination, vehicleType });
        return res.status(201).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

};

export const getFare = async (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {pickup, destination} = req.query;

    try{
        const fare = await getFareService(pickup, destination);
        return res.status(200).json(fare);
    }

    catch(err){

        console.log("error during getFare in ride controller");
        return res.status(500).json({ message: err.message });
    }

}