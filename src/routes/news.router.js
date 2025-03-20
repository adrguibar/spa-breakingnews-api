import { create, findAll, topNews, findById } from "../controllers/news.controller.js";
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middlewares.js";
import { validId, validUser } from "../middlewares/global.middlewares.js";
const router = Router();

router.post("/", authMiddleware, validId, validUser, create);
router.get("/", findAll);
router.get("/top", topNews);
router.get("/:id", findById);

export default router;