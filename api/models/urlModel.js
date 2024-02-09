import mongoose from "mongoose"

const urlSchema = new mongoose.Schema(
  {
    title:{
      type:String,
      required:true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    shortcode: {
      type: String,
      required: true,
      unique: true,
    },
    longUrl: {
      type: String,
      required: true,
    },
    noOfVisits: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
)

const Url = mongoose.model("Url", urlSchema)

export default Url
