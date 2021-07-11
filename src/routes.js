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
import User from "views/User.js";
import Teacher from "views/Teacher.js";
import Category from "views/Category.js";
import Course from "views/Course.js";


const dashboardRoutes = [
  {
    path: "/user",
    name: "Users",
    icon: "nc-icon nc-circle-09",
    component: User,
    layout: "/admin",
  },{
    path: "/teacher",
    name: "Teacher",
    icon: "nc-icon nc-single-02",
    component: Teacher,
    layout: "/admin",
  },
  {
    path: "/category",
    name: "Categories",
    icon: "nc-icon nc-bullet-list-67",
    component: Category,
    layout: "/admin",
  }, {
    path: "/course",
    name: "Courses",
    icon: "nc-icon nc-notes",
    component: Course,
    layout: "/admin",
  },
];

export default dashboardRoutes;
