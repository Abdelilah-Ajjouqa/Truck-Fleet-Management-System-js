import Trip from '../models/Trip.js';
import Trailer from '../models/Trailer.js';
import Truck from '../models/Truck.js';
import User from '../models/User.js';
import HttpError from '../config/HttpError.js';
import { validateCreateTrip, validateTripStatus } from '../validation/tripValidate.js';

class TripService {

    static async createTrip(tripData) {
        const error = validateCreateTrip(tripData);
        if (error) throw new HttpError(error, 400);

        const truck = await Truck.findById(tripData.truckId);
        if (!truck || truck.status !== 'AVAILABLE') {
            throw new HttpError('Truck is not available', 409);
        }

        const trailer = await Trailer.findById(tripData.trailerId);
        if (!trailer || trailer.status !== 'AVAILABLE') throw new HttpError('Trailer unavailable', 409);

        const driver = await User.findById(tripData.driverId);
        if (!driver || driver.role !== 'DRIVER') {
            throw new HttpError('Invalid driver selected', 400);
        }

        const newTrip = await Trip.create({
            truck: tripData.truckId,
            trailer: tripData.trailerId,
            driver: tripData.driverId,
            departure: tripData.departure,
            destination: tripData.destination,
            startDate: tripData.startDate,
            startMileage: tripData.startMileage,
            status: 'PLANNED'
        });

        truck.status = 'RESERVED';
        trailer.status = 'RESERVED';
        await truck.save();
        await trailer.save();

        return newTrip;
    }

    static async updateTripStatus(tripId, userId, updateData) {
        const error = validateTripStatus(updateData);
        if (error) throw new HttpError(error, 400);

        const trip = await Trip.findById(tripId);
        if (!trip) throw new HttpError('Trip not found', 404);

        if (trip.driver.toString() !== userId.toString()) {
            throw new HttpError('Not authorized to manage this trip', 403);
        }

        const truck = await Truck.findById(trip.truck._id);
        const trailer = await Trailer.findById(trip.trailer);

        if (updateData.status === 'IN_PROGRESS') {
            if (trip.status !== 'PLANNED') throw new HttpError('Trip already started or finished', 400);

            trip.status = 'IN_PROGRESS';

            truck.status = 'IN_TRANSIT';
            trailer.status = 'IN_TRANSIT';
        }
        else if (updateData.status === 'COMPLETED') {
            if (trip.status !== 'IN_PROGRESS') throw new HttpError('Trip must be in progress to complete', 400);

            if (updateData.currentMileage < trip.startMileage) {
                throw new HttpError('End mileage cannot be less than start mileage', 400);
            }

            trip.status = 'COMPLETED';
            trip.endDate = new Date();
            trip.endMileage = updateData.currentMileage;
            trip.driverRemarks = updateData.remarks;

            truck.status = 'AVAILABLE';
            truck.currentMileage = updateData.currentMileage;
            truck.fuelLevel = updateData.fuelLevel;

            trailer.status = 'AVAILABLE';
        }

        await trip.save();
        await truck.save();
        await trailer.save();

        return trip;
    }

    static async getTrips(userId, role) {
        let query = {};
        if (role === 'DRIVER') {
            query.driver = userId;
        }

        return await Trip.find(query)
            .populate('truck', 'matricule model')
            .populate('trailer', 'matricule type')
            .populate('driver', 'firstName lastName')
            .sort({ startDate: -1 });
    }
}

export default TripService;