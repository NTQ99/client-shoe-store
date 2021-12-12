import React, { Component } from "react";

import Header from "../layouts/shoe-store/header";
import Footer from "../layouts/shoe-store/footer";

class TrackingPage extends Component {
  render() {
    return (
      <div>
        {/* Start Header Area */}
        <Header />
        {/* End Header Area */}
        {/* Start Banner Area */}
        <section className="banner-area organic-breadcrumb">
          <div className="container">
            <div className="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
              <div className="col-first">
                <h1>Tra cứu đơn hàng</h1>
                <nav className="d-flex align-items-center">
                  <a href="/home">
                    Trang chủ
                    <span className="lnr lnr-arrow-right" />
                  </a>
                  <a href="/tracking">Tra cứu đơn hàng</a>
                </nav>
              </div>
            </div>
          </div>
        </section>
        {/* End Banner Area */}
        {/*================Tracking Box Area =================*/}
        <section className="tracking_box_area section_gap">
          <div className="container">
            <div className="tracking_box_inner">
              <p>
                Để theo dõi đơn hàng, vui lòng nhập mã đơn hàng và số điện thoại của bạn vào ô bên dưới và nhấn nút "Tìm kiếm".
              </p>
              <form
                className="row tracking_form"
                action="/order-detail"
                method="get"
                noValidate="novalidate"
              >
                <div className="col-md-12 form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="orderid"
                    name="orderid"
                    placeholder="Mã đơn hàng"
                    />
                </div>
                <div className="col-md-12 form-group">
                  <input
                    type="phone"
                    className="form-control"
                    id="phone"
                    name="phone"
                    placeholder="Số điện thoại"
                  />
                </div>
                <div className="col-md-12 form-group">
                  <button type="submit" value="submit" className="primary-btn">
                    Tìm kiếm
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
        {/*================End Tracking Box Area =================*/}
        {/* start footer Area */}
        <Footer />
        {/* End footer Area */}
      </div>
    );
  }
}

export default TrackingPage;
