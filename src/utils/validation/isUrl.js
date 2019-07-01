import { isURL } from "validator";

export default str => {
  const options = {
    protocols: ["http", "https"],
    require_protocol: true
  };
  return isURL(str, options);
};
