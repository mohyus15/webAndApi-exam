const News = require("../models/newsModels");
const createArticle = async (req, res) => {
  const { title, image, text, name } = req.body;
  try {
    const titleExist = await News.findOne({ title });
    if (titleExist) {
      throw new Error('Title already exists in the database');
    }
    const newCreated = await News.create({ title, image, text, name });
    res.status(200).json(newCreated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



const deleteArticle = async (req, res) => {
  try {
      const news = await News.findById(req.params.id);
      if (news) {
          await News.deleteOne({ _id: news._id });
          res.status(200).json({ message: 'Article deleted successfully' });
      } else {
          res.status(404).json({ message: 'Article not found' });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
};


const  getArticles = async (req, res) => {
  const numberOfPages = 15;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const count = await News.countDocuments({
    ...keyword,
  });

  const json = await News.find({ ...keyword })
    .limit(numberOfPages)
    .skip(numberOfPages * (page - 1));
  res.status(200).json({
    json,
    page,
    pages: Math.ceil(count / numberOfPages),
  });
};
const getArticleById = async (req, res) => {
  const project = await News.findById(req.params.id);

  if (project) {
    res.json(project);
  } else {
    res.status(404);
    throw new Error('Project not found');
  }
};

module.exports = {
  deleteArticle,
  getArticleById,
  createArticle,
   getArticles
};