import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import loadable from "@loadable/component";
import NotificationSystem from "react-notification-system";

import { listProducts } from "../actions/productActions";
import {
  _AddProductSubmitHandler,
  _DeleteProductHandler,
} from "../utils/ProductAdd";

import Notification from "../utils/Notification";

const AddProduct = loadable(() =>
  import("../Components/AdminPanel/AddProduct")
);
const DeleteProductItem = loadable(() =>
  import("../Components/AdminPanel/DeleteProductItem")
);
const Error = loadable(() => import("../Components/Others/Error"));
const Loading = loadable(() => import("../Components/Others/Loading"));

const ProductAdd = ({ history }) => {
  const dispatch = useDispatch();
  const notificationSystem = React.createRef();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [files, setFiles] = useState("");
  const [comment, setComment] = useState({});
  const [toaddProduct, setToaddProduct] = useState(true);

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch, comment]);

  const AddProductSubmitHandler = async () => {
    const [data, error] = await _AddProductSubmitHandler(
      userInfo._id,
      name,
      files,
      brand,
      category,
      description,
      Number(price),
      Number(stock),
      userInfo.token
    );

    if (data) {
      Notification(
        notificationSystem,
        "success",
        "Product Added",
        "Product added successfully"
      );
      history.push("/add");
    } else if (error) {
      Notification(
        notificationSystem,
        "error",
        "Product could not be added",
        "Image size too large"
      );
    }
  };

  const deleteProductHandler = async (productID) => {
    const token = userInfo.token;

    const [data, error] = await _DeleteProductHandler(token, productID);

    if (data) {
      Notification(
        notificationSystem,
        "success",
        "Product Deleted",
        "Product deleted Successfully"
      );
      setComment(data);
    } else if (error) {
      Notification(
        notificationSystem,
        "error",
        "Product could not be deleted",
        "Try checking the database"
      );
    }
  };

  function convertImageToBase64(e) {
    let file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFiles(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  let elemToBeRendered;

  if (toaddProduct) {
    elemToBeRendered = (
      <AddProduct
        name={name}
        setName={setName}
        brand={brand}
        setBrand={setBrand}
        category={category}
        setCategory={setCategory}
        description={description}
        setDescription={setDescription}
        price={price}
        setPrice={setPrice}
        stock={stock}
        setStock={setStock}
        convertImageToBase64={convertImageToBase64}
        AddProductSubmitHandler={AddProductSubmitHandler}
      />
    );
  } else if (loading) elemToBeRendered = <Loading></Loading>;
  else if (error) elemToBeRendered = <Error />;
  else {
    elemToBeRendered = (
      <div className="product-delete">
        {products.map((product) => (
          <DeleteProductItem
            key={product._id}
            product={product}
            deleteProductHandler={deleteProductHandler}
          />
        ))}
      </div>
    );
  }

  return (
    <>
      <NotificationSystem ref={notificationSystem} />
      <div
        className="toggleBar"
        onClick={(e) => setToaddProduct(!toaddProduct)}
      >
        {toaddProduct ? "Add Products" : "Delete Products"}
      </div>
      {elemToBeRendered}
    </>
  );
};

export default ProductAdd;
