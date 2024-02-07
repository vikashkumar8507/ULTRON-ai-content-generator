const express = require("express");
const cookieParser = require("cookie-parser");
const cron = require("node-cron");
const cors = require("cors");
require("dotenv").config();
const usersRouter = require("./routes/usersRouter");
const { errorHandler } = require("./middlewares/errorMiddleware");
const openAIRouter = require("./routes/openAIRouter");
const stripeRouter = require("./routes/stripeRouter");
const User = require("./models/User");

require("./utils/connectDB")();

const app = express();
const PORT = process.env.PORT|| 5000;

//cron for the trial period which runs every single day
cron.schedule('0 0 * * * *', async()=>{
    console.log("This task runs every second");
    try {
        //get the current date
        const today = new Date();
        await User.updateMany({
            trialActive: true,
            trialExpires: {$lt: today}
        },{
            trialActive: false,
            subscriptionPlan: "Free",
            monthlyRequestCount: 5,
        })
    } catch (error) {
        console.log(error);
    }
});

//cron for Free plan: run at the end of every month
cron.schedule('0 0 1 * * *', async()=>{
    try {
        //get the current date
        const today = new Date();
        await User.updateMany({
            subscriptionPlan: "Free",
            nextBillingDate: {$lt: today}
        },{
            monthlyRequestCount: 0,
        })
    } catch (error) {
        console.log(error);
    }
});

//cron for Basic plan: run at the end of every month
cron.schedule('0 0 1 * * *', async()=>{
    try {
        //get the current date
        const today = new Date();
        await User.updateMany({
            subscriptionPlan: "Basic",
            nextBillingDate: {$lt: today}
        },{
            monthlyRequestCount: 0,
        })
       
    } catch (error) {
        console.log(error);
    }
});

//cron for Premium plan: run at the end of every month
cron.schedule('0 0 1 * * *', async()=>{
    try {
        //get the current date
        const today = new Date();
        await User.updateMany({
            subscriptionPlan: "Premium",
            nextBillingDate: {$lt: today}
        },{
            monthlyRequestCount: 0,
        })
       
    } catch (error) {
        console.log(error);
    }
});

//cron paid plan

//middllewares
app.use(express.json()); //pass incoming json data
app.use(cookieParser()); //pass the cookie automatically
const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
};
app.use(cors(corsOptions));

//Router
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/openai', openAIRouter);
app.use('/api/v1/stripe', stripeRouter);

//error handler middleware
app.use(errorHandler);

//start the server
app.listen(PORT, console.log(`Server is running on port ${PORT}`));