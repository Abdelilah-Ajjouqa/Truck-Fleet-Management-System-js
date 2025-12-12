import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
    truck: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Truck',
        required: true
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    departure: { type: String, required: true },
    destination: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },

    status: {
        type: String,
        enum: ['PLANNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'],
        default: 'PLANNED'
    },

    startMileage: { type: Number },
    endMileage: { type: Number },
    fuelConsumed: { type: Number },
    driverRemarks: { type: String }
}, { timestamps: true });

const Trip = mongoose.model('Trip', tripSchema);
export default Trip;