import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
)

// For ensuring the integrity of the database
userSchema.pre("remove", async function (next) {
  try {
    // Delete all posts where userId matches the current user's _id
    await Url.deleteMany({ user: this._id })
    next()
  } catch (error) {
    next(error)
  }
})

const User = mongoose.model("User", userSchema)

export default User
