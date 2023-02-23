import React, { Fragment, useState, useEffect } from "react";
import "./UpdatePassword.css";
import Loader from "../layout/Loader/Loader";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword, loadUser } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import MetaData from "../layout/MetaData";
import LockOpen from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";



const UpdatePassword = () => {
   const dispatch = useDispatch();
   const history = useHistory();
   const alert = useAlert();
   const { error, isUpdated, loading } = useSelector((state) => state.profile);
   const [oldPassword ,setOldPassword]  = useState("");
   const [newPassword ,setNewPassword] = useState("");
   const [confirmPassword ,setConfirmPassword] = useState("");
   const [showPassword,setShowPassword] = useState(false);

   const updatePasswordSubmit = (e) => {
     e.preventDefault();
     const myForm = new FormData();
     myForm.set("oldPassword",oldPassword);
     myForm.set("newPassword",newPassword);
     myForm.set("confirmPassword",confirmPassword)

     dispatch(updatePassword(myForm));
   };

   useEffect(() => {
     if (error && error !== "Please Login to access this resource") {
       console.log(error);
       alert.error(error);
       dispatch(clearErrors());
     }
     
     if (isUpdated) {
       alert.success("Password Updated Successfully");
       dispatch(loadUser());
       history.push("/account");
       dispatch({
         type: UPDATE_PASSWORD_RESET,
       });
     }
   }, [dispatch, error, alert, history, isUpdated]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Update Password"} />
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Update Password</h2>
              <form
                className="updatePasswordForm"
                onSubmit={updatePasswordSubmit}
              >
                <div className="updatePassword">
                  <VpnKeyIcon />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                  <span
                    className="showPass"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </span>
                </div>
                <div className="updatePassword">
                  <LockOpen />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <span
                    className="showPass"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </span>
                </div>
                <div className="updatePassword">
                  <LockIcon />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <span
                    className="showPass"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </span>
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updatePasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdatePassword;
