import React, { useContext } from "react";

import { contex } from "../contex/contex";

const Register = () => {
  const registerContex = useContext(contex);
  const {
    fullname,
    setFullname,
    email,
    setEmail,
    password,
    setPassword,
    validator,
    policy,
    setPolicy,
    handleRegister,
  } = registerContex;

  return (
    <main className="client-page">
      <div className="container-content">
        <header>
          <h2> عضویت در سایت </h2>
        </header>

        <div className="form-layer">
          <form action="" method="" onSubmit={(e) => handleRegister(e)}>
            <div className="input-group">
              <span className="input-group-addon" id="username">
                <i className="zmdi zmdi-account"></i>
              </span>
              <input
                type="text"
                className="form-control"
                name="fullname"
                placeholder="نام و نام خانوادگی"
                aria-describedby="username"
                value={fullname}
                onChange={(e) => {
                  setFullname(e.target.value);
                  validator.current.showMessageFor("fullname");
                }}
              />
              {validator.current.message(
                "fullname",
                fullname,
                "required|min:5"
              )}
            </div>

            <div className="input-group">
              <span className="input-group-addon" id="email-address">
                <i className="zmdi zmdi-email"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="ایمیل"
                name="email"
                aria-describedby="email-address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  validator.current.showMessageFor("email");
                }}
              />
              {validator.current.message("email", email, "required|email")}
            </div>

            <div className="input-group">
              <span className="input-group-addon" id="password">
                <i className="zmdi zmdi-lock"></i>
              </span>
              <input
                type="password"
                className="form-control"
                placeholder="رمز عبور "
                aria-describedby="password"
                name="password"
                value={password}
                onChange={(e) => {
                  validator.current.showMessageFor("password");
                  setPassword(e.target.value);
                }}
              />
              {validator.current.message(
                "password",
                password,
                "required|min:5"
              )}
            </div>

            <div className="accept-rules">
              <label>
                <input
                  type="checkbox"
                  name="policy"
                  value={policy}
                  onChange={(e) => {
                    setPolicy(e.currentTarget.checked);
                    validator.current.showMessageFor("policy");
                  }}
                />{" "}
                قوانین و مقررات سایت را میپذیرم{" "}
              </label>
              {validator.current.message("policy", policy, "required")}
            </div>

            <div className="link">
              <a href="">
                {" "}
                <i className="zmdi zmdi-assignment"></i> قوانین و مقررات سایت !
              </a>
              <a href="">
                {" "}
                <i className="zmdi zmdi-account"></i> ورود به سایت{" "}
              </a>
            </div>

            <button className="btn btn-success"> عضویت در سایت </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Register;
