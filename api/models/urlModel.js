import mongoose from "mongoose"

const urlSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    favicon: {
      type: String,
      required: true,
      default: "https://cdn-icons-png.freepik.com/256/44/44386.png",
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
    qrCode: {
      type: String,
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
