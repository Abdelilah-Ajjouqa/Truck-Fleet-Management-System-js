import express from 'express';
import dotenv from 'dotenv';
import MongodbConnection from './config/MongodbConnection.js';
import ErrorHandler from './middleware/errorMiddleware.js';
import authRoutes from './routes/auth.routes.js';

dotenv.config();

const app = express();
const dbUrl = process.env.MONGO_URL;
const db = new MongodbConnection(dbUrl);

db.connect();
app.use(express.json());


app.use("/api/auth", authRoutes);

app.get('/', (req, res) => {
    res.send('Truck API is running...');
});

app.use(ErrorHandler);
process.once('SIGINT', db.disconnect);

export default app;