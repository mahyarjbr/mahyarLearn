import React from "react";
import { NavLink } from "react-router-dom";
import { isEmpty } from "lodash";
import { useSelector } from "react-redux";

const TopNav = () => {
  const user = useSelector((state) => state.user);

  return (
    <nav>
      <div className="row">
        <div className="col-sm-6 col-xs-12">
          <ul>
            <li>
              {/* <a href=""> همکاری در فروش </a>
                            <a href=""> درباره ما </a> */}
              <NavLink exact to="/">
                {" "}
                صفحه اصلی{" "}
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="col-sm-6 col-xs-12">
          <div className="clientarea">
            {!isEmpty(user) ? (
              <div className="loggein ">
                <i className="zmdi zmdi-account"></i>
                <NavLink to="/user-profile"> {user.fullname} </NavLink>
                {user.isAdmin ? (
                  <NavLink to="/dashboard"> /ورود به داشبورد </NavLink>
                ) : null}
                / <NavLink to="/logout"> خروج </NavLink>
              </div>
            ) : (
              <div className="signin ">
                <i className="zmdi zmdi-account"></i>
                <NavLink to="/login"> ورود </NavLink> /
                <NavLink to="/register"> عضویت </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
