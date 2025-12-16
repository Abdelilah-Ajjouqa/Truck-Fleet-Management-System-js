import TripService from '../services/tripService.js';

class TripController {

    static createTrip = async (req, res, next) => {
        try {
            const trip = await TripService.createTrip(req.body);
            res.status(201).json(trip);
        } catch (error) {
            next(error);
        }
    }

    static getMyTrips = async (req, res, next) => {
        try {
            const trips = await TripService.getTrips(req.user._id, req.user.role);
            res.status(200).json(trips);
        } catch (error) {
            next(error);
        }
    }

    static updateStatus = async (req, res, next) => {
        try {
            const { id } = req.params;
            const result = await TripService.updateTripStatus(id, req.user._id, req.body);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    static deleteTrip = async (req, res, next) => {
        try {
            const result = await TripService.deleteTrip(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
}

export default TripController;