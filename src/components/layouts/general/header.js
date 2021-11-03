import Languages from "../dropdown/languages";
import Notifications from "../dropdown/notifications";
// import QuickActions from "../dropdown/quick-actions";
import Search from "../dropdown/search";

import SVG from "react-inlinesvg";
import { Component } from "react";

class Header extends Component {
  render() {
    return (
      <div id="kt_header" className="header header-fixed">
        {/*begin::Container*/}
        <div className="container-fluid d-flex align-items-stretch justify-content-between">
          {/*begin::Header Menu Wrapper*/}
          <div
            className="header-menu-wrapper header-menu-wrapper-left"
            id="kt_header_menu_wrapper"
          >
            {/*begin::Header Menu*/}
            <div
              id="kt_header_menu"
              className="header-menu header-menu-mobile header-menu-layout-default"
            >
              {/*begin::Header Nav*/}
              <ul className="menu-nav">
                <li
                  className="menu-item menu-item-open menu-item-here menu-item-submenu menu-item-rel menu-item-open menu-item-here menu-item-active"
                  data-menu-toggle="click"
                >
                  <div className="menu-link menu-toggle">
                    <span className="menu-text">{this.props.title}</span>
                    <i className="menu-arrow" />
                  </div>
                </li>
              </ul>
              {/*end::Header Nav*/}
            </div>
            {/*end::Header Menu*/}
          </div>
          {/*end::Header Menu Wrapper*/}
          {/*begin::Topbar*/}
          <div className="topbar">
            {/*begin::Search*/}
            <div className="dropdown" id="kt_quick_search_toggle">
              {/*begin::Toggle*/}
              <div
                className="topbar-item"
                data-toggle="dropdown"
                data-offset="10px,0px"
              >
                <div className="btn btn-icon btn-clean btn-lg btn-dropdown mr-1">
                  <span className="svg-icon svg-icon-xl svg-icon-primary">
                    <SVG src="/assets/media/svg/icons/General/Search.svg" />
                  </span>
                </div>
              </div>
              {/*end::Toggle*/}
              {/*begin::Dropdown*/}
              <div className="dropdown-menu p-0 m-0 dropdown-menu-right dropdown-menu-anim-up dropdown-menu-lg">
                {/*[html-partial:include:{"file":"partials/_extras/dropdown/search-dropdown.html"}]/*/}
                <Search />
              </div>
              {/*end::Dropdown*/}
            </div>
            {/*end::Search*/}
            {/*begin::Notifications*/}
            <div className="dropdown">
              {/*begin::Toggle*/}
              <div
                className="topbar-item"
                data-toggle="dropdown"
                data-offset="10px,0px"
              >
                <div className="btn btn-icon btn-clean btn-dropdown btn-lg mr-1 pulse pulse-primary">
                  <span className="svg-icon svg-icon-xl svg-icon-primary">
                    <SVG src="/assets/media/svg/icons/Code/Compiling.svg" />
                  </span>
                  <span className="pulse-ring" />
                </div>
              </div>
              {/*end::Toggle*/}
              {/*begin::Dropdown*/}
              <div className="dropdown-menu p-0 m-0 dropdown-menu-right dropdown-menu-anim-up dropdown-menu-lg">
                <form>
                  {/*[html-partial:include:{"file":"partials/_extras/dropdown/notifications.html"}]/*/}
                  {/* <Notifications /> */}
                </form>
              </div>
              {/*end::Dropdown*/}
            </div>
            {/*end::Notifications*/}
            {/*begin::Quick panel*/}
            <div className="topbar-item">
              <div
                className="btn btn-icon btn-clean btn-lg mr-1"
                // id="kt_quick_panel_toggle"
              >
                <span className="svg-icon svg-icon-xl svg-icon-primary">
                  <SVG src="/assets/media/svg/icons/Layout/Layout-4-blocks.svg" />
                </span>
              </div>
            </div>
            {/*end::Quick panel*/}
            {/*begin::Languages*/}
            <div className="dropdown">
              {/*begin::Toggle*/}
              <div
                className="topbar-item"
                data-toggle="dropdown"
                data-offset="10px,0px"
              >
                <div className="btn btn-icon btn-clean btn-dropdown btn-lg mr-1">
                  <img
                    className="h-20px w-20px rounded-sm"
                    src="/assets/media/svg/flags/220-vietnam.svg"
                    alt=""
                  />
                </div>
              </div>
              {/*end::Toggle*/}
              {/*begin::Dropdown*/}
              <div className="dropdown-menu p-0 m-0 dropdown-menu-anim-up dropdown-menu-sm dropdown-menu-right">
                {/*[html-partial:include:{"file":"partials/_extras/dropdown/languages.html"}]/*/}
                <Languages />
              </div>
              {/*end::Dropdown*/}
            </div>
            {/*end::Languages*/}
            {/*begin::User*/}
            <div className="topbar-item">
              <div
                className="btn btn-icon btn-icon-mobile w-auto btn-clean d-flex align-items-center btn-lg px-2"
                id="kt_quick_user_toggle"
              >
                <span className="text-muted font-weight-bold font-size-base d-none d-md-inline mr-1">
                  Xin chào,
                </span>
                <span className="text-dark-50 font-weight-bolder font-size-base d-none d-md-inline mr-3">
                  {JSON.parse(localStorage.getItem("user")).firstName}
                </span>
                <span className="symbol symbol-lg-35 symbol-25 symbol-light-success">
                  <span className="symbol-label font-size-h5 font-weight-bold">
                    {JSON.parse(localStorage.getItem("user")).firstName.charAt(0)}
                  </span>
                </span>
              </div>
            </div>
            {/*end::User*/}
          </div>
          {/*end::Topbar*/}
        </div>
        {/*end::Container*/}
      </div>
    );
  }
}

export default Header;
