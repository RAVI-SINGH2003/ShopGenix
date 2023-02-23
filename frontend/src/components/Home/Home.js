import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from "./ProductCard";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
// const product = {
//   name: "Blue Tshirt",
//   images: [
//     { url: "https://m.media-amazon.com/images/I/619SqQW1NYL._UY550_.jpg" },
//   ],
//   price: "₹3000",
//   _id: "ravi",
// };
const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"ShopGenix"} />
          <div className="banner">
            <p>Welcome to ShopGenix</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>
            <a href="#container">
              <button>
                Scroll
                <CgMouse />
              </button>
            </a>
          </div>
          <h2 className="homeHeading">Featured Products</h2>
          <div className="container" id="container">
            {/* if products array is having product then map */}
            {products &&
              products.map((product) => (
                <Product product={product} key={product._id} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
