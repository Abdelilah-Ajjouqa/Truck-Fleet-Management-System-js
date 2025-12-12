import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import MongodbConnection from './config/MongodbConnection.js';
import ErrorHandler from './middleware/errorMiddleware.js';
import authRoutes from './routes/auth.routes.js';
import truckRoutes from './routes/truck.routes.js';

dotenv.config();

const app = express();
const dbUrl = process.env.MONGO_URL;
const db = new MongodbConnection(dbUrl);

db.connect();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
}))

app.use("/api/auth", authRoutes);
app.use('/truck', truckRoutes);

app.get('/', () => {
    console.log('app running on : http://localhost:3002');
});

app.use(ErrorHandler);
process.once('SIGINT', db.disconnect);

export default app;