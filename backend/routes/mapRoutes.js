import { authUser } from '../middlewares/authMiddleware.js';
import {getCoordinates , getCompletionSuggestions, getDistanceTime} from '../controllers/mapsController.js'
import express from 'express'
import {query} from 'express-validator'

const router = express.Router();

router.get('/get-coordinates',
    query('address').isString().isLength({ min: 1 }),
    /*authUser,*/ getCoordinates);

    router.get('/get-distance-time',
        query('origin').isString().isLength({ min: 1 }),
        query('destination').isString().isLength({ min: 1 }),
       /*authUser,*/
        getDistanceTime
    );

    router.get('/get-suggestions',
        query('input').isString().isLength({ min: 1 }),
        /*authUser,*/
        getCompletionSuggestions
    )

export default router;