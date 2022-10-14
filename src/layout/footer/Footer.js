import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="nk-footer">
      <div className="container-fluid">
        <div className="nk-footer-wrap">
          <div className="nk-footer-copyright">
            {" "}
            &copy; Powered By<Link to="/">{" "} RENTO</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
