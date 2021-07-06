import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  _deleteReviewSubmitHandler,
  _reviewSubmitHandlerUtil,
} from "../../utils/CommentAPI";
import CommentElement from "./CommentElement";

const CommentSection = ({ productID, setComment, reviews, history }) => {
  let ratingElement = [];

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [rating, setRating] = useState(1);
  const [review, setReview] = useState("");
  const [userPresent, setUserPresent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!userInfo) return;

    const userAlreadyPresent = reviews.find(
      (review) => review.user === userInfo._id
    );
    setUserPresent(userAlreadyPresent);
  }, [reviews, userInfo]);

  const reviewSubmitHandler = async () => {
    if (!userInfo) {
      history.push("/login");
      return;
    }

    if (review.length === 0) {
      return alert("Enter a valid comment");
    }

    setIsLoading(true);
    const [data, error] = await _reviewSubmitHandlerUtil(
      userInfo.token,
      productID,
      userInfo.name,
      rating,
      review,
      userInfo._id
    );

    setIsLoading(false);
    if (data) {
      setComment(data);
      setUserPresent(true);
      return;
    }

    if (error) alert("Comment could not be processed!!");
  };

  const deleteReviewSubmitHandler = async () => {
    setIsLoading(false);
    const [data, error] = await _deleteReviewSubmitHandler(
      userInfo.token,
      productID
    );

    if (data) {
      setComment(data);
      setUserPresent(false);
    } else if (error) {
      alert("Sorry could not delete the comment right now");
    }
  };

  for (let i = 1; i <= 5; i++) {
    ratingElement.push(
      <span className="comment-rating" key={i.toString()}>
        <i
          className={i <= rating ? "fas fa-star" : "far fa-star"}
          id={i}
          onClick={(e) => setRating(Number(e.target.id))}
        />
      </span>
    );
  }

  return (
    <section className="comment">
      <div className="comment-primary-heading">
        Reviews
        <hr />
      </div>

      <div className="comment-rating-container">
        Rate this product : {ratingElement.map((element) => element)}
      </div>

      <div className="comment-review-input-container">
        <input
          type="text"
          className="comment-review-input"
          placeholder="Enter your reviews"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required
        />
      </div>

      <div className="comment-review-button-container">
        <button
          className="button button-primary"
          onClick={reviewSubmitHandler}
          disabled={userPresent}
        >
          {isLoading ? (
            <i className="fa fa-spinner fa-spin"></i>
          ) : (
            "Submit review"
          )}
        </button>
      </div>

      <div className="primary-heading">Read reviews by others</div>

      <div className="comment-user-reviews-container">
        {reviews &&
          reviews.length !== 0 &&
          reviews.map((userReview) => (
            <CommentElement
              key={userReview._id}
              userReview={userReview}
              deleteReviewSubmitHandler={deleteReviewSubmitHandler}
            />
          ))}
      </div>
    </section>
  );
};

export default CommentSection;
