import mongoose from "mongoose";


const  paymentSchema = new mongoose.Schema({
    razorpay_order_id:{
        type:String,
        required:true,
    },
    razorpay_payment_id:{
        type:String,
        required:true,
    },
    razorpay_signature:{
        type:String,
        required:true,
    },
    date:{ 
        type:Date,
        default:Date.now()
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },  // Reference to User model
    useremail: { type: String, required: true },         // Store username
    amount: { type: Number, required: true },
   

})

export default mongoose.model('payment',paymentSchema)