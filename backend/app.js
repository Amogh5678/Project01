import express from 'express'
import connectDb from './db/db.js';
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js'
import captainRoutes from './routes/captainRoutes.js'

dotenv.config();
const app = express();
connectDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());



app.get('/', (req, res) =>{
    res.send("hello")
});

app.use('/users', userRoutes);
app.use('/captains', captainRoutes);


export default app;