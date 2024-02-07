import axios from "axios";

//stripe payment----------

export const handleFreeSubscriptionAPI = async()=>{
    const response = await axios.post("http://localhost:5000/api/v1/stripe/free-plan", 
    {},
    {
        withCredentials: true,
    })
    return response?.data;
}
//stripe payment intent----------

export const createStripePaymentIntentAPI = async(payment)=>{
    console.log(payment);
    const response = await axios.post("http://localhost:5000/api/v1/stripe/checkout", 
    {
        amount: Number(payment?.amount),
        subscriptionPlan: payment?.plan,
    
    },
    {
        withCredentials: true,
    })
    return response?.data;
}
//verify payment----------

export const verifyPaymentAPI = async(paymentId)=>{
    const response = await axios.post(`http://localhost:5000/api/v1/stripe/verify-payment/${paymentId}`, 
    {},
    {
        withCredentials: true,
    })
    return response?.data;
}