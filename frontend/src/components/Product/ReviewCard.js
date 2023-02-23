import React from "react";
import ReactStars from "react-rating-stars-component";
import profilePng from "../../images/Profile.png"

const ReviewCard = ({ review }) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.2)",
    activeColor: "gold",
    value: review.rating,
    size: window.innerWidth < 600 ? 20 : 25,
    isHalf: true,
  };
  return (
    <div className="reviewCard">
        <img src={profilePng} alt="User" />
        <p>{review.name}</p>
        <ReactStars {...options}/>
        <span>{review.comment}</span>
    </div>
  )
};

export default ReviewCard;
