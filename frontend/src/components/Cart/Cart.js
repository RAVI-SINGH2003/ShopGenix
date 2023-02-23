import React, { Fragment } from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard.js";
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartActions";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
const Cart = ({history}) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const increaseQuantity = (id, quantity, stock) => {
    const newQuantity = quantity + 1;
    if (stock < newQuantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQuantity));
  };
  const decreaseQuantity = (id, quantity) => {
    const newQuantity = quantity - 1;
    if (1 > newQuantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQuantity));
  };

  const deleteCartItem = (id) => {
    dispatch(removeItemsFromCart(id));
  };
  const checkOutHandler = ()=>{
    history.push('/login?redirect=shipping')
  }

  return (
    <Fragment>
      {cartItems.length > 0 ? (
        <Fragment>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>SubTotal</p>
            </div>
            {cartItems.map((item) => (
              <div className="cartContainer" key={item.productId}>
                <CartItemCard item={item} deleteCartItem={deleteCartItem} />
                <div className="cartInput">
                  <button
                    onClick={() =>
                      decreaseQuantity(item.productId, item.quantity)
                    }
                  >
                    -
                  </button>
                  <input type="number" value={item.quantity} readOnly />
                  <button
                    onClick={() =>
                      increaseQuantity(
                        item.productId,
                        item.quantity,
                        item.stock
                      )
                    }
                  >
                    +
                  </button>
                </div>
                <p className="cartSubTotal">{`₹${
                  item.quantity * item.price
                }`}</p>
              </div>
            ))}
            <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Gross Total</p>
                <p>
                  ₹
                  {cartItems.reduce(
                    (acc, curr) => (acc += curr.price * curr.quantity),
                    0
                  )}
                </p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkOutHandler}>Check Out</button>
              </div>
            </div>
          </div>
        </Fragment>
      ) : (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />
          <Typography>No Product in Your Cart</Typography>
          <Link to="/products">View Products</Link>
        </div>
      )}
    </Fragment>
  );
};

export default Cart;
