import React from "react";
import Rating from "./Rating";

const CommentElement = ({ userReview, deleteReviewSubmitHandler }) => {
  return (
    <div key={userReview._id} className="comment-user-reviews-main">
      <div className="comment-user-left">
        <div className="comment-user-name">{userReview.name}</div>
        <div className="comment-user-rating">
          <Rating value={userReview.rating}></Rating>
        </div>
        <div className="comment-user-review">{userReview.comment}</div>
      </div>
      <div className="comment-user-right" onClick={deleteReviewSubmitHandler}>
        <span className="comment-user-delete">&times;</span>
      </div>
    </div>
  );
};

export default CommentElement;
