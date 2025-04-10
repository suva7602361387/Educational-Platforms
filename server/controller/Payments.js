
// const Course = require("../models/Course")
// //const crypto = require("crypto")
// const User = require("../models/User")
// const mailSender = require("../utils/mail")
// const mongoose = require("mongoose")
// const {
//   courseEnrollmentEmail,
// } = require("../templates/courseEnrolement")
// const Stripe = require("stripe")
// const { paymentSuccessEmail } = require("../templates/Paymentsuc")
// const CourseProgress = require("../models/CrousesProges")
//const stripe = new Stripe("sk_test_51RBGFuFacar0B0yKfASEch2gLSZk9vQniDCgQsglRIgbZr6PScxzG6O4DucUm3N3o2T7Dl9jHqv0aeUhitaxcArG00YQE4ElXy");

//const stripe=require("stripe")("sk_test_51RBGFuFacar0B0yKfASEch2gLSZk9vQniDCgQsglRIgbZr6PScxzG6O4DucUm3N3o2T7Dl9jHqv0aeUhitaxcArG00YQE4ElXy")
//  exports.payment=async(req,res)=>{
//   //Fetch the data
//   const { courses } = req.body
//   const userId = req.user.id
//   console.log("course id:",courses.id)
//   console.log("user id:",userId)

//   if (courses.length === 0) {
//     return res.json({ success: false, message: "Please Provide Course ID" })
//   }

//   let total_amount = 0
//   for (const course_id of courses) {
//         let course
//         try {
//           // Find the course by its ID
//           course = await Course.findById(course_id)
    
//           // If the course is not found, return an error
//           if (!course) {
//             return res
//               .status(200)
//               .json({ success: false, message: "Could not find the Course" })
//           }
    
//           //Check if the user is already enrolled in the course
//           const uid = new mongoose.Types.ObjectId(userId)
//           if (course.studentsEnrolled.includes(uid)) {
//             return res
//               .status(200)
//               .json({ success: false, message: "Student is already Enrolled" })
//           }
//           else{
//             await enrollStudents(courses, userId, res)
//           }
//           // Add the price of the course to the total amount
//           total_amount += course.price
//           //console.log("total amount is :",total_amount);
//         } catch (error) {
//           console.log(error)
//           return res.status(500).json({ success: false, message: error.message })
//         }
//   }

//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       mode: "subscription",
//       line_items: [
//         {
//           price_data: {
//             currency: "usd",
//             product_data: {
//               name: "Starter Subscription",
//               description: "$12/month plan",
//             },
//             unit_amount: total_amount,
//             recurring: {
//               interval: "month",
//             },
//           },
//           quantity: 1,
//         },
//       ],
//       success_url: "http://localhost:5174/dashboard/enrolled-courses",
//       cancel_url: "http://localhost:5173/cancel",
//     });
//     console.log("This is session:",session)

//     res.json(session);
//     try {
//     //Find out the student
//     const enrolledStudent = await User.findById(userId)
//     //Send email of this student
//     await mailSender(
//       enrolledStudent.email,
//       `Payment Received`,
//       paymentSuccessEmail(
//         `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
//         total_amount / 100,
//         session.id
        
//       )
//     )
//   } catch (error) {
//     console.log("error in sending mail", error)
//     return res
//       .status(400)
//       .json({ success: false, message: "Could not send email" })
//   }
//   } catch (err) {
//     console.error("Checkout session error:", err);
//     res.status(500).json({ error: "Could not create checkout session" });
//   }
   
  
    


//   }

//  // // Send Payment Success Email
// exports.sendPaymentSuccessEmail = async (req, res) => {
//   const {  amount } = req.body

//   const userId = req.user.id

//   if ( !amount || !userId) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Please provide all the details" })
//   }

//   try {
//     //Find out the student
//     const enrolledStudent = await User.findById(userId)
//     //Send email of this student
//     await mailSender(
//       enrolledStudent.email,
//       `Payment Received`,
//       paymentSuccessEmail(
//         `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
//         amount / 100,
        
//       )
//     )
//   } catch (error) {
//     console.log("error in sending mail", error)
//     return res
//       .status(400)
//       .json({ success: false, message: "Could not send email" })
//   }
// }
// const enrollStudents = async (courses, userId, res) => {
//     if (!courses || !userId) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Please Provide Course ID and User ID" })
//     }
  
//     for (const courseId of courses) {
//       try {
//         // Find the course and enroll the student in it
//         const enrolledCourse = await Course.findOneAndUpdate(
//           { _id: courseId },
//           { $push: { studentsEnroled: userId } },
//           { new: true }
//         )
  
//         if (!enrolledCourse) {
//           return res
//             .status(500)
//             .json({ success: false, error: "Course not found" })
//         }
//         console.log("Updated course: ", enrolledCourse)
  
//         const courseProgress = await CourseProgress.create({
//           courseID: courseId,
//           userId: userId,
//           completedVideos: [],
//         })
//         // Find the student and add the course to their list of enrolled courses
//         const enrolledStudent = await User.findByIdAndUpdate(
//           userId,
//           {
//             $push: {
//               courses: courseId,
//               courseProgress: courseProgress._id,
//             },
//           },
//           { new: true }
//         )
  
