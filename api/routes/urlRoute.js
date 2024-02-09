import express from "express"

import { verifyToken } from "../middlewares/verifyTokenMiddleware.js"
import {
  createUrlController,
  getAllUrlController,
  getUrlController,
  updateUrlController,
  deleteUrlController,
} from "../controllers/urlController.js"

const router = express.Router()

// router.get("/", getUserController)
router.post("/", verifyToken, createUrlController)
router.put("/:urlId", verifyToken, updateUrlController)
router.get("/:userId", verifyToken, getAllUrlController)
router.get("/:userId/:urlId", verifyToken, getUrlController)

router.delete("/:urlId", verifyToken, deleteUrlController)


export default router
