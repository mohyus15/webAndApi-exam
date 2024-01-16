const Product = require('../models/productModels.js');
const createProduct = async (req, res) => {
  const { name, image, brand, category, description, price, countInStock } =
    req.body;
  console.log(req.body);
  const userId = req.user;
  console.log(userId);

  try {
    const productCreated = await Product.create({
      name,
      image,
      brand,
      category,
      description,
      price,
      countInStock,
    });
    res.status(200).json(productCreated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createProductsReview = async (req, res) => {
  const { rating, comment } = req.body;
  const reviewProducts = await Product.findById(req.params.id);
  const allredyReviewed = reviewProducts.reviews.find(
    (reviews) => reviews.user.toString() === req.user._id.toString()
  );
  if (allredyReviewed) {
    res.status(400).json('product i allready reviewed');

    const notReviwedBefor = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
    reviewProducts.reviews.push(notReviwedBefor);
    reviewProducts.numreviews = reviewProducts.reviews.length;
    reviewProducts.rating =
      reviewProducts.reviews.reducer((acc, revie) => acc + revie.rating, 0) /
      reviewProducts.reviews.length;
    await reviewProducts.save();
    res.status(201).json('review is created');
  } else {
    res.status(400);
    throw new Error('there is no reviw');
  }
};

const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.status(200).json({ message: 'user deleted wa successfully' });
  } else {
    res.status(404);
    throw new Error('user not found');
  }
};

const getProducts = async (req, res) => {
  const numberOfPages = 8;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const count = await Product.countDocuments({
    ...keyword,
  });

  const json = await Product.find({ ...keyword })
    .limit(numberOfPages)
    .skip(numberOfPages * (page - 1));
  res.status(200).json({
    json,
    page,
    pages: Math.ceil(count / numberOfPages),
  });
};
const getProductsById = async (req, res) => {
  const project = await Product.findById(req.params.id);

  if (project) {
    res.json(project);
  } else {
    res.status(404);
    throw new Error('Project not found');
  }
};
const getTopProducts = async (req, res) => {
  const projects = await Product.find({}).sort({ toThree: -1 }).limit(3);

  res.status(200).json(projects);
};

module.exports = {
  deleteProduct,
  getProductsById,
  createProduct,
  getProducts,
  createProductsReview,
  getTopProducts,
};
