import TruckService from '../services/truckService.js';

class TruckController {

    static createTruck = async (req, res, next) => {
        try {
            const truck = await TruckService.createTruck(req.body);
            res.status(201).json(truck);
        } catch (error) {
            next(error);
        }
    }

    static getAllTrucks = async (req, res, next) => {
        try {
            const filters = req.query;
            const trucks = await TruckService.getAllTrucks(filters);
            res.status(200).json(trucks);
        } catch (error) {
            next(error);
        }
    }

    static getTruckById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const truck = await TruckService.getTruckById(id);
            res.status(200).json(truck);
        } catch (error) {
            next(error);
        }
    }

    static updateTruck = async (req, res, next) => {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const updatedTruck = await TruckService.updateTruck(id, updateData);
            res.status(200).json(updatedTruck);
        } catch (error) {
            next(error);
        }
    }

    static deleteTruck = async (req, res, next) => {
        try {
            const { id } = req.params;
            const result = await TruckService.deleteTruck(id);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
}

export default TruckController;