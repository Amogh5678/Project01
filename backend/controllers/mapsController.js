import {getAddressCoordinates} from '../services/mapsService.js'
import { validationResult } from 'express-validator';
import {fetchDistance, getAutoCompleteSuggestions} from '../services/mapsService.js'


export const getCoordinates = async (req, res, next)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {address} = req.query;

    try{
        const coordinates = await getAddressCoordinates(address);
        res.status(200).json(coordinates);

    }catch(err){
                res.status(500).json({messege: 'internal server error in maps controller'});
    }

}

export const getDistanceTime = async (req, res, next) => {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { origin, destination } = req.query;

        const distanceTime = await fetchDistance(origin, destination);

        res.status(200).json(distanceTime);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}
export const getCompletionSuggestions = async (req, res, next) => {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { input } = req.query;

        const suggestions = await getAutoCompleteSuggestions(input);

        res.status(200).json(suggestions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}
