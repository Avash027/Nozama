import axios from "axios";

export const _AddProductSubmitHandler = async (
  user,
  name,
  image,
  brand,
  category,
  description,
  price,
  countInStock,
  token
) => {
  try {
    const productToBeAdded = {
      user,
      name,
      image,
      brand,
      category,
      description,
      reviews: [],
      price,
      countInStock,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.post(
      "/api/products/add",
      { productToBeAdded },
      config
    );

    return [data, null];
  } catch (error) {
    return [null, error];
  }
};

export const _DeleteProductHandler = async (token, productID) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
      },
    };

    const body = {
      productID,
    };

    const { data } = await axios.post("/api/products/delete", body, config);
    return [data, null];
  } catch (error) {
    return [null, error];
  }
};
