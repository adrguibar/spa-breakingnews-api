import News from "../models/News.js";

export const createService = async (body) => News.create(body);

export const findAllService = async (limit, offset) =>
  News.find().sort({ id: -1 }).skip(offset).limit(limit).populate("user");

export const countNews = () => News.countDocuments();

export const topNewsService = async () =>
  News.findOne().sort({ _id: -1 }).populate("user");

export const findByIdService = async (id) => News.findById(id).populate("user");
