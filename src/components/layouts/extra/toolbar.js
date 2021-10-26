import React, { Component } from "react";

class Toolbar extends Component {
  render() {
    return (
      <ul className="sticky-toolbar nav flex-column pl-2 pr-2 pt-3 pb-3 mt-4">
        {/*begin::Item*/}
        <li
          className="nav-item mb-2"
          id="kt_demo_panel_toggle"
          data-toggle="tooltip"
          title="Check out more demos"
          data-placement="right"
        >
          <a
            className="btn btn-sm btn-icon btn-bg-light btn-icon-success btn-hover-success"
            href="/"
          >
            <i className="flaticon2-drop" />
          </a>
        </li>
        {/*end::Item*/}
        {/*begin::Item*/}
        <li
          className="nav-item mb-2"
          data-toggle="tooltip"
          title="Layout Builder"
          data-placement="left"
        >
          <a
            className="btn btn-sm btn-icon btn-bg-light btn-icon-primary btn-hover-primary"
            href="#"
            target="_blank"
            rel="noreferrer"
          >
            <i className="flaticon2-gear" />
          </a>
        </li>
        {/*end::Item*/}
        {/*begin::Item*/}
        <li
          className="nav-item mb-2"
          data-toggle="tooltip"
          title="Documentation"
          data-placement="left"
        >
          <a
            className="btn btn-sm btn-icon btn-bg-light btn-icon-warning btn-hover-warning"
            href="#"
            target="_blank"
            rel="noreferrer"
          >
            <i className="flaticon2-telegram-logo" />
          </a>
        </li>
        {/*end::Item*/}
        {/*begin::Item*/}
        <li
          className="nav-item"
          id="kt_sticky_toolbar_chat_toggler"
          data-toggle="tooltip"
          title="Chat Example"
          data-placement="left"
        >
          <a
            className="btn btn-sm btn-icon btn-bg-light btn-icon-danger btn-hover-danger"
            href="/"
            data-toggle="modal"
            data-target="#kt_chat_modal"
          >
            <i className="flaticon2-chat-1" />
          </a>
        </li>
        {/*end::Item*/}
      </ul>
    );
  }
}

export default Toolbar;
