import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './src/models/User.js';
import Truck from './src/models/Truck.js';
import Trailer from './src/models/Trailer.js';
import Trip from './src/models/Trip.js';

dotenv.config();

const MONGO_URL = process.env.MONGO_URL || 'mongodb://mongo:27017/truckfleet';

async function seed() {
    try {
        console.log(`Connecting to MongoDB at: ${MONGO_URL}`);
        await mongoose.connect(MONGO_URL);
        console.log('Connected to MongoDB successfully.');

        // Clean previous data
        console.log('Clearing existing collections...');
        await Promise.all([
            User.deleteMany({}),
            Truck.deleteMany({}),
            Trailer.deleteMany({}),
            Trip.deleteMany({})
        ]);
        console.log('Collections cleared.');

        // 1. Seed Users
        console.log('Seeding Users...');
        const adminPassword = await bcrypt.hash('Admin123456!', 10);
        const driverPassword = await bcrypt.hash('Driver123456!', 10);

        const admin = await User.create({
            firstName: 'Tariq',
            lastName: 'Mansouri',
            email: 'admin@truckfleet.com',
            password: adminPassword,
            role: 'ADMIN',
            isActive: true
        });

        const drivers = await User.create([
            {
                firstName: 'Omar',
                lastName: 'Bennani',
                email: 'driver.omar@truckfleet.com',
                password: driverPassword,
                role: 'DRIVER',
                isActive: true
            },
            {
                firstName: 'Karim',
                lastName: 'El Amrani',
                email: 'driver.karim@truckfleet.com',
                password: driverPassword,
                role: 'DRIVER',
                isActive: true
            },
            {
                firstName: 'Hassan',
                lastName: 'Chaoui',
                email: 'driver.hassan@truckfleet.com',
                password: driverPassword,
                role: 'DRIVER',
                isActive: true
            },
            {
                firstName: 'Youssef',
                lastName: 'Tazi',
                email: 'driver.youssef@truckfleet.com',
                password: driverPassword,
                role: 'DRIVER',
                isActive: true
            }
        ]);

        console.log(`Created 1 Admin and ${drivers.length} Drivers.`);

        // 2. Seed Trailers (types: FRIGO, BACHE, PLATEAU, CITERNE)
        console.log('Seeding Trailers...');
        const trailers = await Trailer.create([
            {
                matricule: 'TR-1029-A',
                type: 'FRIGO',
                status: 'IN_TRANSIT',
                tireCondition: 'GOOD'
            },
            {
                matricule: 'TR-2045-B',
                type: 'BACHE',
                status: 'IN_TRANSIT',
                tireCondition: 'GOOD'
            },
            {
                matricule: 'TR-3088-C',
                type: 'PLATEAU',
                status: 'RESERVED',
                tireCondition: 'GOOD'
            },
            {
                matricule: 'TR-4012-D',
                type: 'CITERNE',
                status: 'AVAILABLE',
                tireCondition: 'GOOD'
            },
            {
                matricule: 'TR-5099-E',
                type: 'FRIGO',
                status: 'MAINTENANCE',
                tireCondition: 'WORN'
            },
            {
                matricule: 'TR-6021-F',
                type: 'BACHE',
                status: 'AVAILABLE',
                tireCondition: 'GOOD'
            }
        ]);
        console.log(`Created ${trailers.length} Trailers.`);

        // 3. Seed Trucks
        console.log('Seeding Trucks...');
        const trucks = await Truck.create([
            {
                matricule: '12450-A-26',
                model: 'Volvo FH16 750 Globetrotter',
                status: 'IN_TRANSIT',
                currentMileage: 184500,
                fuelLevel: 68,
                tireCondition: 'GOOD',
                lastMaintenanceDate: new Date('2026-08-15'),
                lastMaintenanceMileage: 175000,
                assignedDriver: drivers[0]._id // Omar
            },
            {
                matricule: '34890-B-1',
                model: 'Scania R500 V8 Highline',
                status: 'IN_TRANSIT',
                currentMileage: 142100,
                fuelLevel: 55,
                tireCondition: 'GOOD',
                lastMaintenanceDate: new Date('2026-09-01'),
                lastMaintenanceMileage: 138000,
                assignedDriver: drivers[1]._id // Karim
            },
            {
                matricule: '56120-D-6',
                model: 'Mercedes-Benz Actros 1845 GigaSpace',
                status: 'RESERVED',
                currentMileage: 98400,
                fuelLevel: 92,
                tireCondition: 'GOOD',
                lastMaintenanceDate: new Date('2026-09-20'),
                lastMaintenanceMileage: 95000,
                assignedDriver: drivers[2]._id // Hassan
            },
            {
                matricule: '78230-A-33',
                model: 'MAN TGX 18.510 EfficientLine',
                status: 'AVAILABLE',
                currentMileage: 64500,
                fuelLevel: 85,
                tireCondition: 'GOOD',
                lastMaintenanceDate: new Date('2026-07-10'),
                lastMaintenanceMileage: 60000,
                assignedDriver: drivers[3]._id // Youssef
            },
            {
                matricule: '91045-H-40',
                model: 'Renault Trucks T High 520 Sleeper',
                status: 'AVAILABLE',
                currentMileage: 215000,
                fuelLevel: 40,
                tireCondition: 'WORN',
                lastMaintenanceDate: new Date('2026-06-05'),
                lastMaintenanceMileage: 200000,
                assignedDriver: null
            },
            {
                matricule: '45670-B-7',
                model: 'DAF XF 530 Super Space Cab',
                status: 'MAINTENANCE',
                currentMileage: 289300,
                fuelLevel: 25,
                tireCondition: 'CRITICAL',
                lastMaintenanceDate: new Date('2026-04-12'),
                lastMaintenanceMileage: 270000,
                assignedDriver: null
            }
        ]);
        console.log(`Created ${trucks.length} Trucks.`);

        // 4. Seed Trips
        console.log('Seeding Trips...');
        const trips = await Trip.create([
            {
                truck: trucks[0]._id, // Volvo FH16
                trailer: trailers[0]._id, // FRIGO
                driver: drivers[0]._id, // Omar
                departure: 'Casablanca Port',
                destination: 'Tangier Med Free Zone',
                startDate: new Date('2026-10-18T07:00:00Z'),
                status: 'IN_PROGRESS',
                startMileage: 184150,
                fuelConsumed: 45,
                driverRemarks: 'Transporting temperature-controlled seafood (-18°C). Route via A1 highway on schedule.'
            },
            {
                truck: trucks[1]._id, // Scania R500
                trailer: trailers[1]._id, // BACHE
                driver: drivers[1]._id, // Karim
                departure: 'Casablanca Ain Sebaa',
                destination: 'Marrakech Industrial Zone',
                startDate: new Date('2026-10-18T09:30:00Z'),
                status: 'IN_PROGRESS',
                startMileage: 141860,
                fuelConsumed: 38,
                driverRemarks: 'Consumer goods distribution. Traffic fluid past Berrechid toll.'
            },
            {
                truck: trucks[2]._id, // Actros
                trailer: trailers[2]._id, // PLATEAU
                driver: drivers[2]._id, // Hassan
                departure: 'Tangier Automotive City',
                destination: 'Kenitra Atlantic Free Zone',
                startDate: new Date('2026-10-19T08:00:00Z'),
                status: 'PLANNED',
                startMileage: 98400,
                driverRemarks: 'Scheduled automotive components transport. Pre-departure inspection complete.'
            },
            {
                truck: trucks[3]._id, // MAN TGX
                trailer: trailers[5]._id, // BACHE
                driver: drivers[3]._id, // Youssef
                departure: 'Agadir Souss Port',
                destination: 'Casablanca Logistics Park',
                startDate: new Date('2026-10-15T06:00:00Z'),
                endDate: new Date('2026-10-15T14:30:00Z'),
                status: 'COMPLETED',
                startMileage: 63980,
                endMileage: 64500,
                fuelConsumed: 145,
                driverRemarks: 'Agricultural produce delivered on time. Vehicle performed optimally.'
            },
            {
                truck: trucks[0]._id, // Volvo FH16
                trailer: trailers[0]._id, // FRIGO
                driver: drivers[0]._id, // Omar
                departure: 'Fes Saïss Industrial',
                destination: 'Casablanca Ain Sebaa',
                startDate: new Date('2026-10-12T08:00:00Z'),
                endDate: new Date('2026-10-12T13:45:00Z'),
                status: 'COMPLETED',
                startMileage: 183850,
                endMileage: 184150,
                fuelConsumed: 88,
                driverRemarks: 'Smooth delivery, cold chain logs verified and customer signed receipt.'
            },
            {
                truck: trucks[1]._id, // Scania R500
                trailer: trailers[3]._id, // CITERNE
                driver: drivers[1]._id, // Karim
                departure: 'Mohammedia Refinery',
                destination: 'Meknes Agropolis',
                startDate: new Date('2026-10-10T07:00:00Z'),
                endDate: new Date('2026-10-10T12:15:00Z'),
                status: 'COMPLETED',
                startMileage: 141620,
                endMileage: 141860,
                fuelConsumed: 72,
                driverRemarks: 'Liquid industrial delivery completed safely following ADR hazardous protocol.'
            },
            {
                truck: trucks[4]._id, // Renault
                trailer: trailers[4]._id, // FRIGO
                driver: drivers[2]._id, // Hassan
                departure: 'Oujda Angad',
                destination: 'Fes Bensouda',
                startDate: new Date('2026-10-06T09:00:00Z'),
                endDate: new Date('2026-10-06T15:30:00Z'),
                status: 'COMPLETED',
                startMileage: 214680,
                endMileage: 215000,
                fuelConsumed: 105,
                driverRemarks: 'Completed delivery. Noticed minor tire wear on trailer rear axle during post-trip check.'
            },
            {
                truck: trucks[5]._id, // DAF
                trailer: trailers[4]._id, // FRIGO
                driver: drivers[3]._id, // Youssef
                departure: 'Casablanca',
                destination: 'Beni Mellal',
                startDate: new Date('2026-10-03T10:00:00Z'),
                endDate: new Date('2026-10-03T11:00:00Z'),
                status: 'CANCELLED',
                startMileage: 289300,
                endMileage: 289300,
                fuelConsumed: 0,
                driverRemarks: 'Cancelled before departure due to tire condition warning during safety inspection.'
            }
        ]);
        console.log(`Created ${trips.length} Trips.`);

        console.log('\n--- SEED SUMMARY ---');
        console.log(`Users:    ${1 + drivers.length} (1 Admin, ${drivers.length} Drivers)`);
        console.log(`Trucks:   ${trucks.length}`);
        console.log(`Trailers: ${trailers.length}`);
        console.log(`Trips:    ${trips.length} (2 In Progress, 1 Planned, 4 Completed, 1 Cancelled)`);
        console.log('--------------------');
        console.log('Seeding completed successfully!');
    } catch (error) {
        console.error('Error during seeding:', error);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB.');
    }
}

seed();
