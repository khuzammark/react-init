import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

const Logout = () => {
  localStorage.removeItem("token");
  return <Redirect to="/" />;
};

export default Logout;
