import mongoose from 'mongoose';

const truckSchema = new mongoose.Schema({
    matricule: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true
    },
    model: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['AVAILABLE', 'IN_TRANSIT', 'MAINTENANCE', 'RESERVED'],
        default: 'AVAILABLE'
    },
    currentMileage: {
        type: Number,
        default: 0,
        min: 0
    },
    fuelLevel: {
        type: Number,
        default: 100, // Percentage
        min: 0,
        max: 100
    },
    tireCondition: {
        type: String,
        enum: ['GOOD', 'WORN', 'CRITICAL'],
        default: 'GOOD'
    },
    lastMaintenanceDate: { type: Date },
    lastMaintenanceMileage: { type: Number, default: 0 },
    assignedDriver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    }
}, {
    timestamps: true
});

const Truck = mongoose.model("Truck", truckSchema);
export default Truck;