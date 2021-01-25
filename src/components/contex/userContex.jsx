import React, { useRef, useState } from "react";
import SimpleReactValidator from "simple-react-validator";
import { loginUser, registerUser } from "../../services/userService";
import { contex } from "./contex";
import { decodeToken } from "./../../utils/decodeToken";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { addUser } from "./../../redux/actions/user";
import { toast } from "react-toastify";
const UserContex = ({ children, history }) => {
  const dispatch = useDispatch();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [policy, setPolicy] = useState();
  const [, forceUpdate] = useState();
  const validator = useRef(
    new SimpleReactValidator({
      messages: {
        required: "پرکردن این فیلد الزامی می باشد",
        email: "ایمیل وارد شده صحیح نمی باشد",
        min: "کمتر از 5 کاراکتر نباید باشد",
      },
      element: (message) => <div style={{ color: "red" }}>{message}</div>,
    })
  );
  const resetStates = () => {
    setFullname("");
    setPassword("");
    setEmail("");
  };
  const handleRegister = async (event) => {
    event.preventDefault();
    const user = {
      fullname,
      email,
      password,
    };
    try {
      if (validator.current.allValid()) {
        const { status } = await registerUser(user);
        if (status === 201) {
          toast.success("کاربر با موفقیت ثبت نام شد", {
            position: "top-right",
            closeOnClick: true,
          });
          history.push("/login")
          
        }
      } else {
        validator.current.showMessages();
        forceUpdate(1);
      }
    } catch (ex) {
      console.log(ex);
      toast.error("مشکلی رخ داده است", {
        position: "top-right",
        closeOnClick: true,
      });
    }
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    const user = {
      email,
      password,
    };
    try {
      if (validator.current.allValid()) {
        const { status, data } = await loginUser(user);
        if (status === 200) {
          toast.success("کاربر با موفقیت وارد شد", {
            position: "top-right",
            closeOnClick: true,
          });
        }
        console.log(data);
        localStorage.setItem("token", data.token);
        dispatch(addUser(decodeToken(data.token).payload.user));
        history.replace("/");

        resetStates();
      } else {
        validator.current.showMessages();
        forceUpdate(1);
      }
    } catch (ex) {
      console.log(ex);
      toast.error("مشکلی رخ داده است", {
        position: "top-right",
        closeOnClick: true,
      });
    }
  };

  return (
    <contex.Provider
      value={{
        fullname,
        setFullname,
        password,
        setPassword,
        email,
        setEmail,
        policy,
        setPolicy,
        validator,
        handleLogin,
        handleRegister,
      }}
    >
      {children}
    </contex.Provider>
  );
};

export default withRouter(UserContex);
