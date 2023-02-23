import React, { Fragment, useState } from "react";
import "./Header.css";
import { SpeedDial, SpeedDialAction, Backdrop } from "@mui/material";
import {
  Dashboard,
  ListAltOutlined,
  Person,
  ExitToApp,
} from "@mui/icons-material";
import { useAlert } from "react-alert";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { logout } from "../../../actions/userAction";
import { useHistory } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";

const UserOptions = ({ user }) => {
  const history = useHistory();
  const alert = useAlert();
  const dispatch = useDispatch();
  const {cartItems} = useSelector(state=>state.cart)

  const [open, setOpen] = useState(false);

  const options = [
    {
      icon: <ListAltOutlined />,
      name: "Orders",
      func: function () {
        history.push("/orders");
      },
    },
    {
      icon: <Person />,
      name: "Profile",
      func: function () {
        history.push("/account");
      },
    },
    {
      icon: <ShoppingCartIcon style={{color : cartItems.length >0 ? "red" : "unset"}} />,
      name: `Cart(${cartItems.length})`,
      func: function () {
        history.push("/cart");
      },
    },
    {
      icon: <ExitToApp />,
      name: "Logout",
      func: function () {
        dispatch(logout());
        alert.success("Logout Successfully");
      },
    },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <Dashboard />,
      name: "Dashboard",
      func: function () {
        history.push("/dashboard");
      },
    });
  }
  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="down"
        className="speedDial"
        style={{ zIndex: "11" }}
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : "/Profile.png"}
            alt="Profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <=600 ? true :false}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
