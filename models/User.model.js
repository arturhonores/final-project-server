const { Schema, model } = require("mongoose");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
    limit: {
      type: Number,
      default: 0
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
)

userSchema.pre('save', function (next) {

  const saltRounds = 10
  const salt = bcrypt.genSaltSync(saltRounds)
  const hashedPassword = bcrypt.hashSync(this.password, salt)
  this.password = hashedPassword

  next()
})

userSchema.methods.signToken = function () {
  const { _id, username, email, avatar, limit } = this
  const payload = { _id, username, email, avatar, limit }

  const authToken = jwt.sign(
    payload,
    process.env.TOKEN_SECRET,
    { algorithm: 'HS256', expiresIn: "6h" }
  )

  return authToken
}

userSchema.methods.validatePassword = function (candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password)
}

const User = model("User", userSchema);

module.exports = User;
