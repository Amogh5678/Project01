import express from 'express';
import { authUser } from '../middlewares/authMiddleware.js';

//const {body} = require("experss-validator");
import {body} from 'express-validator'
import {registerUser, loginUser, getUserProfile, logoutUser} from '../controllers/userController.js'

const router = express.Router();
router.post('/register', [

    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('first nae=me must be 3 chars'),
    body('password').isLength({min:6}).withMessage('Password must be 5')

    //express validator is just validating and where to validate it is on userController
    //express validator is just checking what is wrong if something is wrong need to perform some actions this action is done in userCOntroller
    //so we require this validation in controller
], registerUser);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:6}).withMessage('Password must be 6')
], loginUser);


router.get('/profile', authUser,getUserProfile);

router.get('/logout',authUser, logoutUser);

export default router;