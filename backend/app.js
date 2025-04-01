import express from 'express'
import connectDb from './db/db.js';
import dotenv from 'dotenv'
import cors from 'cors'
import userRoutes from './routes/userRoutes.js'

dotenv.config();
const app = express();
connectDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));



app.get('/', (req, res) =>{
    res.send("hello")
});

app.use('/users', userRoutes);


export default app;