import React from "react";
import { Link } from "react-router-dom";
import "./page-header.component.styles.scss";

const PageHeader = ({ title }) => {
  return (
    <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
          <a class="navbar-brand" href="/">
            SpotiMy
          </a>
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <Link to={"/"}>
              <li class="nav-item">
                <span class="nav-link active" aria-current="page">
                  Home
                </span>
              </li>
            </Link>
            <Link to={"/playlists"}>
              <li class="nav-item">
                <span class="nav-link active" aria-current="page">
                  Playlists
                </span>
              </li>
            </Link>
            <Link to={"/playlists/creator"}>
              <li class="nav-item">
                <span class="nav-link active" aria-current="page">
                  Generator
                </span>
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default PageHeader;
