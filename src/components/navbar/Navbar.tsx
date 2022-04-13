import React from "react";
import { Dropdown } from "react-bootstrap";
import { logo, logo_mini } from "../../resources/images";
import { useAppDispatch } from "../../store/hooks";
import { commonLogout } from "../../store/logout/slice";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const toggleOffcanvas = () => {
    document?.querySelector(".sidebar-offcanvas")?.classList.toggle("active");
  };

  const logout = async () => {
    await dispatch(commonLogout());
    window.location.href = "/login-page";
  };

  return (
    <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
        <p className="navbar-brand brand-logo">
          <img src={logo} alt="logo" />
        </p>
        <p className="navbar-brand brand-logo-mini">
          <img src={logo_mini} alt="logo" />
        </p>
      </div>
      <div className="navbar-menu-wrapper d-flex align-items-stretch">
        <button
          data-testid="toggle-button"
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
            <Dropdown alignright="true">
              <Dropdown.Toggle
                data-testid="dropdown-toggle"
                className="nav-link count-indicator"
              >
                <i className="bi bi-bell"></i>
                <span className="count-symbol bg-danger"></span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu navbar-dropdown preview-list">
                <h6 className="p-3 mb-0">
                  <>Notifications</>
                </h6>
                <div className="dropdown-divider"></div>
                <Dropdown.Item
                  data-testid="event-today"
                  className="dropdown-item preview-item"
                  onClick={(event_) => event_.preventDefault()}
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
                  data-testid="settings"
                  className="dropdown-item preview-item"
                  onClick={(event_) => event_.preventDefault()}
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
                  data-testid="launch-admin"
                  className="dropdown-item preview-item"
                  onClick={(event_) => event_.preventDefault()}
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
          <li className="nav-item nav-settings d-none d-lg-block">
            <button
              data-testid="navigate-button"
              type="button"
              className="nav-link border-0"
              onClick={() => logout()}
            >
              <i className="bi bi-power"></i>
            </button>
          </li>
        </ul>
        <button
          data-testid="toggleOff-button"
          className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
          type="button"
          onClick={toggleOffcanvas}
        >
          <span className="bi bi-list-ul"></span>
        </button>
      </div>
    </nav>
  );
}
