import Trailer from '../models/Trailer.js';
import { validateTrailer } from '../validation/trailerValidate.js';
import HttpError from '../config/HttpError.js';

class TrailerService {

    static async createTrailer(data) {
        const error = validateTrailer(data);
        if (error) throw new HttpError(error, 400);

        const exists = await Trailer.findOne({ matricule: data.matricule });
        if (exists) throw new HttpError('Trailer with this matricule already exists', 409);

        return await Trailer.create(data);
    }

    static async getAllTrailers() {
        return await Trailer.find().sort({ createdAt: -1 });
    }

    static async getTrailerById(id) {
        const trailer = await Trailer.findById(id);
        if (!trailer) throw new HttpError('Trailer not found', 404);
        return trailer;
    }

    static async updateTrailer(id, data) {
        const trailer = await Trailer.findByIdAndUpdate(id, data, { new: true });
        if (!trailer) throw new HttpError('Trailer not found', 404);
        return trailer;
    }

    static async deleteTrailer(id) {
        const trailer = await Trailer.findByIdAndDelete(id);
        if (!trailer) throw new HttpError('Trailer not found', 404);
        return { message: 'Trailer deleted successfully' };
    }
}

export default TrailerService;