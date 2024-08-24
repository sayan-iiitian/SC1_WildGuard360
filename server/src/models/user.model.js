import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import express from 'express';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a name'],
        unique: true,
        lowercase: true,
        trim: true,
        index:true
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        lowercase: true
    },
    avatar:{
        type: String,    //cloudinary link
    },
    watchHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Video'
        }
    ],
    password: {
        type: String,
        required: [true, 'Please provide a password'],
    },
    refreshToken: {
        type: String
    }
},
    {
    timestamps: true
    }
  
);

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next();
    }
    this.password = await bcrypt.hash(this.password,10);
    next();
})
//bcrypt password match
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}

//access token
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id:this._id,
            username:this.username,
            email:this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}


//refresh token
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}




export const User = mongoose.model('User', userSchema);