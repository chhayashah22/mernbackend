import express from 'express';
import { getTransactions, paymentController,verifyPayment } from '../controller/payment.controller.js';
import { verifyUser } from '../middlware/protectedRoute.js';

export const paymentRouter=express.Router();

//routes
paymentRouter.post('/get-payment',verifyUser,paymentController);
paymentRouter.post('/verify',verifyUser,verifyPayment);
paymentRouter.get('/get-transaction',verifyUser,getTransactions);