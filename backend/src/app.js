import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import MongodbConnection from './config/MongodbConnection.js';
import ErrorHandler from './middleware/errorMiddleware.js';
import AuthRoutes from './routes/auth.routes.js';
import TruckRoutes from './routes/truck.routes.js';
import TripRouter from './routes/trip.routes.js';
import TrailerRoutes from './routes/trailer.routes.js';

dotenv.config();

const app = express();
const dbUrl = process.env.MONGO_URL;
const db = new MongodbConnection(dbUrl);

db.connect();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
}));

app.use("/api/auth", AuthRoutes);
app.use('/api/truck', TruckRoutes);
app.use('/api/trailers', TrailerRoutes)
app.use('/api/trip', TripRouter);

app.get('/', () => {
    console.log('app running on : http://localhost:3002');
});

app.use(ErrorHandler);
process.once('SIGINT', db.disconnect);

export default app;