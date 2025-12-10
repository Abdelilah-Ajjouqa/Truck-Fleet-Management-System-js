import express from 'express';
import dotenv from 'dotenv';
import MongodbConnection from './config/MongodbConnection.js';

dotenv.config();

const app = express();
const dbUrl = process.env.MONGO_URL;
const db = new MongodbConnection(dbUrl);

db.connect();
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Truck API is running...');
});

process.once('SIGINT', db.disconnect);

export default app;