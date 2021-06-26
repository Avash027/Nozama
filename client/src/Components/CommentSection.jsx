import React,{useState,useEffect} from 'react'
import Rating from './Rating';
import {useSelector} from "react-redux";
import axios from 'axios';



const CommentSection = ({productID , setComment,reviews}) => {

    let ratingElement =[];

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin;

    const [rating, setRating] = useState(1);
    const [review, setReview] = useState("");
    const [userPresent, setUserPresent] = useState(false);
    
    useEffect(() => {
        const userAlreadyPresent =  reviews.find(review=>(review.user === userInfo._id))
        setUserPresent(userAlreadyPresent);
    }, [])

    const reviewSubmitHandler = async()=>{
        const config = {
            headers: {
              "Content-Type": "application/json",
              authorization: "Bearer " + userInfo.token,
            },
          };


          const body = {
              productID,
              userReview:{
                  name:userInfo.name,
                  rating,
                  comment:review,
                  user:userInfo._id
              }
          }


          const {data} = await axios.post("/api/products/reviews",body,config);

          setComment(data)
          setUserPresent(true);
          
    }


    const deleteReviewSubmitHandler = async()=>{
        
        const config = {
            "headers": {
              "Content-Type": "application/json",
              authorization: "Bearer " + userInfo.token,
            },
          };

          const body ={
              productID,
              
          }

          

          const {data} = await axios.post("/api/products/deletereviews",body,config)

          setComment(data)
          setUserPresent(false)
    }
    

    for(let i =1;i<=5;i++)
    {
        ratingElement.push(
        <span
        className="comment-rating"
        key={i.toString()}
        
        >
        <i
          className={
            i<=rating?"fas fa-star":
            "far fa-star"
          }
          id={i}
          onClick={e=>setRating(Number(e.target.id))}
        />
      </span>)
    }

    return (
        <div className="comment">
            <div className="comment-primary-heading">
                Reviews
                <hr />
            </div>
            

            <div className="comment-rating-container">
               Rate this product :   {ratingElement.map(element=>element)}
            </div>

            <div className="comment-review-input-container">
                <input 
                type="text" 
                className="comment-review-input" 
                placeholder="Enter your reviews"
                value={review}
                onChange={(e)=>setReview(e.target.value)}

                />
            </div>

            {!userPresent && <div className="comment-review-button-container">
                <button
                className="button button-primary"
                onClick={reviewSubmitHandler}
                >Submit Review</button>
            </div>}

            
            <div className="primary-heading">
            Read reviews by others
            </div>

            
            
            <div className="comment-user-reviews-container">
                {reviews.length!==0 && reviews.map(userReview=>(
                    <div className="comment-user-reviews-main">
                        <div className="comment-user-left">
                            <div className="comment-user-name">
                                {userReview.name}
                            </div>
                            <div className="comment-user-rating">
                                <Rating value={userReview.rating} ></Rating>
                            </div>
                            <div className="comment-user-review">
                                {userReview.comment}
                            </div>
                            </div>
                        <div
                        className="comment-user-right"
                        onClick={deleteReviewSubmitHandler}
                        >
                            <span className="comment-user-delete">&times;</span>
                        </div>
                    </div>
                ))}
            </div>

           
           
            
            


            


        </div>
    )
}

export default CommentSection
