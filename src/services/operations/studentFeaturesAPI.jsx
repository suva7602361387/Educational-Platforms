// import { toast } from "react-hot-toast";
// import { studentEndpoints } from "../apis";
// import { apiConnector } from "../apiconnector";
// //import rzpLogo from "../../assets/logo/rzp_logo.png"
// //import { setPaymentLoading } from "../../Slices/CourseSlices";
// import { resetCart } from "../../Slices/cartSlices";
// import { loadStripe } from "@stripe/stripe-js";
// import Stripe from "stripe";

// const { COURSE_PAYMENT_API } = studentEndpoints;
// export async function buyCourse(token, courses) {
//   const toastId = toast.loading("Loading...");
//   // try{
//   //     //load the script
//   //     //const stripe = await loadScript("pk_test_51RBGFuFacar0B0yKwwGcL7D1XtakASxDY0ZSHjaNiIKjLZKIHwx8RHw1R5Swca30OYqVSanPrV0AsctTi6NlYiW000i6CZkz2a");

//   //     //initiate the order
//   //     const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API,
//   //                             {courses},
//   //                             {
//   //                                 Authorization: `Bearer ${token}`,
//   //                             })

//   //     if(!orderResponse.data.success) {
//   //         throw new Error(orderResponse.data.message);
//   //     }
//   //     console.log("PRINTING orderResponse", orderResponse);
//   //     console.log("jkkj");
//   //     //options
//   // //     const options = {
//   // //                     //key: process.env.RAZORPAY_KEY,
//   // //                     currency: orderResponse.data.message.currency,
//   // //                     amount: `${orderResponse.data.message.amount}`,
//   // //                     order_id:orderResponse.data.message.id,
//   // //                     name:"StudyNotion",
//   // //                     description: "Thank You for Purchasing the Course",
//   // //                     image:rzpLogo,
//   // //                     prefill: {
//   // //                         name:`${userDetails.firstName}`,
//   // //                         email:userDetails.email
//   // //                     },
//   // //                     // handler: function(response) {
//   // //                     //     //send successful wala mail
//   // //                     //     sendPaymentSuccessEmail(response, orderResponse.data.message.amount,token );
//   // //                     //     //verifyPayment
//   // //                     //     verifyPayment({...response, courses}, token, navigate, dispatch);
//   // //                     // }
//   // //                 }
//   // //  const result=stripe.redirectToCheckout({
//   // //     sessionId:options.id
//   // //  });
//   // //  if(result.error){
//   // //     toast.error("oops, payment failed");
//   // //     console.log(response.error);

//   // //  }
//   // toast.error(" Payment sucessfully");
//   // }
//   try {
//     // const stripe = new Stripe("sk_test_51RBGFuFacar0B0yKfASEch2gLSZk9vQniDCgQsglRIgbZr6PScxzG6O4DucUm3N3o2T7Dl9jHqv0aeUhitaxcArG00YQE4ElXy");

//     // stripe.products
//     //   .create({
//     //     name: "Starter Subscription",
//     //     description: "$12/Month subscription",
//     //   })
//     //   .then((product) => {
//     //     stripe.prices
//     //       .create({
//     //         unit_amount: 1200,
//     //         currency: "usd",
//     //         recurring: {
//     //           interval: "month",
//     //         },
//     //         product: product.id,
//     //       })
//     //       .then((price) => {
//     //         console.log(
//     //           "Success! Here is your starter subscription product id: " +
//     //             product.id
//     //         );
//     //         console.log(
//     //           "Success! Here is your starter subscription price id: " + price.id
//     //         );
//     //       });
//     //   });
//     const orderResponse = await apiConnector(
//         "POST",
//         COURSE_PAYMENT_API,
//         { courses },
//         {
//             Authorization: `Bearer ${token}`,
//         }
//     );
//     const stripe = await loadStripe("pk_test_51RBGFuFacar0B0yKwwGcL7D1XtakASxDY0ZSHjaNiIKjLZKIHwx8RHw1R5Swca30OYqVSanPrV0AsctTi6NlYiW000i6CZkz2a")
//     console.log(orderResponse)
//     const result = stripe.redirectToCheckout({
//         sessionId:orderResponse.data.id
//     })
//     console.log(session)

//     if(result.error){
//         console.log((await result).error)
//     }
//    // window.location.href = orderResponse.data.url;



//     if (!orderResponse.data.success) {
//       throw new Error(orderResponse.data.message);
//     }
//     console.log("PRINTING orderResponse", orderResponse);
//    // console.log("jkkj");
//    toast.error(" Payment sucessfully");
//   } catch (error) {
//     console.log("PAYMENT API ERROR.....", error);
//     toast.error("Could not make Payment");
//   }
//   toast.dismiss(toastId);
// }

// // function loadScript(src) {
// //     return new Promise((resolve) => {
// //         const script = document.createElement("script");
// //         script.src = src;

// //         script.onload = () => {
// //             resolve(true);
// //         }
// //         script.onerror= () =>{
// //             resolve(false);
// //         }
// //         document.body.appendChild(script);
// //     })
// // }

// // export async function buyCourse(token, courses, userDetails, navigate, dispatch) {
// //     const toastId = toast.loading("Loading...");
// //     try{
// //         //load the script
// //         //const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