//         console.log("Enrolled student: ", enrolledStudent)
//         // Send an email notification to the enrolled student
//         const emailResponse = await mailSender(
//           enrolledStudent.email,
//           `Successfully Enrolled into ${enrolledCourse.courseName}`,
//           courseEnrollmentEmail(
//             enrolledCourse.courseName,
//             `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
//           )
//         )
  
//         console.log("Email sent successfully: ", emailResponse.response)
//       } catch (error) {
//         console.log(error)
//         return res.status(400).json({ success: false, error: error.message })
//       }
//     }
//   }
const { instance } = require("../config/razerpay")
const Course = require("../models/Course")
const crypto = require("crypto")
const User = require("../models/User")
const mailSender = require("../utils/mail")
const mongoose = require("mongoose")
const {
  courseEnrollmentEmail,
} = require("../templates/courseEnrolement")
const { paymentSuccessEmail } = require("../templates/Paymentsuc")
const CourseProgress = require("../models/CrousesProges")
exports.capturePayment = async (req, res) => {
  console.log("rrazorpay",process.env.RAZORPAY_SECRET)
  const { courses } = req.body
  const userId = req.user.id
  if (courses.length === 0) {
    return res.json({ success: false, message: "Please Provide Course ID" })
  }

  let total_amount = 0

  for (const course_id of courses) {
    let course
    try {
      // Find the course by its ID
      course = await Course.findById(course_id)

      // If the course is not found, return an error
      if (!course) {
        return res
          .status(200)
          .json({ success: false, message: "Could not find the Course" })
      }

      // Check if the user is already enrolled in the course
      const uid = new mongoose.Types.ObjectId(userId)
      if (course.studentsEnrolled.includes(uid)) {
        return res
          .status(200)
          .json({ success: false, message: "Student is already Enrolled" })
      }

      // Add the price of the course to the total amount
      total_amount += course.price
    } catch (error) {
      console.log(error)
      return res.status(500).json({ success: false, message: error.message })
    }
  }

  const options = {
    amount: total_amount * 100,
    currency: "INR",
    receipt: Math.random(Date.now()).toString(),
  }
  console.log("option is :",options);
  try {
    // Initiate the payment using Razorpay
    const paymentResponse = await instance.orders.create(options)
    console.log(paymentResponse)
    res.json({
      success: true,
      data: paymentResponse,
    })
    
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ success: false, message: "Could not initiate order." })
  }
}

// verify the payment
exports.verifyPayment = async (req, res) => {
  const razorpay_order_id = req.body?.razorpay_order_id
  const razorpay_payment_id = req.body?.razorpay_payment_id
  const razorpay_signature = req.body?.razorpay_signature
  const courses = req.body?.courses

  const userId = req.user.id

  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !courses ||
    !userId

      
  ) {
    return res.status(200).json({ success: false, message: "Payment Failed" })
  }

  let body = razorpay_order_id + "|" + razorpay_payment_id
  console.log("razorpay",process.env.RAZORPAY_SECRET)
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex")
  console.log("expectedSignature is:",expectedSignature);
  console.log("expectedSignature is:",razorpay_signature);

  if (expectedSignature === razorpay_signature) {
    await enrollStudents(courses, userId, res)
    return res.status(200).json({ success: true, message: "Payment Verified" })
  }

  return res.status(200).json({ success: false, message: "Payment Failed" })
}

// Send Payment Success Email
exports.sendPaymentSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body
   
  const userId = req.user.id

  if (!orderId || !paymentId || !amount || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all the details" })
  }

  try {
    const enrolledStudent = await User.findById(userId)
    console.log("this is:",enrolledStudent);

    await mailSender(
      enrolledStudent.email,
      `Payment Received`,
      paymentSuccessEmail(
        `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
        amount / 100,
        orderId,
        paymentId
      )
    )
  } catch (error) {
    console.log("error in sending mail", error)
    return res
      .status(400)
      .json({ success: false, message: "Could not send email" })
  }
}

// enroll the student in the courses
const enrollStudents = async (courses, userId, res) => {
  if (!courses || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please Provide Course ID and User ID" })
  }

  for (const courseId of courses) {
    try {
      // Find the course and enroll the student in it
      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: courseId },
        { $push: { studentsEnrolled: userId } },
        { new: true }
      )

      if (!enrolledCourse) {
        return res
          .status(500)
          .json({ success: false, error: "Course not found" })
      }
      console.log("Updated course: ", enrolledCourse)

      const courseProgress = await CourseProgress.create({
        courseID: courseId,
        userId: userId,
        completedVideos: [],
      })
      // Find the student and add the course to their list of enrolled courses
      const enrolledStudent = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            courses: courseId,
            courseProgress: courseProgress._id,
          },
        },
        { new: true }
      )

      console.log("Enrolled student: ", enrolledStudent)
      // Send an email notification to the enrolled student
      const emailResponse = await mailSender(
        enrolledStudent.email,
        `Successfully Enrolled into ${enrolledCourse.courseName}`,
        courseEnrollmentEmail(
          enrolledCourse.courseName,
          `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
        )
      )

      console.log("Email sent successfully: ", emailResponse.response)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ success: false, error: error.message })
    }
  }
}