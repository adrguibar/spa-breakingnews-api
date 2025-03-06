import News from "../models/News.js";

const createService = async (body) => News.create(body);

const findAllService = async () => News.find();

export default {
    createService,
    findAllService,
};

