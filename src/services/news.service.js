import News from "../models/News.js";

export const createService = async (body) => News.create(body);

export const findAllService = async (limit, offset) =>
  News.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user");

export const countNews = () => News.countDocuments();

export const topNewsService = async () =>
  News.findOne().sort({ _id: -1 }).populate("user");

export const findByIdService = async (id) => News.findById(id).populate("user");

export const searchByTitleService = async (title) =>
  News.find({
    title: { $regex: `${title || ""}`, $options: "i" },
  })
    .sort({ _id: -1 })
    .populate("user");

export const findByUserIdService = async (userId) =>
  News.find({ user: userId }).sort({ _id: -1 }).populate("user");

export const updateService = async (id, title, text, banner) =>
  News.findOneAndUpdate(
    { _id: id },
    { title, text, banner },
    { rawResult: true }
  );

export const eraseService = async (id) => {
  return News.findByIdAndDelete(id);
};

export const likeNewsService = async (id, userId) => {
  return News.findOneAndUpdate(
    { _id: id, "likes.userId": { $nin: [userId] } },
    { $push: { likes: { userId, createdAt: new Date() } } }
  );
};

export const unlikeNewsService = async (id, userId) => {
  return News.findOneAndUpdate({ _id: id }, { $pull: { likes: { userId } } });
};

export const addCommentService = async (idNews, userId, comment) => {
  const idComment = Math.floor(Date.now() * Math.random()).toString(36);

  return News.findOneAndUpdate(
    { _id: idNews },
    { $push: {comments: { idComment, userId, comment, createdAt: new Date() }} }
  );
};

export const deleteCommentService = async (idNews, idComment, userId) => {
    return News.findOneAndUpdate(
      { _id: idNews },
      { $pull: { comments: { idComment, userId } } }
    );
}