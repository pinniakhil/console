import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { logo, logo_mini } from "../../resources/images";
// import {  } from "react-i18next";

class Navbar extends Component {
  toggleOffcanvas() {
    document?.querySelector(".sidebar-offcanvas")?.classList.toggle("active");
  }

  toggleRightSidebar() {
    document?.querySelector(".right-sidebar")?.classList.toggle("open");
  }

  render() {
    return (
      <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
          <Link className="navbar-brand brand-logo" to="/">
            <img src={logo} alt="logo" />
          </Link>
          <Link className="navbar-brand brand-logo-mini" to="/">
            <img src={logo_mini} alt="logo" />
          </Link>
        </div>
        <div className="navbar-menu-wrapper d-flex align-items-stretch">
          <button
            className="navbar-toggler navbar-toggler align-self-center"
            type="button"
            onClick={() => document.body.classList.toggle("sidebar-icon-only")}
          >
            <span className="bi bi-list"></span>
          </button>
          <div className="search-field d-none d-md-block">
            <form className="d-flex align-items-center h-100" action="#">
              <div className="input-group">
                <div className="input-group-prepend bg-parent">
                  <i className="input-group-text border-0 bi bi-search"></i>
                </div>
                <input
                  type="text"
                  className="form-control bg-parent border-0"
                  placeholder="Search projects"
                />
              </div>
            </form>
          </div>
          <ul className="navbar-nav navbar-nav-right">
            <li className="nav-item">
              {/* @ts-ignore */}
              <Dropdown alignRight>
                <Dropdown.Toggle className="nav-link count-indicator">
                  <i className="bi bi-envelope"></i>
                  <span className="count-symbol bg-warning"></span>
                </Dropdown.Toggle>

                <Dropdown.Menu className="preview-list navbar-dropdown">
                  <h6 className="p-3 mb-0">
                    <>Messages</>
                  </h6>
                  <div className="dropdown-divider"></div>
                  <Dropdown.Item
                    className="dropdown-item preview-item"
                    onClick={(evt) => evt.preventDefault()}
                  >
                    <div className="preview-thumbnail">
                      <img
                        src={`${process.env.REACT_APP_HOST}/global/images/faces/face4.jpg`}
                        alt="user"
                        className="profile-pic"
                      />
                    </div>
                    <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                      <h6 className="preview-subject ellipsis mb-1 font-weight-normal">
                        <>Mark send you a message</>
                      </h6>
                      <p className="text-gray mb-0">
                        1 <>Minutes ago</>
                      </p>
                    </div>
                  </Dropdown.Item>
                  <div className="dropdown-divider"></div>
                  <Dropdown.Item
                    className="dropdown-item preview-item"
                    onClick={(evt) => evt.preventDefault()}
                  >
                    <div className="preview-thumbnail">
                      <img
                        src={`${process.env.REACT_APP_HOST}/global/images/faces/face2.jpg`}
                        alt="user"
                        className="profile-pic"
                      />
                    </div>
                    <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                      <h6 className="preview-subject ellipsis mb-1 font-weight-normal">
                        <>Cregh send you a message</>
                      </h6>
                      <p className="text-gray mb-0">
                        15 <>Minutes ago</>
                      </p>
                    </div>
                  </Dropdown.Item>
                  <div className="dropdown-divider"></div>
                  <Dropdown.Item
                    className="dropdown-item preview-item"
                    onClick={(evt) => evt.preventDefault()}
                  >
                    <div className="preview-thumbnail">
                      <img
                        src={`${process.env.REACT_APP_HOST}/global/images/faces/face3.jpg`}
                        alt="user"
                        className="profile-pic"
                      />
                    </div>
                    <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                      <h6 className="preview-subject ellipsis mb-1 font-weight-normal">
                        <>Profile picture updated</>
                      </h6>
                      <p className="text-gray mb-0">
                        18 <>Minutes ago</>
                      </p>
                    </div>
                  </Dropdown.Item>
                  <div className="dropdown-divider"></div>
                  <h6 className="p-3 mb-0 text-center cursor-pointer">
                    4 <>new messages</>
                  </h6>
                </Dropdown.Menu>
              </Dropdown>
            </li>
            <li className="nav-item">
              {/* @ts-ignore */}
              <Dropdown alignRight>
                <Dropdown.Toggle className="nav-link count-indicator">
                  <i className="bi bi-bell"></i>
                  <span className="count-symbol bg-danger"></span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu navbar-dropdown preview-list">
                  <h6 className="p-3 mb-0">
                    <>Notifications</>
                  </h6>
                  <div className="dropdown-divider"></div>
                  <Dropdown.Item
                    className="dropdown-item preview-item"
                    onClick={(evt) => evt.preventDefault()}
                  >
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-success">
                        <i className="bi bi-power"></i>
                      </div>
                    </div>
                    <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                      <h6 className="preview-subject font-weight-normal mb-1">
                        <>Event today</>
                      </h6>
                      <p className="text-gray ellipsis mb-0">
                        <>Just a reminder that you have an event today</>
                      </p>
                    </div>
                  </Dropdown.Item>
                  <div className="dropdown-divider"></div>
                  <Dropdown.Item
                    className="dropdown-item preview-item"
                    onClick={(evt) => evt.preventDefault()}
                  >
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-warning">
                        <i className="bi bi-gear"></i>
                      </div>
                    </div>
                    <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                      <h6 className="preview-subject font-weight-normal mb-1">
                        <>Settings</>
                      </h6>
                      <p className="text-gray ellipsis mb-0">
                        <>Update dashboard</>
                      </p>
                    </div>
                  </Dropdown.Item>
                  <div className="dropdown-divider"></div>
                  <Dropdown.Item
                    className="dropdown-item preview-item"
                    onClick={(evt) => evt.preventDefault()}
                  >
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-info">
                        <i className="mdi mdi-link-variant"></i>
                      </div>
                    </div>
                    <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                      <h6 className="preview-subject font-weight-normal mb-1">
                        <>Launch Admin</>
                      </h6>
                      <p className="text-gray ellipsis mb-0">
                        <>New admin wow</>!
                      </p>
                    </div>
                  </Dropdown.Item>
                  <div className="dropdown-divider"></div>
                  <h6 className="p-3 mb-0 text-center cursor-pointer">
                    <>See all notifications</>
                  </h6>
                </Dropdown.Menu>
              </Dropdown>
            </li>
            <li className="nav-item nav-logout d-none d-lg-block">
              <a
                className="nav-link"
                href="!#"
                onClick={(event) => event.preventDefault()}
              >
                <i className="bi bi-power"></i>
              </a>
            </li>
            <li className="nav-item nav-settings d-none d-lg-block">
              <button
                type="button"
                className="nav-link border-0"
                onClick={this.toggleRightSidebar}
              >
                <i className="bi bi-gear"></i>
              </button>
            </li>
          </ul>
          <button
            className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
            type="button"
            onClick={this.toggleOffcanvas}
          >
            <span className="bi bi-gear"></span>
          </button>
        </div>
      </nav>
    );
  }
}

export default Navbar;
