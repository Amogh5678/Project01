import express from 'express'
import {body} from 'express-validator'
import { authUser } from '../middlewares/authMiddleware.js';
import { rideCreate } from '../controllers/rideController.js';

const router = express.Router();

router.post('/create',
    authUser,
    body('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    body('vehicleType').isString().isIn([ 'auto', 'car', 'moto' ]).withMessage('Invalid vehicle type'),
   rideCreate
);



export default router;