// //         if(!res) {
// //             toast.error("RazorPay SDK failed to load");
// //             return;
// //         }

// //         //initiate the order
// //         const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API,
// //                                 {courses},
// //                                 {
// //                                     Authorization: `Bearer ${token}`,
// //                                 })

// //         if(!orderResponse.data.success) {
// //             throw new Error(orderResponse.data.message);
// //         }
// //         console.log("PRINTING orderResponse", orderResponse);
// //         //options
// //         const options = {
// //             key: process.env.RAZORPAY_KEY,
// //             currency: orderResponse.data.message.currency,
// //             amount: `${orderResponse.data.message.amount}`,
// //             order_id:orderResponse.data.message.id,
// //             name:"StudyNotion",
// //             description: "Thank You for Purchasing the Course",
// //             image:rzpLogo,
// //             prefill: {
// //                 name:`${userDetails.firstName}`,
// //                 email:userDetails.email
// //             },
// //             handler: function(response) {
// //                 //send successful wala mail
// //                 sendPaymentSuccessEmail(response, orderResponse.data.message.amount,token );
// //                 //verifyPayment
// //                 verifyPayment({...response, courses}, token, navigate, dispatch);
// //             }
// //         }
// //         //miss hogya tha
// //         const paymentObject = new window.Razorpay(options);
// //         paymentObject.open();
// //         paymentObject.on("payment.failed", function(response) {
// //             toast.error("oops, payment failed");
// //             console.log(response.error);
// //         })

// //     }
// //     catch(error) {
// //         console.log("PAYMENT API ERROR.....", error);
// //         toast.error("Could not make Payment");
// //     }
// //     toast.dismiss(toastId);
// // }

// // async function sendPaymentSuccessEmail(response, amount, token) {
// //     try{
// //         await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
// //             orderId: response.razorpay_order_id,
// //             paymentId: response.razorpay_payment_id,
// //             amount,
// //         },{
// //             Authorization: `Bearer ${token}`
// //         })
// //     }
// //     catch(error) {
// //         console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
// //     }
// // }

// // //verify payment
// // async function verifyPayment(bodyData, token, navigate, dispatch) {
// //     const toastId = toast.loading("Verifying Payment....");
// //     dispatch(setPaymentLoading(true));
// //     try{
// //         const response  = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
// //             Authorization:`Bearer ${token}`,
// //         })

// //         if(!response.data.success) {
// //             throw new Error(response.data.message);
// //         }
// //         toast.success("payment Successful, ypou are addded to the course");
// //         navigate("/dashboard/enrolled-courses");
// //         dispatch(resetCart());
// //     }
// //     catch(error) {
// //         console.log("PAYMENT VERIFY ERROR....", error);
// //         toast.error("Could not verify Payment");
// //     }
// //     toast.dismiss(toastId);
// //     dispatch(setPaymentLoading(false));
// // }
import { toast } from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";
import rzpLogo from "../../assets/logo/rzp_logo.png"
import { setPaymentLoading } from "../../Slices/CourseSlices";
import { resetCart } from "../../Slices/cartSlices";



const {COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API} = studentEndpoints;

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }
        script.onerror= () =>{
            resolve(false);
        }
        document.body.appendChild(script);
    })
}


export async function buyCourse(token, courses, userDetails, navigate, dispatch) {
    const toastId = toast.loading("Loading...");
    try{
        //load the script
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if(!res) {
            toast.error("RazorPay SDK failed to load");
            return;
        }

        //initiate the order
        const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API, 
                                {courses},
                                {
                                    Authorization: `Bearer ${token}`,
                                })

        if(!orderResponse.data.success) {
            throw new Error(orderResponse.data.message);
        }
        console.log("PRINTING orderResponse", import.meta.env.RAZORPAY_KEY);
        //options
        const options = {
            key:"rzp_test_pYVAFJLc15BV4P",
            currency: orderResponse.data.data.currency,
            amount: `${orderResponse.data.data.amount}`,
            order_id:orderResponse.data.data.id,
            name:"StudyNotion",
            description: "Thank You for Purchasing the Course",
            image:rzpLogo,
            prefill: {
                name:`${userDetails.firstName}`,
                email:userDetails.email
            },
            handler: function(response) {
                //send successful wala mail
                sendPaymentSuccessEmail(response, orderResponse.data.data.amount,token );
                //verifyPayment
                verifyPayment({...response, courses}, token, navigate, dispatch);
            }
        }
        //miss hogya tha 
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function(response) {
            toast.error("oops, payment failed");
            console.log(response.error);
        })

    }
    catch(error) {
        console.log("PAYMENT API ERROR.....", error);
        toast.error("Could not make Payment");
    }
    toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail(response, amount, token) {
    try{
        await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount,
        },{
            Authorization: `Bearer ${token}`
        })
    }
    catch(error) {
        console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
    }
}

//verify payment
async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying Payment....");
    dispatch(setPaymentLoading(true));
    try{
        const response  = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
            Authorization:`Bearer ${token}`,
        })

        if(!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success("payment Successful, ypou are addded to the course");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    }   
    catch(error) {
        console.log("PAYMENT VERIFY ERROR....", error);
        toast.error("Could not verify Payment");
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}