import React, { Component } from "react";

class QuickCart extends Component {
  render() {
    return (
      <div id="kt_quick_cart" className="offcanvas offcanvas-right p-10">
        {/*begin::Header*/}
        <div className="offcanvas-header d-flex align-items-center justify-content-between pb-7">
          <h4 className="font-weight-bold m-0">Shopping Cart</h4>
          <a
            href="/"
            className="btn btn-xs btn-icon btn-light btn-hover-primary"
            id="kt_quick_cart_close"
          >
            <i className="ki ki-close icon-xs text-muted" />
          </a>
        </div>
        {/*end::Header*/}
        {/*begin::Content*/}
        <div className="offcanvas-content">
          {/*begin::Wrapper*/}
          <div className="offcanvas-wrapper mb-5 scroll-pull">
            {/*begin::Item*/}
            <div className="d-flex align-items-center justify-content-between py-8">
              <div className="d-flex flex-column mr-2">
                <a
                  href="/"
                  className="font-weight-bold text-dark-75 font-size-lg text-hover-primary"
                >
                  iBlender
                </a>
                <span className="text-muted">
                  The best kitchen gadget in 2020
                </span>
                <div className="d-flex align-items-center mt-2">
                  <span className="font-weight-bold mr-1 text-dark-75 font-size-lg">
                    $ 350
                  </span>
                  <span className="text-muted mr-1">for</span>
                  <span className="font-weight-bold mr-2 text-dark-75 font-size-lg">
                    5
                  </span>
                  <a
                    href="/"
                    className="btn btn-xs btn-light-success btn-icon mr-2"
                  >
                    <i className="ki ki-minus icon-xs" />
                  </a>
                  <a href="/" className="btn btn-xs btn-light-success btn-icon">
                    <i className="ki ki-plus icon-xs" />
                  </a>
                </div>
              </div>
              <a href="/" className="symbol symbol-70 flex-shrink-0">
                <img src="assets/media/stock-600x400/img-1.jpg" title="" alt="" />
              </a>
            </div>
            {/*end::Item*/}
            {/*begin::Separator*/}
            <div className="separator separator-solid" />
            {/*end::Separator*/}
            {/*begin::Item*/}
            <div className="d-flex align-items-center justify-content-between py-8">
              <div className="d-flex flex-column mr-2">
                <a
                  href="/"
                  className="font-weight-bold text-dark-75 font-size-lg text-hover-primary"
                >
                  SmartCleaner
                </a>
                <span className="text-muted">Smart tool for cooking</span>
                <div className="d-flex align-items-center mt-2">
                  <span className="font-weight-bold mr-1 text-dark-75 font-size-lg">
                    $ 650
                  </span>
                  <span className="text-muted mr-1">for</span>
                  <span className="font-weight-bold mr-2 text-dark-75 font-size-lg">
                    4
                  </span>
                  <a
                    href="/"
                    className="btn btn-xs btn-light-success btn-icon mr-2"
                  >
                    <i className="ki ki-minus icon-xs" />
                  </a>
                  <a href="/" className="btn btn-xs btn-light-success btn-icon">
                    <i className="ki ki-plus icon-xs" />
                  </a>
                </div>
              </div>
              <a href="/" className="symbol symbol-70 flex-shrink-0">
                <img src="assets/media/stock-600x400/img-2.jpg" title="" alt="" />
              </a>
            </div>
            {/*end::Item*/}
            {/*begin::Separator*/}
            <div className="separator separator-solid" />
            {/*end::Separator*/}
            {/*begin::Item*/}
            <div className="d-flex align-items-center justify-content-between py-8">
              <div className="d-flex flex-column mr-2">
                <a
                  href="/"
                  className="font-weight-bold text-dark-75 font-size-lg text-hover-primary"
                >
                  CameraMax
                </a>
                <span className="text-muted">
                  Professional camera for edge cutting shots
                </span>
                <div className="d-flex align-items-center mt-2">
                  <span className="font-weight-bold mr-1 text-dark-75 font-size-lg">
                    $ 150
                  </span>
                  <span className="text-muted mr-1">for</span>
                  <span className="font-weight-bold mr-2 text-dark-75 font-size-lg">
                    3
                  </span>
                  <a
                    href="/"
                    className="btn btn-xs btn-light-success btn-icon mr-2"
                  >
                    <i className="ki ki-minus icon-xs" />
                  </a>
                  <a href="/" className="btn btn-xs btn-light-success btn-icon">
                    <i className="ki ki-plus icon-xs" />
                  </a>
                </div>
              </div>
              <a href="/" className="symbol symbol-70 flex-shrink-0">
                <img src="assets/media/stock-600x400/img-3.jpg" title="" alt="" />
              </a>
            </div>
            {/*end::Item*/}
            {/*begin::Separator*/}
            <div className="separator separator-solid" />
            {/*end::Separator*/}
            {/*begin::Item*/}
            <div className="d-flex align-items-center justify-content-between py-8">
              <div className="d-flex flex-column mr-2">
                <a
                  href="/"
                  className="font-weight-bold text-dark text-hover-primary"
                >
                  4D Printer
                </a>
                <span className="text-muted">Manufactoring unique objects</span>
                <div className="d-flex align-items-center mt-2">
                  <span className="font-weight-bold mr-1 text-dark-75 font-size-lg">
                    $ 1450
                  </span>
                  <span className="text-muted mr-1">for</span>
                  <span className="font-weight-bold mr-2 text-dark-75 font-size-lg">
                    7
                  </span>
                  <a
                    href="/"
                    className="btn btn-xs btn-light-success btn-icon mr-2"
                  >
                    <i className="ki ki-minus icon-xs" />
                  </a>
                  <a href="/" className="btn btn-xs btn-light-success btn-icon">
                    <i className="ki ki-plus icon-xs" />
                  </a>
                </div>
              </div>
              <a href="/" className="symbol symbol-70 flex-shrink-0">
                <img src="assets/media/stock-600x400/img-4.jpg" title="" alt="" />
              </a>
            </div>
            {/*end::Item*/}
            {/*begin::Separator*/}
            <div className="separator separator-solid" />
            {/*end::Separator*/}
            {/*begin::Item*/}
            <div className="d-flex align-items-center justify-content-between py-8">
              <div className="d-flex flex-column mr-2">
                <a
                  href="/"
                  className="font-weight-bold text-dark text-hover-primary"
                >
                  MotionWire
                </a>
                <span className="text-muted">Perfect animation tool</span>
                <div className="d-flex align-items-center mt-2">
                  <span className="font-weight-bold mr-1 text-dark-75 font-size-lg">
                    $ 650
                  </span>
                  <span className="text-muted mr-1">for</span>
                  <span className="font-weight-bold mr-2 text-dark-75 font-size-lg">
                    7
                  </span>
                  <a
                    href="/"
                    className="btn btn-xs btn-light-success btn-icon mr-2"
                  >
                    <i className="ki ki-minus icon-xs" />
                  </a>
                  <a href="/" className="btn btn-xs btn-light-success btn-icon">
                    <i className="ki ki-plus icon-xs" />
                  </a>
                </div>
              </div>
              <a href="/" className="symbol symbol-70 flex-shrink-0">
                <img src="assets/media/stock-600x400/img-8.jpg" title="" alt="" />
              </a>
            </div>
            {/*end::Item*/}
          </div>
          {/*end::Wrapper*/}
          {/*begin::Purchase*/}
          <div className="offcanvas-footer">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <span className="font-weight-bold text-muted font-size-sm mr-2">
                Total
              </span>
              <span className="font-weight-bolder text-dark-50 text-right">
                $1840.00
              </span>
            </div>
            <div className="d-flex align-items-center justify-content-between mb-7">
              <span className="font-weight-bold text-muted font-size-sm mr-2">
                Sub total
              </span>
              <span className="font-weight-bolder text-primary text-right">
                $5640.00
              </span>
            </div>
            <div className="text-right">
              <button
                type="button"
                className="btn btn-primary text-weight-bold"
              >
                Place Order
              </button>
            </div>
          </div>
          {/*end::Purchase*/}
        </div>
        {/*end::Content*/}
      </div>
    );
  }
}

export default QuickCart;
