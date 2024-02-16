import express from "express"

import { verifyToken } from "../middlewares/verifyTokenMiddleware.js"
import {
  createUrlController,
  getAllUrlController,
  getUrlController,
  updateUrlController,
  deleteUrlController,
  createQRCodeController,
  generateQRforStoredUrlController,
  getAllQRCodeController
} from "../controllers/urlController.js"
import checkObjectIdParamMiddleware from "../middlewares/checkObjectIdParamMiddleware.js"

const router = express.Router()

// router.get("/", getUserController)
router.post("/", verifyToken, createUrlController)
router.post("/generateQR", verifyToken, createQRCodeController)
router.get("/qrCode/:userId", verifyToken, getAllQRCodeController)
router.put(
  "/:urlId",
  checkObjectIdParamMiddleware,
  verifyToken,
  updateUrlController
)
router.get(
  "/:userId",
  checkObjectIdParamMiddleware,
  verifyToken,
  getAllUrlController
)
router.get(
  "/:userId/:urlId",
  checkObjectIdParamMiddleware,
  verifyToken,
  getUrlController
)

router.delete(
  "/:urlId",
  checkObjectIdParamMiddleware,
  verifyToken,
  deleteUrlController
)

router.put(
  "/generateQR/:urlId",
  checkObjectIdParamMiddleware,
  verifyToken,
  generateQRforStoredUrlController
)

export default router
