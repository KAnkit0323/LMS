import bcrypt from "bcryptjs";

import { User } from "../models/userModel.js"
import { generateToken } from "../utils/generateToken.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

export const register = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        if( !name || !email || !password ) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields"});
        }

        const user = await User.findOne({email});
        if( user ) {
            return res.status(400).json({
                success: false,
                message: "User already exist with this email"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            name,
            email,
            password: hashedPassword,
        })
        return res.status(201).json({
            success: true,
            message: "Account created successfully"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error occurred while registering user"
        });
    }
};




export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if( !email || !password ) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields"});
        }

        const user = await User.findOne({email});
        if( !user ) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password"
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if( !isPasswordMatch ) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or Password"
            });
        }

        return generateToken(res, user, `Welcome back ${user.name}`);
        // add return becasue After generating and sending the response, stop executing this controller.

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error occurred while logging in"
        });
    }
}



export const logout = async (_, res) => {
    try {
        return res.status(200).cookie("token", "",
            {
                maxAge:0
            }).json({
                message:"Logged out successfully.",
                success: true
            });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to logout"
        })
    }
}



export const getUserProfile = async (req, res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId).select("-password");
        if( !user ) {
            return res.status(404).json({
                message:"Profile not found",
                success: false
            });
        }
        return res.status(200).json({
            success: true,
            user  //return the user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message:"Failed to load user"
        })
    }
}



export const updateProfile = async (req, res) => {
    try {
        const userId = req.id;
        const {name} = req.body;
        const profilePhoto = req.file;

        const user = await User.findById(userId);
        if( !user ) {
            return res.status(404).json({
                message: "User not found",
                success: false
            })
        }

        // purani uploaded photo hai cloudinary pr usko delete krna hoga
        // extract public id of the old image from the url if exists
        if( user.photoUrl ) {
            const publicId = user.photoUrl.split("/").pop().split(".")[0];  //extract public id
            deleteMediaFromCloudinary(publicId);
        }

        // upload new photo
        const cloudResponse = await uploadMedia(profilePhoto.path);
        const photoUrl = cloudResponse.secure_url;

        const updatedData = {name, photoUrl};

        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {new: true}).select("-password");
        return res.status(200).json({
            success: true,
            user: updatedUser,
            message: "Profile Updated Successfully"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to update profile"
        })
    }

}


// export const updateProfile = async (req, res) => {
//     try {
//        const userId = req.id;
//        const {name} = req.body;
//     //    const {profilePhoto} = req.file;
//     // const name = req.body?.name;
//     const profilePhoto = req.file;
       
//        const user = await User.findById(userId);
//        if( !user ) {
//         return res.status(404).json({
//             message:"User not found",
//             success: false
//         });
//        }

//        // extract the public id of the old image from the url if it exist
//        let photoUrl = user.photoUrl;
       
//        if(profilePhoto) {
//         if( user.photoUrl ) {
//             const publicId = user.photoUrl.split("/").pop().split(".")[0]; //extract public id 

//             deleteMediaFromCloudinary( publicId );
//         }
//        }

        
//        // upload new profile photo
//        const cloudResponse = await uploadMedia(profilePhoto.path);
//     //    const photoUrl = cloudResponse.secure_url;
//         if (!cloudResponse) {
//             return res.status(500).json({
//             success: false,
//             message: "Profile photo upload failed",
//             });
//         }

//         photoUrl = cloudResponse.secure_url;
//         }

//        const updatedData = {name:name, photoUrl};
//        const updatedUser = await User.findByIdAndUpdate( userId, updatedData, {new: true}).select("-password");
//        return res.status(200).json({
//         success: true,
//         user: updatedUser,
//         message: "Profile updated success"
//        });

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             success: false,
//             message:"Failed to update profile"
//         });
//     }
// }