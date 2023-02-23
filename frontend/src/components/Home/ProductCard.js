import React from 'react'
import {Link} from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import "./Search.css"
const Product = ({product}) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.2)",
    activeColor: "gold",
    value: product.ratings,
    size: window.innerWidth < 600 ? 20 : 25,
    isHalf: true,
  };
  return (
    <Link className="productCard" to={`product/${product._id}`}>
      <img src={product.images[0].url} alt="" />
      <p>{product.name}</p>
      <div>
        <ReactStars {...options} />
        <span>&nbsp; {product.numOfReviews} Reviews </span>
      </div>
      <span>{`₹${product.price}`}</span>
    </Link>
  );
}

export default Product
