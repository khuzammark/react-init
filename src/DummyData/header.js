export default {
  authenticated: true,
  links: [
    { link: "/pricing", auth: false, name: "Pricing" },
    { link: "/wtf", auth: false, name: "WTF" },
    { link: "/login", auth: false, name: "Login" },
    { link: "/recipes", auth: true, name: "Recipes" },
    { link: "/sites", auth: true, name: "Sites" },
    { link: "/account", auth: true, name: "Account" },
    { link: "/logout", auth: true, name: "Logout" }
  ],
  logo: "",
  showLinks: true
};
