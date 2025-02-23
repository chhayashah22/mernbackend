import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import Razorpay from 'razorpay';
import {userRouter} from './routes/userRoute.js';
import {paymentRouter }from './routes/paymentRoute.js';
import { verifyUser } from './middlware/protectedRoute.js';
import cors from 'cors';


const app = express();
const PORT = process.env.PORT || 4000;


// ****************CORS**************************

app.use(
  cors({
    origin: [
      "https://mern-frontend-hzei-git-main-chhayas-projects-d7e774f2.vercel.app", // ✅ Add the correct frontend URL
      "https://mern-frontend-hzei.vercel.app", // ✅ Also allow the main deployment
    ],
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
  })
);
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || origin.endsWith(".vercel.app")) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
  })
);


// Middleware
app.use(express.json());                // Enables JSON parsing

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true,bufferCommands: false,  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


app.use('/api/users',userRouter);
app.use('/api/login',userRouter);
app.use('/api/payment',paymentRouter);
app.use('/api/payment-verify',paymentRouter);
app.use('/api/get',paymentRouter);
// app.use("/api/verifyUser",verifyUser);

app.get('/', (req, res) => {
    res.send('Server is running');
});

// Start Server

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
