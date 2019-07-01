import Pages from "layouts/Pages.jsx";
import Dashboard from "layouts/Dashboard.jsx";

var indexRoutes = [
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/", name: "Home", component: Pages }
];

export default indexRoutes;
