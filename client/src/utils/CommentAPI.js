import axios from "axios";

export const _reviewSubmitHandlerUtil = async (
  token,
  productID,
  name,
  rating,
  comment,
  user
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
      },
    };

    const body = {
      productID,
      userReview: {
        name,
        rating,
        comment,
        user,
      },
    };

    const { data } = await axios.post("/api/products/reviews", body, config);

    return [data, null];
  } catch (error) {
    return [null, error];
  }
};

export const _deleteReviewSubmitHandler = async (token, productID) => {
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

    const { data } = await axios.post(
      "/api/products/deletereviews",
      body,
      config
    );
    return [data, null];
  } catch (error) {
    return [null, error];
  }
};
