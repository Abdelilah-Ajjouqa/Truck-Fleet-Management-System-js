import httpError from "../config/httpError.js";

const ErrorHandler = (err, req, res, next) => {
    if (err instanceof httpError) {
        res.status(err.statusCode).json({ message: err.message });
    } else {
        res.status(500).json({ message: err.message });
    }
}

export default ErrorHandler;