import AuthService from '../services/authService.js';

class AuthController {
    static register = async (req, res, next) => {
        try {
            const data = req.body;
            const result = await AuthService.register(data);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }

    static login = async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const result = await AuthService.login(email, password);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    static me = (req, res) => {
        res.status(200).json({ me: req.user })
    }
}

export default AuthController;