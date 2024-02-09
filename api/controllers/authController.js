import User from "../models/userModel.js"
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/errors.js"
import jwt from "jsonwebtoken"
import { v4 as uuidv4 } from "uuid"
import dotenv from "dotenv/config"
import { isValidEmail } from "../utils/validEmail.js"
import mongoose from "mongoose"

export const signupController = async (req, res, next) => {
  console.log(req.body)

  const { name, email, password } = req.body

  // const name = nameParsed.trim()
  // const username = usernameParsed.trim()
  // const email = emailParsed.trim()
  // const password = passwordParsed.trim()

  if (
    !name ||
    !email ||
    !password ||
    name === "" ||
    email === "" ||
    password === ""
  ) {
    return next(errorHandler(400, "All fields are required"))
  }

  if (email.includes(" ") || password.includes(" ")) {
    return next(
      errorHandler(400, "Email and password should not contain whitespace")
    )
  }

  if (!isValidEmail(email)) {
    return next(errorHandler(400, "Enter a valid email"))
  }

  try {
    // check for existing user
    const existingEmail = await User.findOne({ email })
    if (existingEmail) {
      return next(
        errorHandler(409, "Email already registered, sign in instead")
      )
    }

    const hashedPassword = bcryptjs.hashSync(password, 10)
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    })
    //saving the new user
    newUser._id = new mongoose.Types.ObjectId();
    const response = await newUser.save()
    res.status(201).jsonResponse(true, 201, "Sign up successfull", response)
  } catch (error) {
    next(error)
  }
}

export const signinController = async (req, res, next) => {
  let { email, password } = req.body

  if (!email || !password) {
    return next(errorHandler(400, "All fields are required"))
  }

  email = email.trim()
  password = password.trim()

  if (email === "" || password === "") {
    return next(errorHandler(400, "All fields are required"))
  }

  if (email.includes(" ") || password.includes(" ")) {
    return next(
      errorHandler(400, "Email and password should not contain whitespace")
    )
  }

  if (!isValidEmail(email)) {
    return next(errorHandler(400, "Enter a valid email"))
  }

  try {
    // check for existing user
    const user = await User.findOne({ email })
    if (!user) {
      return next(errorHandler(404, "User does not exist"))
    }
    console.log(user)
    console.log(user._doc)

    const isValidPassword = bcryptjs.compareSync(password, user.password)
    if (!isValidPassword) {
      return next(errorHandler(400, "Invalid credentials"))
    }
    //setting the token
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    )

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000,
    })
    const { password: passwordExtracted, ...userWithoutPassword } = user._doc
    res
      .status(200)
      .jsonResponse(
        true,
        200,
        "User signed in successfully",
        userWithoutPassword
      )
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export const googleController = async (req, res, next) => {
  const { email, name, imgUrl } = req.body

  if (!isValidEmail(email)) {
    return next(errorHandler(400, "Enter a valid email"))
  }

  try {
    const existingUser = await User.findOne({ email })
    if (!existingUser) {
      const generatedPassword = Math.random().toString(36).slice(-8)
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10)
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        imgUrl,
      })
      newUser.save()
      const auth_token = jwt.sign(
        {
          id: newUser._id,
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "1d",
        }
      )
      res.cookie("auth_token", auth_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      })
      const { password: passwordExtracted, ...userWithoutPassword } =
        newUser._doc
      res
        .status(200)
        .jsonResponse(true, 200, "Signed in successfully", userWithoutPassword)
    } else {
      const auth_token = jwt.sign(
        {
          id: existingUser._id,
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "1d",
        }
      )
      res.cookie("auth_token", auth_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      })
      // console.log(existingUser)
      const { password: passwordExtracted, ...userWithoutPassword } =
        existingUser._doc
      res
        .status(200)
        .jsonResponse(true, 200, "Signed in successfully", userWithoutPassword)
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export const signoutController = async (req, res, next) => {
  try {
    res.clearCookie("auth_token")
    res.status(200).jsonResponse(true, 200, "User signed out successfully")
  } catch (error) {
    next(error)
  }
}
