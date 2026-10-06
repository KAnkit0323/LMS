import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { createCheckoutSession, getAllPurchasedCourse, getCourseDetailWithPurchaseStatus, razorpayWebhook } from "../controllers/coursePurchaseController.js";


const router = express.Router();

router.route("/checkout/create-checkout-session").post(isAuthenticated, createCheckoutSession );


router.route("/course/:courseId/detail-with-status").get( isAuthenticated, getCourseDetailWithPurchaseStatus );

router.route("/").get(isAuthenticated, getAllPurchasedCourse );


export default router;