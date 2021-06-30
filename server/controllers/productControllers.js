import AsyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import updateRating from "../utils/updateRating.js";

/***
@desc Sends all products
@route GET /api/products
@access Public
**/
const getProducts = AsyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

/***
 *   @desc Sends one product 
    @route GET /api/products/:id
    @access Public
**/

const getProductByID = AsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.send(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

/***
@desc Add new Products by admin 
@route GET /api/products/add
@access Private(Admin only)
**/

const addProducts = AsyncHandler(async (req, res) => {
  if (!req.user.isAdmin) res.status(401).send({ Error: "Unauthorized Access" });

  const { productToBeAdded } = req.body;

  const newProduct = await Product.create(productToBeAdded);

  if (newProduct) res.status(201).send(newProduct);
  else res.status(401).send({ Error: "Server Error" });
});

/***
@desc Add reviews of a product 
@route POST /api/products/reviews
@access Private
**/

const addReviews = AsyncHandler(async (req, res) => {
  const { productID, userReview } = req.body;

  let product = await Product.findById(productID);

  product.reviews.push(userReview);
  product.numReviews = product.reviews.length;
  product.rating = updateRating(product.reviews, product.numReviews);

  let updatedProduct = await product.save();

  res.status(200).send(updatedProduct);
});

/***
@desc Delete reviews of a product 
@route POST /api/products/deletereviews
@access Private
**/

const deleteReviews = AsyncHandler(async (req, res) => {
  const { productID } = req.body;
  const userID = req.user._id;

  let product = await Product.findById(productID);

  let userCommentIndex = product.reviews.findIndex(
    (review) => review.user.toString() === String(userID).toString()
  );

  if (userCommentIndex === -1) {
    res.status(401).send({ Error: "Invalid Comment" });
  }

  product.reviews.splice(userCommentIndex, 1);
  product.numReviews = product.reviews.length;
  product.rating = updateRating(product.reviews, product.numReviews);

  const updatedProduct = await product.save();

  res.status(200).send({ updatedProduct });
});

/***
@desc Update stock of a product 
@route POST /api/products/updateQty
@access Private
**/

const updateQty = AsyncHandler(async (req, res) => {
  const { updateItems } = req.body;

  await updateItems.forEach(async (item) => {
    let product = await Product.findById(item.productID);
    if (product.countInStock < item.qty) res.status(400).send({});
    else product.countInStock -= item.qty;
    await product.save();
  });

  res.status(201).send({});
});

/***
@desc Delete product from database 
@route POST /api/products/delete
@access Private(Admin only)
**/

const deleteProduct = AsyncHandler(async (req, res) => {
  if (!req.user.isAdmin) res.status(401).send({});
  const { productID } = req.body;

  const result = await Product.findByIdAndDelete(productID);
  res.status(201).send({ result });
});

export {
  getProductByID,
  getProducts,
  addProducts,
  addReviews,
  deleteReviews,
  updateQty,
  deleteProduct,
};
