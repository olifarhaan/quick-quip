import express from "express"
import {
  deleteUserController,
  updateUserController,
  getUserController,
} from "../controllers/userController.js"
import { verifyToken } from "../middlewares/verifyTokenMiddleware.js"

const router = express.Router()

router.get("/:userId", getUserController)
router.put("/:userId", verifyToken, updateUserController)
router.delete("/:userId", verifyToken, deleteUserController)

export default router
