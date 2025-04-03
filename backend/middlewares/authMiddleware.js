import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import blackListTokenModel from '../models/blackListTokenModel.js'
import captainModel from '../models/captainModel.js'


export const authUser = async (req, res, next )=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if(!token)
    {
        return res.status(401).json({message: 'unauthorized token not recognized'});

    }

    const isBlackListed = await blackListTokenModel.findOne({token : token});

    if(isBlackListed)
    {
        return res.status(401).json({message : 'unauthorized'});
    }

    try{
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await userModel.findById(decoded._id);

        req.user = user;
        //console.log(user)

        return next();
    }
    catch{
            return res.status(401).json({message: 'unauthorized error caught'});
    }
}

export const authCaptain = async (req, res, next )=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if(!token)
    {
        return res.status(401).json({message: 'unauthorized token not recognized'});

    }

    const isBlackListed = await blackListTokenModel.findOne({token : token});

    if(isBlackListed)
    {
        return res.status(401).json({message : 'unauthorized'});
    }

    try{
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const captain = await captainModel.findById(decoded._id);

        req.captain = captain;
        //console.log(captain)

        return next();
    }
    catch{
            return res.status(401).json({message: 'unauthorized error caught'});
    }
}