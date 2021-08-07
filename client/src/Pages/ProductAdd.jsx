import React, { useState, useEffect, useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import loadable from "@loadable/component";
import NotificationSystem from "react-notification-system";
import { reducer, initialState } from "../utils/ProductAddReducer";

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

  const [comment, setComment] = useState({}); // Used in deleteProduct
  const [toaddProduct, setToaddProduct] = useState(true);

  const [state, dispathProduct] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch, comment]);

  const AddProductSubmitHandler = async () => {
    const [data, error] = await _AddProductSubmitHandler(
      userInfo._id,
      state.name,
      state.files,
      state.brand,
      state.category,
      state.description,
      Number(state.price),
      Number(state.stock),
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
        dispathProduct({ type: "SET_FILES", payload: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }

  let elemToBeRendered;

  if (toaddProduct) {
    elemToBeRendered = (
      <AddProduct
        dispatch={dispathProduct}
        state={state}
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
