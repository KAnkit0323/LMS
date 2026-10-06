import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String, // ❌ email → ✅ String
      required: true,
      unique: true,
    },

    password: {
      type: String, // ❌ password → ✅ String
      required: true,
    },

    role: {
      type: String,
      enum: ["instructor", "student"],
      default: "student",
    },

    enrolledCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],

    photoUrl: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);