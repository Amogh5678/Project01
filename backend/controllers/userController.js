import userModel from '../models/userModel.js'
//import userService from '../services/userService.js'
import {createUser} from '../services/userService.js'
import {validationResult} from 'express-validator';


export const registerUser = async(req, res, next) =>{

    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return  res.status(400).json({errors : errors.array()});
    }

    
        const {fullname, email, password} = req.body;
        //console.log(req.body);

        const hashedPassword =await userModel.hashPassword(password);

        const user = await createUser({
            firstname : fullname.firstname,
            lastname : fullname.lastname,
            email,
            password : hashedPassword
        })

        const token = user.generateAuthToken();


        res.status(201).json({token, user});

}
export const loginUser = async (req, res, next)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty())
  {
    return  res.status(400).json({errors : errors.array()});
  }

  const {email, password} = req.body;

  const user = await userModel.findOne({email}).select("+password");

  if(!user)
  {
  return  res.status(401).json({message : "user doesnt exist"});
  }

  const isMatch = await user.comparePassword(password);

  if(!isMatch)
  {
    return  res.status(401).json({message : "email or password is wrong"}); 
  }

  const token = user.generateAuthToken();

  return res.status(200).json({user, token});

}
// const userController = { registerUser, loginUser };
// export default userController;