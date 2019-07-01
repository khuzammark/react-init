import _ from "lodash";
import LoginPage from "views/Pages/LoginPage.jsx";
import RegisterPage from "views/Pages/RegisterPage.jsx";
import HomePage from "views/Pages/Marketing/HomePage.jsx";
import HowItWorksPage from "views/Pages/Marketing/HowItWorksPage.jsx";
import PricingPage from "views/Pages/Marketing/PricingPage.jsx";
import RecipesMarketingRoutes from "./RecipesMarketingRoutes.jsx";

// @material-ui/icons
import Kitchen from "@material-ui/icons/Kitchen";
import Dashboard from "@material-ui/icons/Dashboard";
import PersonAdd from "@material-ui/icons/PersonAdd";
import Fingerprint from "@material-ui/icons/Fingerprint";
import ContactSupport from "@material-ui/icons/ContactSupport";
import AttachMoney from "@material-ui/icons/AttachMoney";
import Home from "@material-ui/icons/Home";

const pagesRoutes = (user, location) => {
  let routes = [];
  if (!_.isEmpty(user)) {
    routes.push({
      path: "/dashboard",
      name: "Dashboard",
      short: "Dashboard",
      mini: "D",
      icon: Dashboard
    });
  }
  routes = routes.concat([
    {
      path: "/pages/how-it-works",
      name: "How It Works",
      short: "How It Works",
      mini: "How",
      icon: ContactSupport,
      component: HowItWorksPage
    },
    {
      path: "/pages/pricing",
      name: "Pricing",
      short: "Pricing",
      mini: "P",
      icon: AttachMoney,
      component: PricingPage
    },
    {
      path: "/pages/recipes",
      name: "Recipes",
      short: "Recipes",
      mini: "R",
      icon: Kitchen,
      component: RecipesMarketingRoutes
    },
    {
      path: "/pages/home",
      name: "Home Page",
      short: "Home",
      mini: "H",
      icon: Home,
      component: HomePage
    }
  ]);

  if (_.isEmpty(user)) {
    routes = routes.concat([
      {
        path: "/pages/register-page",
        name: "Register Page",
        short: "Register",
        mini: "RP",
        icon: PersonAdd,
        component: RegisterPage
      },
      {
        path: "/pages/login-page",
        name: "Login Page",
        short: "Login",
        mini: "LP",
        icon: Fingerprint,
        component: LoginPage
      }
    ]);
  }

  if (location.pathname === "/") {
    routes.push({
      redirect: true,
      path: "/",
      pathTo: "/pages/home",
      name: "Home",
      exact: true
    });
  }

  return routes;
};

export default pagesRoutes;
