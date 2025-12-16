import Truck from '../models/Truck.js';
import { validateTruck } from '../validation/truckValidate.js';
import HttpError from '../config/HttpError.js';

class TruckService {
    static async createTruck(truckData) {
        const validationError = validateTruck(truckData);
        if (validationError) {
            throw new HttpError(validationError, 400);
        }

        const existingTruck = await Truck.findOne({ matricule: truckData.matricule });
        if (existingTruck) {
            throw new HttpError(`Truck with license plate ${truckData.matricule} already exists`, 409);
        }

        const newTruck = await Truck.create(truckData);
        return newTruck;
    }

    static async getAllTrucks(filter = {}) {
        const trucks = await Truck.find(filter).sort({ createdAt: -1 });
        return trucks;
    }

    static async getTruckById(id) {
        const truck = await Truck.findById(id);
        if (!truck) {
            throw new HttpError('Truck not found', 404);
        }
        return truck;
    }

    static async updateTruck(id, data) {
        const truck = await Truck.findByIdAndUpdate(id, data, { new: true });
        
        if (!truck) throw new HttpError('Truck not found', 404);
        return truck;
    }

    static async deleteTruck(id) {
        const deletedTruck = await Truck.findByIdAndDelete(id);
        if (!deletedTruck) {
            throw new HttpError('Truck not found', 404);
        }
        return { message: 'Truck deleted successfully' };
    }
}

export default TruckService;