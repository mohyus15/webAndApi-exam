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
  const product = await News.findById(req.params.id);
  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.status(200).json({ message: 'user deleted wa successfully' });
  } else {
    res.status(404);
    throw new Error('user not found');
  }
};

const  getArticles = async (req, res) => {
  const numberOfPages = 10;
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