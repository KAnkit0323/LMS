import express, { urlencoded } from "express";
import "dotenv/config";
import cookieParser from "cookie-parser"
import cors from "cors";
import bcrypt from "bcryptjs"
import connectDB from "./database/dbConnect.js";
import userRoute from "./routes/userRoute.js";
import courseRoute from "./routes/courseRoute.js";
import mediaRoute from "./routes/mediaRoute.js";
import purchaseRoute from "./routes/purchaseCourseRoute.js"
import { razorpayWebhook } from "./controllers/coursePurchaseController.js";
import courseProgressRoute from "./routes/courseProgressRoute.js";

// dotenv.config({});
// what is the use case of this line

// database connect ->
connectDB();


const app = express();
const PORT = process.env.PORT || 3000;



// isko yha call kyu kiya 
app.use("/api/purchase/webhook", express.raw({ type: "application/json" }), razorpayWebhook);


// default middlewares
app.use( express.json() );
app.use(express.urlencoded({ extended: false }));
app.use( cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));


// apis
app.get("/", (req, res) => {
    res.send("Hello from server");
})
app.use("/api/users", userRoute);
app.use("/api/course", courseRoute);
app.use("/api/media", mediaRoute);
app.use("/api/purchase", purchaseRoute );
app.use("/api/progress", courseProgressRoute );


app.listen(PORT, () => {
    console.log(`Server starting at PORT: ${PORT}`);
});