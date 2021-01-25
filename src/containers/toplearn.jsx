import React, { useEffect } from "react";

import MainLayout from "../components/layouts/mainLayout";
import Course from "../components/course/course";
import Login from "../components/login/login";
import { Switch, Route, Redirect } from "react-router-dom";
import Register from "../components/register/register";
import Archive from "../components/course/archive";
import { useDispatch, useSelector } from "react-redux";
import { pagination } from "../utils/pagination";
import SingleCourse from "../components/course/singleCourse";

import { addUser, removeUser } from "../redux/actions/user";
import { decodeToken } from "../utils/decodeToken";
import { isEmpty } from "lodash";
import Logout from "../components/login/logout";
import UserProfile from "../components/common/userProfile";
import UserContex from "../components/contex/userContex";
import NotFound from "./../components/common/notFound";
import PrivateLayout from "./../components/layouts/privateLayout";
import Dashboard from "./../components/admin/Dashboard";
import CourseTable from "../components/admin/CourseTable";
import AdminContex from "./../components/contex/adminContex";
const Toplearn = () => {
  const courses = useSelector((state) => state.courses);
  const courseIndex = pagination(courses, 1, 8);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = decodeToken(token);
      const dateNow = Date.now() / 1000;
      if (decodedToken.payload.exp < dateNow) {
        localStorage.removeItem("token");
        dispatch(removeUser());
      } else {
        dispatch(addUser(decodedToken.payload.user));
      }
    }
  }, []);

  return (
    <Switch>
      <Route path={["/dashboard"]}>
        <PrivateLayout>
          <Route
            path={"/dashboard/courses"}
            exact
            render={() =>
              !isEmpty(user) && user.isAdmin ? (
                <AdminContex courses={courses}>
                  <CourseTable />
                </AdminContex>
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            path={"/dashboard"}
            exact
            render={() =>
              !isEmpty(user) && user.isAdmin ? (
                <Dashboard courses={courses} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
        </PrivateLayout>
      </Route>
      <Route path={["/"]}>
        <MainLayout>
          <Switch>
            <Route
              path="/login"
              render={() =>
                isEmpty(user) ? (
                  <UserContex>
                    <Login />
                  </UserContex>
                ) : (
                  <Redirect to="/" />
                )
              }
            />
            <Route
              path="/register"
              render={() =>
                isEmpty(user) ? (
                  <UserContex>
                    <Register />
                  </UserContex>
                ) : (
                  <Redirect to="/" />
                )
              }
            />
            <Route
              path="/logout"
              render={() => (isEmpty(user) ? <Redirect to="/" /> : <Logout />)}
            />
            <Route path="/archive" component={Archive} />
            <Route path="/user-profile" component={UserProfile} />
            <Route path="/course/:id" component={SingleCourse} />
            <Route
              path="/"
              exact
              render={() => <Course courses={courseIndex} />}
            />
            <Route path="*" exact component={NotFound} />
          </Switch>
        </MainLayout>
      </Route>
    </Switch>
  );
};

export default Toplearn;
