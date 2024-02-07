const mongoose = require("mongoose");


//schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
         type: String,
         required: true,
    },
    trialPeriod:{
        type: Number,
        default: 3, //3 days
    },
    trialActive: {
        type: Boolean,
        default: true,
    },
    trialExpires: {
        type: Date,
    },
    subscriptionPlan:{
        type: String,
        enum: ["Trial", "Free", "Basic", "Premium"],
        default: "Trial",
    },
    apiRequestCount: {
        type: Number,
        default: 0,
    },
    monthlyRequestCount: {
        type: Number,
        default: 100, //100 credit //3 days
    },
    nextBillingDate: Date,
    payments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment',
    }],
    ContentHistory:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ContentHistory',
    }]

},
{
    timestamps: true,
    toJSON:{virtuals: true},
    toObject:{virtuals: true},
});

// //add virtual property
// userSchema.virtual("isTrialActive").get(function(){
//     return this.trialActive && new Date() < this.trialExpires
// })

//Compile to form the model

const User = mongoose.model("User", userSchema);


module.exports = User;