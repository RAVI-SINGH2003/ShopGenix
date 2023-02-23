import React, { Fragment, useState, useEffect } from "react";
import "./ResetPassword.css";
import Loader from "../layout/Loader/Loader";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loadUser, resetPassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import LockOpen from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useParams } from "react-router-dom";
const ResetPassword = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const alert = useAlert();
  const params = useParams();
  const { error, success, loading } = useSelector((state) => state.forgotPassword);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const resetPasswordSubmit = (e) => {
    e.preventDefault();
   const myForm = new FormData();
   myForm.set("password" , newPassword);
   myForm.set("confirmPassword",confirmPassword)

    dispatch(resetPassword(params.token,myForm));
  };

  useEffect(() => {
    if (error && error !== "Please Login to access this resource") {
      console.log(error);
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Password Reset Successfull");
      dispatch(loadUser());
      history.push("/account");
    }
  }, [dispatch, error, alert, history, success]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Reset Password"} />
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">Reset Password</h2>
              <form
                className="resetPasswordForm"
                onSubmit={resetPasswordSubmit}
              >
                <div className="resetPassword">
                  <LockOpen />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <span
                    className="showResetPass"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </span>
                </div>
                <div className="resetPassword">
                  <LockIcon />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <span
                    className="showResetPass"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </span>
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="resetPasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ResetPassword;
