import express from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import { User } from '../models/user.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (err) {
        throw new ApiError(500, "Error in generating access or refresh tokens");
    }
}

//********REGISTER USER*************

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if ([email, password, username].some(field => field?.trim() === "")) {
        throw new ApiError(400, "Please provide all the fields");
    }

    const existedUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existedUser) throw new ApiError(409, "User already exists");

    // Log the req.files to debug
    console.log('req.files:', req.files);

    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    // const coverImageLocalPath = req.files?.coverImage?.[0]?.path;\

    let coverImageLocalPath; // if it does not work can use the previous commented line

    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path;
    }

    if (!avatarLocalPath) throw new ApiError(400, "Please provide avatar");

    // Upload on Cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = coverImageLocalPath ? await uploadOnCloudinary(coverImageLocalPath) : null;

    if (!avatar) throw new ApiError(500, "Error in uploading avatar...AVATAR IMAGE IS MUST");

    const user = await User.create({
        username: username.toLowerCase(),
        email,
        password,
        avatar: avatar.url,
        coverImage: coverImage ? coverImage.url : ""
    });

    const createdUser = await User.findById(user._id).select("-password -refreshToken");
    
    if (!createdUser) throw new ApiError(500, "Error in creating user");

    return res.status(201).json(new ApiResponse(201, createdUser, "User created successfully"));
});

//********LOGIN USER*************

const loginUser = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body;

    if (!email && !username) {
        throw new ApiError(400, "Please provide email or username");
    }

    const user = await User.findOne({
        $or: [{ email }, { username }]
    });

    if (!user) {
        throw new ApiError(401, "User does not exist");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid User credentials");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, { user: loggedInUser, accessToken, refreshToken }, "User Logged In Successfully"));
});

/**********LOGOUT********* */

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        { $set: { refreshToken: undefined } },
        { new: true }
    );

    const options = {
        httpOnly: true,
        secure: true
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User Logged Out"));
});

export {
    registerUser,
    loginUser,
    logoutUser
};
