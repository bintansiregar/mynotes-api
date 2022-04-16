import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import { homeRouter, authRoute, userRoute, noteRoute } from './routes';

const app = express()
app.use(cors());
app.use(express.json());

app.use('/', homeRouter);
app.use('/user', userRoute);
app.use('/auth', authRoute);
app.use('/note', noteRoute);

(async() => {
  try {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_ADDRESS}/${process.env.DB}?${process.env.DB_OPTIONS}`);
    console.log(`Connected to Database (${process.env.DB}) @ ${process.env.DB_ADDRESS}`);

    app.listen(process.env.PORT, () => {
      console.log(`Application running at http://localhost:${process.env.PORT}/`)
    })
  } catch(error) {
    console.error(error);
    process.kill(process.pid, 'SIGINT');
    return;
  }
})();

export default app;
