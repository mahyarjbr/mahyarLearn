import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AdminSidebar from "../admin/AdminSideBar"
import AdminTopNav from '../admin/AdminTopNav';

const PrivateLayout = ({ children }) => {
  const user = useSelector((state) => state.user);
  return (
    <div id="wrapper">
      <title>تاپلرن | داشبورد</title>

      <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/dashboard">
            داشبورد تاپلرن
          </Link>
        </div>

        <AdminTopNav user={user} />

        <AdminSidebar />
      </nav>
      <div id="page-wrapper">{children}</div>
    </div>
  );
};

export default PrivateLayout;
