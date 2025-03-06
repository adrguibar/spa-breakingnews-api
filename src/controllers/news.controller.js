import { createService, findAllService } from "../services/news.service.js";

const create = async (req, res) => {
  try {
    const { title, text, banner } = req.body;

    if (!title || !text || !banner) {
      return res.status(400).send({ message: "Missing required fields" });
    }

    await createService({ title, text, banner, id: "objectidFake" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
  res.status(201).send("Create news");
};

const findAll = (req, res) => {
  const news = [];
  res.status(200).send(news);
};

export { create, findAll };
