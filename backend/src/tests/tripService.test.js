import TripService from '../services/tripService.js';
import Trip from '../models/Trip.js';
import Truck from '../models/Truck.js';
import Trailer from '../models/Trailer.js';
import User from '../models/User.js';
import { validateCreateTrip, validateTripStatus } from '../validation/tripValidate.js';

jest.mock('../validation/tripValidate.js', () => ({
    validateCreateTrip: jest.fn(),
    validateTripStatus: jest.fn()
}));

jest.mock('../models/Trip.js', () => ({
    __esModule: true,
    default: {
        find: jest.fn(),
        findById: jest.fn(),
        create: jest.fn(),
        findByIdAndUpdate: jest.fn(),
        findByIdAndDelete: jest.fn(),
    },
}));

jest.mock('../models/Truck.js', () => ({
    __esModule: true,
    default: {
        findById: jest.fn(),
        findByIdAndUpdate: jest.fn(),
    },
}));

jest.mock('../models/Trailer.js', () => ({
    __esModule: true,
    default: {
        findById: jest.fn(),
        findByIdAndUpdate: jest.fn(),
    },
}));

jest.mock('../models/User.js', () => ({
    __esModule: true,
    default: {
        findById: jest.fn(),
        findByIdAndUpdate: jest.fn(),
    },
}));

describe('TripService Unit Tests', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('createTrip()', () => {
        const mockData = {
            departure: 'Paris',
            destination: 'Lyon',
            truckId: 'truck_123',
            trailerId: 'trailer_123',
            driverId: 'driver_123',
            startDate: '2023-10-10'
        };

        it('should create a trip successfully when all resources are available', async () => {
            validateCreateTrip.mockReturnValue(null);

            Truck.findById.mockResolvedValue({ _id: 'truck_123', status: 'AVAILABLE', save: jest.fn().mockResolvedValue(true) });
            Trailer.findById.mockResolvedValue({ _id: 'trailer_123', status: 'AVAILABLE', save: jest.fn().mockResolvedValue(true) });
            User.findById.mockResolvedValue({ _id: 'driver_123', role: 'DRIVER', status: 'AVAILABLE' });

            const mockTrip = { ...mockData, _id: 'trip_999', status: 'PLANNED' };
            Trip.create.mockResolvedValue(mockTrip);

            const result = await TripService.createTrip(mockData);

            expect(validateCreateTrip).toHaveBeenCalledWith(mockData);
            expect(Truck.findById).toHaveBeenCalledWith('truck_123');
            expect(result).toEqual(mockTrip);
        });

        it('should throw error if Truck is not available', async () => {
            validateCreateTrip.mockReturnValue(null);
            Truck.findById.mockResolvedValue({ _id: 'truck_123', status: 'IN_TRANSIT' });

            await expect(TripService.createTrip(mockData))
                .rejects
                .toThrow('Truck is not available');
            
            expect(Trip.create).not.toHaveBeenCalled();
        });

        it('should throw error if Driver is not a DRIVER role', async () => {
            validateCreateTrip.mockReturnValue(null);
            Truck.findById.mockResolvedValue({ status: 'AVAILABLE', save: jest.fn().mockResolvedValue(true) });
            Trailer.findById.mockResolvedValue({ status: 'AVAILABLE', save: jest.fn().mockResolvedValue(true) });
            User.findById.mockResolvedValue({ _id: 'driver_123', role: 'ADMIN', status: 'AVAILABLE' });

            await expect(TripService.createTrip(mockData))
                .rejects
                .toThrow(/Invalid driver/);
        });
    });

    describe('updateTripStatus() - Completing a Trip', () => {
        const tripId = 'trip_999';
        const userId = 'driver_123';
        
        const completeData = {
            status: 'COMPLETED',
            currentMileage: 50000,
            fuelLevel: 80
        };

        it('should complete trip and update truck mileage', async () => {
            validateTripStatus.mockReturnValue(null);

            const mockTripSave = jest.fn().mockResolvedValue(true);
            const mockTruckSave = jest.fn().mockResolvedValue(true);
            const mockTrailerSave = jest.fn().mockResolvedValue(true);

            const mockTrip = { 
                _id: tripId, 
                truck: { _id: 'truck_123' },
                driver: userId, 
                trailer: 'trailer_123',
                status: 'IN_PROGRESS',
                startMileage: 40000,
                save: mockTripSave
            };
            Trip.findById.mockResolvedValue(mockTrip);

            const mockTruck = { _id: 'truck_123', status: 'IN_TRANSIT', save: mockTruckSave };
            const mockTrailer = { _id: 'trailer_123', status: 'IN_TRANSIT', save: mockTrailerSave };
            Truck.findById.mockResolvedValue(mockTruck);
            Trailer.findById.mockResolvedValue(mockTrailer);

            await TripService.updateTripStatus(tripId, userId, completeData);

            expect(validateTripStatus).toHaveBeenCalledWith(completeData);

            expect(mockTrip.status).toBe('COMPLETED');
            expect(mockTripSave).toHaveBeenCalled();

            expect(mockTruck.currentMileage).toBe(50000);
            expect(mockTruck.fuelLevel).toBe(80);
            expect(mockTruck.status).toBe('AVAILABLE');
            expect(mockTruckSave).toHaveBeenCalled();

            expect(mockTrailer.status).toBe('AVAILABLE');
            expect(mockTrailerSave).toHaveBeenCalled();
        });
    });
});