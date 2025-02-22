import Razorpay from "razorpay";
import Payment from "../models/payment.js";
import 'dotenv/config';
import crypto from 'crypto';
const razorpayInstance = new Razorpay({
    key_id: process.env.REACT_APP_RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
});

// **************ORDER CREATED****************************************
export const paymentController = async (req, res) => {
    try {
        const { amount } = req.body;               
        const options = {
            amount: amount*100, 
            currency:  "INR",
            receipt: crypto.randomBytes(10).toString('hex'),
            
        };
        const order = await razorpayInstance.orders.create(options);
         res.status(201).json({           
            success: true,
            message: "Order created successfully",
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            receipt:order.receipt,
        });

    } catch (error) {
        console.error("Payment Error:", error);
        res.status(500).json({ success: false, message: "Payment failed", error: error.message });
    }
};




// ***************************************VERIFY PAYMENT****************************************


export const verifyPayment  = async (req, res) => {
  const userId = req.user.id;                                    // Extracted from JWT after verification
    const useremail = req.user.email; 
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature ,amount} = req.body;
      
       // Generate the expected signature
        const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
        hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
        const generatedSignature = hmac.digest("hex"); 
        
        console.log("Generated Signature:", generatedSignature);
        console.log("Received Signature:", razorpay_signature);
        console.log("Match:", generatedSignature === razorpay_signature);
        if (generatedSignature !== razorpay_signature) {
            return res.status(400).json({ success: false, message: "Invalid signature" });
        }
        const originalAmount = amount / 100;
        // Save payment details in the database
        const newPayment = new Payment({
            userId:userId,
            useremail,
            amount:originalAmount,
            razorpay_order_id: razorpay_order_id,     
            razorpay_payment_id: razorpay_payment_id,  
            razorpay_signature: razorpay_signature,    
        });
        await newPayment.save();

        res.status(200).json({ success: true, message: "Payment verified and saved successfully" });

    } catch (error) {
        console.error("Payment Verification Error:", error);
        res.status(500).json({ success: false, message: "Payment verification failed", error: error.message });
    }
};



export const getTransactions = async (req, res) => {
    try {
        
        const userId = req.user.id; // Extract user ID from verified token

        const transactions = await Payment.find({ userId }).sort({ createdAt: -1 }); // Fetch user transactions

        res.status(200).json({
            success: true,
            transactions,
        });
    } catch (error) {
        console.error("Transaction Fetch Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch transactions",
        });
    }
};
