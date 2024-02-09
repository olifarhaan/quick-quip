import { UNAUTHORIZED_MESSAGE } from "../utils/constants.js"
import { errorHandler } from "../utils/errors.js"
import { isValidUrl } from "../utils/validUrl.js"
import Url from "../models/urlModel.js"
import mongoose from "mongoose"

export const createUrlController = async (req, res, next) => {
  if (!req.body.longUrl) {
    return next(errorHandler(400, "Please provide the long url"))
  }
  console.log(req.body)

  if (!isValidUrl(req.body.longUrl)) {
    return next(errorHandler(400, "Please provide a valid long url"))
  }

  let title = "Untitled"
  if (req.body.title && req.body.title.trim() !== "") {
    title = req.body.title
  }
  let shortcode = null
  if (req.body.shortcode && req.body.shortcode.trim() !== "") {
    try {
      const existingUrl = Url.findOne({ shortcode: req.body.shortcode.trim() })
      if (existingUrl) {
        return next(
          errorHandler(
            400,
            `This short link ${req.body.shortcode.trim()} is taken`
          )
        )
      } else {
        shortcode = req.body.shortcode.trim()
      }
    } catch (error) {
      next(error)
    }
  } else shortcode = Math.random().toString(36).slice(-6).toUpperCase()

  const newUrl = new Url({
    title,
    shortcode,
    longUrl: req.body.longUrl,
    user: req.user.id,
  })
  newUrl._id = new mongoose.Types.ObjectId()
  try {
    console.log("second----------------------------")

    const savedUrl = await newUrl.save()
    console.log(savedUrl, "----------------------------")
    res
      .status(201)
      .jsonResponse(201, true, "Url created successfully", savedUrl)
  } catch (error) {
    next(error)
  }
}

export const getAllUrlController = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(401, "You are not allowed to do this request"))
  }

  try {
    const urls = await Url.find({ user: req.user.id })
    res.status(200).jsonResponse(200, true, "Post fetching successfull", urls)
  } catch (error) {
    next(error)
  }
}

export const getUrlController = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(401, "You are not allowed to do this request"))
  }

  try {
    const url = await Url.findOne({ _id: req.params.urlId })
    if (url) {
      if (url._doc.user.toString() === req.user.id) {
        res
          .status(200)
          .jsonResponse(200, true, "Post fetching successfull", url)
      } else {
        return next(errorHandler(401, "You are not allowed to do this request"))
      }
    } else {
      return next(errorHandler(404, "Link does not exist"))
    }
  } catch (error) {
    next(error)
  }
}

export const updateUrlController = async (req, res, next) => {
  const urlId = req.params.urlId
  try {
    const url = await Url.findById(urlId)
    if (!url) {
      return next(errorHandler(404, "Url not found"))
    }
    console.log("url---------------")
    console.log(url._doc)
    console.log(url._doc.user.toString(), req.user.id)

    if (url._doc.user.toString() !== req.user.id) {
      return next(errorHandler(401, "You are not allowed to do this request"))
    }

    const updatedUrl = await Url.findByIdAndUpdate(
      urlId,
      {
        $set: {
          title: req.body.title,
          shortcode: req.body.shortcode,
          longUrl: req.body.longUrl,
        },
      },
      { new: true }
    )
    console.log(updatedUrl)

    res
      .status(201)
      .jsonResponse(201, true, "Url updated successfully", updatedUrl)
  } catch (error) {
    next(error)
  }
}

export const deleteUrlController = async (req, res, next) => {
  try {
    const url = await Url.findById(req.params.urlId)
    if (!url) {
      return next(errorHandler(404, "Url not found"))
    }
    console.log(url._doc.user)

    if (url._doc.user.toString() === req.user.id) {
      await url.deleteOne()
      res
        .status(200)
        .jsonResponse(200, true, "The post has been deleted successfully")
    } else {
      return next(errorHandler(403, UNAUTHORIZED_MESSAGE))
    }
  } catch (error) {
    next(error)
  }
}