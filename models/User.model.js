const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      trim: true,
      required: true,
      minLength: [2, 'Password must have at least 2 characters']
    },
    username: {
      type: String,
      trim: true,
      required: [true, 'Username is required'],
      minLength: [3, 'Username must have at least 3 characters']
    },
    avatar: {
      type: String,
      default: "https://res.cloudinary.com/di6ko4xuw/image/upload/v1685874411/user-avatar-transparent_nehwkk.png"
    },
    role: {
      type: String,
      enum: ['USER', 'ADMIN'],
      default: 'USER',
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
