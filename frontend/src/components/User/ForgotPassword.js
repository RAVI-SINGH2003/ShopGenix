import React, { Fragment, useState, useEffect } from "react";
import "./ForgotPassword.css";
import Loader from "../layout/Loader/Loader";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  forgotPassword,
} from "../../actions/userAction";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";

const ForgotPassword = ({history}) => {
  const dispatch = useDispatch();
  const {loading , message,error} = useSelector(state =>state.forgotPassword);
  const alert = useAlert();
  const [email, setEmail] = useState("");

  const forgotPasswordSubmit= (e)=>{
    e.preventDefault();
    dispatch(forgotPassword(email));
  }
  useEffect(()=>{
    if (error && error !== "Please Login to access this resource") {
      alert.error(error);
      dispatch(clearErrors());
    }
    if(message){
      alert.success(message)
    }
  },[dispatch,alert,error,history,message])
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Forgot Profile"} />
          <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <h2 className="forgotPasswordHeading">Forgot Password</h2>
              <form
                className="forgotPasswordForm"
                onSubmit={forgotPasswordSubmit}
              >
                <div className="forgotPasswordEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Send"
                  className="forgotPasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ForgotPassword;
