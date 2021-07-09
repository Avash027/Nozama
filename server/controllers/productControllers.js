import AsyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import updateRating from "../utils/updateRating.js";
import NodeCache from "node-cache";

const productCache = new NodeCache();

/***
@desc Sends all products
@route GET /api/products
@access Public
**/
const getProducts = AsyncHandler(async (req, res) => {
  if (productCache.get("products")) {
    res.status(200).json(productCache.get("products"));
  } else {
    const products = await Product.find({});
    productCache.set("products", products, 1000);
    res.status(200).json(products);
  }
});

/***
    @desc Sends one product 
    @route GET /api/products/:id
    @access Public
**/

const getProductByID = AsyncHandler(async (req, res) => {
  const productID = req.params.id;

  if (!productID || typeof productID !== "string") {
    res.status(400).json({ message: "Invalid request" });
  }

  const product = await Product.findById(req.params.id);

  if (product) {
    res.status(200).send(product);
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
  if (!req.user.isAdmin)
    res.status(401).send({ message: "Unauthorized Access" });

  const { productToBeAdded } = req.body;

  const newProduct = await Product.create(productToBeAdded);

  if (newProduct) res.status(201).send(newProduct);
  else res.status(400).json({ message: "Invalid Request" });
});

/***
@desc Add reviews of a product 
@route POST /api/products/reviews
@access Private
**/

const addReviews = AsyncHandler(async (req, res) => {
  const { productID, userReview } = req.body;

  if (
    !userReview ||
    typeof userReview !== "object" ||
    !productID ||
    typeof productID !== "string"
  )
    res.status(401).json({ message: "Invalid request" });

  let product = await Product.findById(productID, "reviews numReviews rating");

  product.reviews.push(userReview);
  product.numReviews = product.reviews.length;
  product.rating = updateRating(product.reviews, product.numReviews);

  const updatedProductInformation = await product.save();

  if (updatedProductInformation)
    res.status(200).send(updatedProductInformation);
  else res.status(401).json({ message: "Invalid request" });
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

  let indexOfCommentToBeDeleted = product.reviews.findIndex(
    ({ user }) => String(user) === String(userID)
  );

  if (indexOfCommentToBeDeleted === -1) {
    res.status(401).json({ message: "Invalid Comment" });
  }

  product.reviews.splice(indexOfCommentToBeDeleted, 1);
  product.numReviews = product.reviews.length;
  product.rating = updateRating(product.reviews, product.numReviews);

  const updatedProduct = await product.save();

  res.status(200).json(updatedProduct);
});

/***
@desc Update stock of a product 
@route POST /api/products/updateQty
@access Private
**/

const updateQty = AsyncHandler(async (req, res) => {
  const { updateItems } = req.body;

  await updateItems.forEach(async (item) => {
    let product = await Product.findById(item.productID, "countInStock");
    if (product.countInStock < item.qty)
      res.status(400).send({ message: "Invalid Request" });
    else product.countInStock -= item.qty;
    await product.save();
  });

  res.status(201).send({ message: "Products Quantity updated successfully" });
});

/***
@desc Delete product from database 
@route POST /api/products/delete
@access Private(Admin only)
**/

const deleteProduct = AsyncHandler(async (req, res) => {
  if (!req.user.isAdmin)
    res.status(401).json({ message: "Unauthorized request" });
  const { productID } = req.body;

  if (!productID || typeof productID !== "string")
    res.status(400).json({ message: "Invalid Product ID" });

  const result = await Product.findByIdAndDelete(productID);
  if (result) res.status(201).json({ result });
  else res.status(401).json({ message: "ProductID not found" });
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
