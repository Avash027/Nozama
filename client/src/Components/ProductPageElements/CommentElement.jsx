import React from "react";
import Rating from "../Others/Rating";

//TODO Delete button only shows up for user who made the comment

const CommentElement = ({
  userReview,
  deleteReviewSubmitHandler,
  currentUserID,
}) => {
  return (
    <div key={userReview._id} className="comment-user-reviews-main">
      <div className="comment-user-left">
        <div className="comment-user-name">{userReview.name}</div>
        <div className="comment-user-rating">
          <Rating value={userReview.rating}></Rating>
        </div>
        <div className="comment-user-review">{userReview.comment}</div>
      </div>
      {currentUserID === userReview.user && (
        <div className="comment-user-right" onClick={deleteReviewSubmitHandler}>
          <span className="comment-user-delete">&times;</span>
        </div>
      )}
    </div>
  );
};

export default CommentElement;
