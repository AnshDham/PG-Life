import express from 'express';
import dotenv from 'dotenv';
// import cors from 'cors';
// import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.get('/', (req, res) => {
  res.send('Welcome to PG LIFE');
})

app.use((req, res ) => {
    res.status(404).json({
        message: 'Route Not Found',
        status: 404
    });
})

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
})

