import mongoose from "mongoose";
import userService from "../services/user.service.js";

export const validId = (req, res, next) => {
  try {
    const id = req.params.userId;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid id" });
    }

    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const validUser = async (req, res, next) => {
  try {
    const id = req.params.userId;
    const user = await userService.findByIdService(id);

    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }

    req.id = id;
    req.user = user;

    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const validNews = async (req, res, next) => {
  try {
    const { title, text, banner } = req.body;

    if (!title || !text || !banner) {
      return res
        .status(400)
        .send({ message: "Missing fields required for creating news." });
    }

    next();
  } catch (err) {
    res.status(500).send({ message: "Error validating News: " + err.message });
  }
};
