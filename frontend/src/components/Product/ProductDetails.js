import React, { useEffect, Fragment, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails } from "../../actions/productAction";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { addItemsToCart } from "../../actions/cartActions";


const ProductDetails = () => {
  const alert = useAlert();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, product, error } = useSelector(
    (state) => state.productDetails
  );

  const [quantity,setQuantity] =useState(1);

  const increaseQuantity = ()=>{
    const qty = quantity +1;
    if(qty >product.Stock) return;
    setQuantity(qty);
  }
  const decreaseQuantity = ()=>{
    const qty = quantity -1;
    if(qty <=0)
    return;
    setQuantity(qty);
  }
  const addToCart = ()=>{
    dispatch(addItemsToCart(id,quantity));
    alert.success("Item Added To Cart")
  }

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(id));
  }, [dispatch, error, alert, id]);

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.2)",
    activeColor: "gold",
    value: product.ratings,
    size: window.innerWidth < 600 ? 20 : 25,
    isHalf: true,
  };
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product.name}--ShopGenix`}/>
          <div className="ProductDetails">
            <div>
              <Carousel className="Carousel">
                {product.images &&
                  product.images.map((item, i) => (
                    <div className="image-div">
                      <img
                        className="CarouselImage"
                        key={item.url}
                        src={item.url}
                        alt={`${i} Slide`}
                      />
                    </div>
                  ))}
              </Carousel>
            </div>
            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product #{product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <ReactStars {...options} />
                <span>({product.numOfReviews})</span>
              </div>
              <div className="detailsBlock-3">
                <h1> &#8377; {`${product.price} `}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input type="number" value={quantity} readOnly={true} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button onClick={addToCart}>Add to Cart</button>
                </div>
                <p>
                  Status :
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>
              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>
              <button className="submitReview">Submit Review</button>
            </div>
          </div>
          <h3 className="reviewsHeading">REVIEWS</h3>

          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews.map((review, index) => (
                <ReviewCard review={review} key={index} />
              ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
