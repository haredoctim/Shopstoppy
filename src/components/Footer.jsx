import React from "react";

const Footer = () => {
  return (
    <footer className="footer text-center bg-light py-3">
      <div className="d-flex align-items-center justify-content-center pb-2">
        <div className="col-md-6">
          <p className="mb-3 mb-md-0">
            Made by{" "}
            <a
              href="https://www.linkedin.com/in/hatimdecor66"
              className="text-decoration-underline text-dark fs-5"
              target="_blank"
              rel="noreferrer"
            >
              Hatim Decor
            </a>
          </p>
          <a
            className="text-dark fs-4"
            href="https://github.com/haredoctim"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa fa-github"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
