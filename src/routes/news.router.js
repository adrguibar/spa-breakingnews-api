import { create, findAll, topNews, findById, searchByTitle } from "../controllers/news.controller.js";
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middlewares.js";

const router = Router();

router.post("/", authMiddleware, create);
router.get("/", findAll);
router.get("/top", topNews);
router.get("/search", searchByTitle);

router.get("/:id", authMiddleware, findById);

export default router;