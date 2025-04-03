import captainModel from "../models/captainModel.js"
import { createCaptain } from "../services/captainService.js"
import { validationResult } from "express-validator";
import blackListTokenModel from '../models/blackListTokenModel.js';


export const registerCaptain = async (req, res, next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle } = req.body;

    const isCaptainAlreadyExist = await captainModel.findOne({ email });

    if (isCaptainAlreadyExist) {
        return res.status(400).json({ message: 'Captain already exists' });
    }


    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    });

    const token = captain.generateAuthToken();

    res.status(201).json({ token, captain });
}

export const loginCaptain = async (req, res, next)=>{
    const errors = validationResult(req);
  if(!errors.isEmpty())
  {
    return  res.status(400).json({errors : errors.array()});
  }
    const {email, password} = req.body;

    
  const captain =  await captainModel.findOne({email}).select('+password');

  if(!captain)
  {
    return res.status(401).json({message : "captain doesnt exist"})
  }

  

  const isMatch = await captain.comparePassword(password)

  if(!isMatch)
  {
    return res.status(401).json({message : "invalid credentials"});
  }

  const token = captain.generateAuthToken();

  res.cookie('token', token);

  return res.status(200).json({captain, token});

}

export const getCaptainProfile = async (req, res, next) =>{
            console.log(req.captain)
  return res.status(200).json(req.captain);
}

export const logoutCaptain = async (req, res, next) =>{
    res.clearCookie('cookie');

    const token = req.cookies.token || req.headers.authorization.split(' ')[1];


        await blackListTokenModel.create({token});

        return res.status(401).json({message: "captain logged out"});
}