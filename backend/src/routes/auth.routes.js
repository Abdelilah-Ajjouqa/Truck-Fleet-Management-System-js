import e from "express";
import AuthController from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const app = e();

app.post('/register', AuthController.register);
app.post('/login', AuthController.login);

app.get('/me', authMiddleware, AuthController.me);


export default app;