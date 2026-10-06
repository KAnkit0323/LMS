import { createRazorpayInstance } from "../config/razorpayConfig.js";
import { Course } from "../models/courseModel.js";
import { CoursePurchase } from "../models/coursePurchaseModel.js";
import crypto from "crypto";

const razorpayInstance = createRazorpayInstance();

export const createCheckoutSession = async (req, res) => {
  try {
    const userId = req.id; //can be a problem
    const { courseId } = req.body;

    // 1. find course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course not found!",
      });
    }

    // 2. create razorpay order
    const options = {
      amount: course.coursePrice * 100,
      currency: "INR",
      receipt: `course_${courseId}_${Date.now()}`,
    };

    const order = await razorpayInstance.orders.create(options); //what is the use case of this line and what is the mean of this line

    // 3. create a new course purchase record
    const newPurchase = new CoursePurchase({
      courseId,
      userId,
      amount: course.coursePrice,
      status: "pending",
      razorpayOrderId: order.id,
    });

    await newPurchase.save();

    // 4. send order information to frontend
    return res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const razorpayWebhook = async (req, res) => {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    const signature = req.headers["x-razorpay-signature"];

    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(req.body)
      .digest("hex");

    if (signature !== expectedSignature) {
      return res.status(400).json({
        success: false,
        message: "Invalid webhook signature",
      });
    }

    // Webhook is genuine
    const event = JSON.parse(req.body.toString());

    if (event.event === "payment.captured") {
      const payment = event.payload.payment.entity;

      // console.log("Payment ID:", payment.id);
      // console.log("Order ID:", payment.order_id);
      // console.log("Amount:", payment.amount);

      // Find our purchase using Razorpay order ID
      const purchase = await CoursePurchase.findOne({
        razorpayOrderId: payment.order_id,
      });

      if (!purchase) {
        return res.status(404).json({
          success: false,
          message: "Purchase not found",
        });
      }

      // Update purchase
      purchase.status = "completed";
      purchase.paymentId = payment.id;

      await purchase.save();

      // enroll user in course
      const course = await Course.findById(purchase.courseId);

      if (course && !course.enrolledStudents.includes(purchase.userId)) {
        console.log("userID", purchase.userId);
        console.log("course is", course.courseTitle);
        course.enrolledStudents.push(purchase.userId);
        await course.save();
      }
    }

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log("Webhook Error:", error);

    return res.status(500).json({
      success: false,
      message: "Webhook processing failed",
    });
  }
};

export const getCourseDetailWithPurchaseStatus = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    const course = await Course.findById(courseId)
      .populate({ path: "creator" })
      .populate({ path: "lectures" });

    // check if the user is purchased course or not
    const purchased = await CoursePurchase.findOne({ userId, courseId });

    if (!course) {
      return res.status(404).json({
        message: "course not found!",
      });
    }

    return res.status(200).json({
      course,
      purchased: purchased ? true : false,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllPurchasedCourse = async (_, res) => {
  try {
    const purchasedCourse = await CoursePurchase.find({
      status: "completed",
    }).populate("courseId");

    if (!purchasedCourse) {
      return res.status(404).json({
        purchasedCourse: [],
      });
    }
    return res.status(200).json({
      purchasedCourse,
    });
  } catch (error) {
    console.log(error);
  }
};
