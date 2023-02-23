import React, { useState, useEffect, Fragment } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard.js";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import { useAlert } from "react-alert";
import { Typography, Slider } from "@mui/material";
import MetaData from "../layout/MetaData";
const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];
const elemStyle = {
  background: "rgba(123, 195, 231, 0.273)",
}
const Products = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, products, error, productsCount, resultPerPage } =
    useSelector((state) => state.products);

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [elem,setElem] = useState("");
  const [ratings,setRatings]=useState(0)

  const { keyword } = useParams();
  // console.log(styles);
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, alert, error, price, category, ratings]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Products--ShopGenix"}/>
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products.map((product, index) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              arial-labelledby="range-slider"
              min={0}
              max={25000}
            />
            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link "
                  key={category}
                  onClick={(e) => {
                    setElem(category);
                    return setCategory(category);
                  }}
                  style={category===elem ? elemStyle: {}}
                >
                  {category}
                </li>
              ))}
            </ul>
            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
               value={ratings}
               onChange={(e,newRating)=>{
                setRatings(newRating);
               }}
               aria-labelledby = "continuous-slider"
               min={0}
               max={5}
               valueLabelDisplay="auto"
              />
            </fieldset>

          </div>
          {productsCount > resultPerPage && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={(e) => setCurrentPageNo(e)}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
