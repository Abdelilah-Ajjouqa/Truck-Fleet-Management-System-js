import Truck from '../models/Truck.js';
import TruckService from '../services/truckService.js';
import { validateTruck } from '../validation/truckValidate.js';

jest.mock('../validation/truckValidate.js');
jest.mock('../models/Truck.js', () => {
    return {
        __esModule: true,
        default: {
            findOne: jest.fn(),
            create: jest.fn(),
            find: jest.fn(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
        },
    };
});

describe('TruckService Unit Tests', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('createTruck()', () => {
        const mockTruckData = {
            matricule: '1234-A-50',
            model: 'Volvo FH16',
            status: 'AVAILABLE'
        };

        it('should create a new truck successfully', async () => {
            validateTruck.mockReturnValue(null); // Validation passes
            Truck.findOne.mockResolvedValue(null); // No duplicate
            
            const mockCreatedTruck = { ...mockTruckData, _id: 'truck_123' };
            Truck.create.mockResolvedValue(mockCreatedTruck);

            const result = await TruckService.createTruck(mockTruckData);

            expect(validateTruck).toHaveBeenCalledWith(mockTruckData);
            expect(Truck.findOne).toHaveBeenCalledWith({ matricule: mockTruckData.matricule });
            expect(Truck.create).toHaveBeenCalledWith(mockTruckData);
            expect(result).toEqual(mockCreatedTruck);
        });

        it('should throw error if validation fails', async () => {
            validateTruck.mockReturnValue('Validation Error');

            await expect(TruckService.createTruck(mockTruckData))
                .rejects
                .toThrow('Validation Error');
                
            expect(Truck.create).not.toHaveBeenCalled();
        });

        it('should throw error if truck already exists', async () => {
            validateTruck.mockReturnValue(null);
            Truck.findOne.mockResolvedValue({ _id: 'existing_id' });

            await expect(TruckService.createTruck(mockTruckData))
                .rejects
                .toThrow(/already exists/);
        });
    });

    describe('getAllTrucks()', () => {
        it('should return all trucks sorted by date', async () => {
            const mockTrucks = [{ matricule: 'A' }, { matricule: 'B' }];
            
            const mockSort = jest.fn().mockResolvedValue(mockTrucks);
            Truck.find.mockReturnValue({ sort: mockSort });

            const result = await TruckService.getAllTrucks();

            expect(Truck.find).toHaveBeenCalledWith({});
            expect(mockSort).toHaveBeenCalledWith({ createdAt: -1 });
            expect(result).toEqual(mockTrucks);
        });
    });

    describe('updateTruck()', () => {
        it('should update a truck successfully', async () => {
            const updateData = { status: 'MAINTENANCE' };
            const mockUpdatedTruck = { _id: '123', ...updateData };

            Truck.findByIdAndUpdate.mockResolvedValue(mockUpdatedTruck);

            const result = await TruckService.updateTruck('123', updateData);

            expect(Truck.findByIdAndUpdate).toHaveBeenCalledWith('123', updateData, { new: true });
            expect(result).toEqual(mockUpdatedTruck);
        });

        it('should throw 404 if truck not found', async () => {
            Truck.findByIdAndUpdate.mockResolvedValue(null);

            await expect(TruckService.updateTruck('invalid_id', {}))
                .rejects
                .toThrow('Truck not found');
        });
    });

    describe('deleteTruck()', () => {
        it('should delete a truck successfully', async () => {
            Truck.findByIdAndDelete.mockResolvedValue({ _id: '123' });

            const result = await TruckService.deleteTruck('123');

            expect(Truck.findByIdAndDelete).toHaveBeenCalledWith('123');
            expect(result).toEqual({ message: 'Truck deleted successfully' });
        });

        it('should throw 404 if truck to delete is not found', async () => {
            Truck.findByIdAndDelete.mockResolvedValue(null);

            await expect(TruckService.deleteTruck('invalid_id'))
                .rejects
                .toThrow('Truck not found');
        });
    });
});