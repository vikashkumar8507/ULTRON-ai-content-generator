const mongoose = require("mongoose");
const User = require("./User");


//schema
const paymentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: User,
    },
   reference: {
        type: String,
        required: true,
    },
    currency: {
         type: String,
         required: true,
    },
    status: {
        type: String,
        default: 'pending',
        required: true,
    },
    subscriptionPlan: {
        type: String,
        required: true,
    },
    amount:{
        type: Number,
        default: 0,
    },
    monthlyRequestCount: {
        type: Number,
        
    },

},
{
    timestamps: true,
});

//Compile to form the model

const Payment = mongoose.model("Payment", paymentSchema);


module.exports = Payment;