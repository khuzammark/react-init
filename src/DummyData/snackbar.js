export default {
  variant: "info",
  message: "You've maxed out! Upgrade your plan to add your next site.",
  link: { link: "#", name: "Get Started" },
  open: true,
  closeFn: () => console.log("im closed!")
};
