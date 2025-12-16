import TrailerService from '../services/trailerService.js';

class TrailerController {

    static create = async (req, res, next) => {
        try {
            const trailer = await TrailerService.createTrailer(req.body);
            res.status(201).json(trailer);
        } catch (error) { next(error); }
    }

    static getAll = async (req, res, next) => {
        try {
            const trailers = await TrailerService.getAllTrailers();
            res.status(200).json(trailers);
        } catch (error) { next(error); }
    }

    static getById = async (req, res, next) => {
        try {
            const trailer = await TrailerService.getTrailerById(req.params.id);
            res.status(200).json(trailer);
        } catch (error) { next(error); }
    }

    static update = async (req, res, next) => {
        try {
            const trailer = await TrailerService.updateTrailer(req.params.id, req.body);
            res.status(200).json(trailer);
        } catch (error) { next(error); }
    }

    static delete = async (req, res, next) => {
        try {
            const result = await TrailerService.deleteTrailer(req.params.id);
            res.status(200).json(result);
        } catch (error) { next(error); }
    }
}

export default TrailerController;