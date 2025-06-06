import mongoose, { Schema } from 'mongoose';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"


const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      index: true, //if you want to search it effeciently use , it is expensive so use it carefully
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true, // again using index to search is very expensive
    },
    avatar: {
      type: String, // cloudinary url
      required: true,
    },
    coverImage: {
      type: String, //cloudinary url
    },

    watchHistroy: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Video',
      },
    ],
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id : this._id,
        email : this.email,
        username : this.username,
        fullname : this.fullname
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn : process.env.ACCESS_TOKEN_EXPIRY
    })
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id : this._id,
       
    }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn : process.env.REFRESH_TOKEN_EXPIRY
    })
}


export const User = mongoose.model('User', userSchema);
