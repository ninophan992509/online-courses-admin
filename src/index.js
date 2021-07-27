/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import Admin from "layouts/Admin.js";
import Login from "layouts/Login.js";
import routes from "./routes";

const PrivateRoute = ({ component: Component, ...rest }) => {
  let user = localStorage.getItem("userInfo");
  if (user) user = JSON.parse(user);

  return (
    <Route
      {...rest}
      render={(props) =>
        user && user.type === "admin" ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={Login} />
      <PrivateRoute path="/admin" component={Admin} />
      {routes &&
        routes.map((route, index) => {
          return (
            <PrivateRoute
              key={index}
              path={`/admin/${route.path}`}
              exact
              component={route.component}
            />
          );
        })}
      <Route exact path="/" render={() => <Redirect to="/admin" />} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
