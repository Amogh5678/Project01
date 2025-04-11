import { authUser } from '../middlewares/authMiddleware.js';
import {getCoordinates} from '../controllers/mapsController.js'
import express from 'express'
import {query} from 'express-validator'
import {getDistanceTime} from '../controllers/mapsController.js';
const router = express.Router();

router.get('/get-coordinates',
    query('address').isString().isLength({ min: 3 }),
    authUser, getCoordinates);

    router.get('/get-distance-time',
        query('origin').isString().isLength({ min: 3 }),
        query('destination').isString().isLength({ min: 3 }),
        authUser,
        getDistanceTime
    )


export default router;