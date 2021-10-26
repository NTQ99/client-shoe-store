import React, { Component } from "react";
import Chat from "../layouts/extra/chat";
import Loading from "../layouts/extra/loading";
import Scrolltop from "../layouts/extra/scrolltop";
import Toolbar from "../layouts/extra/toolbar";
import Content from "../layouts/general/content";
import HeaderMobile from "../layouts/general/header-mobile";
import AdminLayout from "../layouts/admin-layout";
import DemoPanel from "../layouts/offcanvas/demo-panel";
import QuickCart from "../layouts/offcanvas/quick-cart";
import QuickPanel from "../layouts/offcanvas/quick-panel";
import QuickUser from "../layouts/offcanvas/quick-user";

export default class AdminContainer extends Component {
  render() {
    return (
      <div className="header-fixed header-mobile-fixed aside-enabled aside-fixed footer-fixed aside-minimize-hoverable">
        <Loading />
        {/*[html-partial:include:{"file":"partials/_header-mobile.html"}]/*/}
        <HeaderMobile />
        <AdminLayout>
          {/* <Content/> */}
          {this.props.children}
        </AdminLayout>
        <QuickUser />
        <QuickCart />
        <QuickPanel />
        <Chat />
        <Scrolltop />
        {/* <Toolbar /> */}
        <DemoPanel />
      </div>
    );
  }
}
