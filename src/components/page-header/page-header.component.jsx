import React from "react";
import { Link } from "react-router-dom";
import "./page-header.component.styles.scss";

const PageHeader = ({ title }) => {
  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <a className="navbar-brand" href="/">
            SpotiMy
          </a>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <Link to={"/"}>
              <li className="nav-item">
                  Home
              </li>
            </Link>
            <Link to={"/playlists"}>
              <li className="nav-item">
                  My Playlists
              </li>
            </Link>
              <li className="nav-item">
                  Generator
                <i className="fas fa-caret-down ms-2"></i>
                <ul className={"nav-submenu"}>
                  <Link to={"/playlists/creator"}>
                    <li className="nav-item">
                      By Artists
                    </li>
                  </Link>
                </ul>
              </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default PageHeader;
