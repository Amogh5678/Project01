import express from 'express'

import dotenv from 'dotenv'
dotenv.config();

const app = express();


app.get('/', (req, res) =>{
    res.send("hello")
});


export default app;