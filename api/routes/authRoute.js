import express from "express"
import {
  signupController,
  signinController,
  signoutController,
} from "../controllers/authController.js"

const router = express.Router()

router.post("/signup", signupController)
router.post("/signin", signinController)
router.post("/signout", signoutController)

export default router
