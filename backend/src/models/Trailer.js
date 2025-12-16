import mongoose from 'mongoose';

const trailerSchema = new mongoose.Schema({
    matricule: { 
        type: String, 
        required: true, 
        unique: true, 
        uppercase: true,
        trim: true 
    },
    type: { 
        type: String, 
        enum: ['FRIGO', 'BACHE', 'PLATEAU', 'CITERNE'],
        required: true 
    },
    status: {
        type: String,
        enum: ['AVAILABLE', 'IN_TRANSIT', 'MAINTENANCE', 'RESERVED'],
        default: 'AVAILABLE'
    },
    tireCondition: {
        type: String,
        enum: ['GOOD', 'WORN', 'CRITICAL'],
        default: 'GOOD'
    }
}, {
    timestamps: true
});

const Trailer = mongoose.model("Trailer", trailerSchema);
export default Trailer;