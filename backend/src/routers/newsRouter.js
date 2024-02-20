const {
  deleteArticle,
  getArticleById,
  createArticle,
  getArticles
} = require('../controllers/newsController.js');
const express = require('express');
const { admin, protect } = require('../midddelwars/permission.js');

const articleRouter = express.Router();
articleRouter.post('/', createArticle);
articleRouter.get('/', getArticles);
articleRouter.get('/:id', getArticleById);
articleRouter.delete('/:id', deleteArticle);
module.exports = articleRouter;
