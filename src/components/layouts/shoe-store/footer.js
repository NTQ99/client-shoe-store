import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <footer className="footer-area section_gap">
        <div className="container">
          <div className="row">
            <div className="col-lg-5  col-md-6 col-sm-6">
              <div className="single-footer-widget">
                <h6>Giới thiệu</h6>
                <span style={{color: "#727272"}}>
                Hệ thống bán lẻ giày thể thao số 1 Hà Nội với những mẫu mã đa dạng cùng với phong cách phục vụ tận tình, chu đáo. Đảm bảo sự thoải mái và hài lòng về chất lượng sản phẩm, chất lượng dịch vụ và đặc biệt là giá cả hợp lí tại cửa hàng.</span>
                <ul class="info hd-mb">
                  <li><span class="lnr lnr-location"></span><span className="ml-2">Địa chỉ: <a href="https://www.google.com/maps/place/Tr%C6%B0%E1%BB%9Dng+Cao+%C4%91%E1%BA%B3ng+FPT+Polytechnic/@21.0381328,105.7445984,17z/data=!3m1!4b1!4m5!3m4!1s0x313454b991d80fd5:0x53cefc99d6b0bf6f!8m2!3d21.0381278!4d105.7467871" target="_blank">Tòa nhà FPT Polytechnic, P. Trịnh Văn Bô, Xuân Phương, Nam Từ Liêm, Hà Nội</a></span></li>
                  <li><span class="lnr lnr-phone-handset"></span><span className="ml-2">Điện thoại: <a href="tel:(+84) 387 608 526" title="(+84) 387 608 526">(+84) 387 608 526</a></span></li>
                  <li><span class="lar la-envelope"></span><span className="ml-2">Mail: <a href="mailto:shoestore@gmail.com" title="shoestore@gmail.com"> shoestore@gmail.com</a></span></li>
                  <li><span class="lnr lnr-clock"></span><span className="ml-2">24/7</span></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2  col-md-6 col-sm-6">
            </div>
            <div className="col-lg-3  col-md-6 col-sm-6">
              <div className="single-footer-widget mail-chimp">
                <h6 className="mb-20">Instragram Feed</h6>
                <ul className="instafeed d-flex flex-wrap">
                  <li>
                    <img src="/assets/img/i1.jpg" alt="" />
                  </li>
                  <li>
                    <img src="/assets/img/i2.jpg" alt="" />
                  </li>
                  <li>
                    <img src="/assets/img/i3.jpg" alt="" />
                  </li>
                  <li>
                    <img src="/assets/img/i4.jpg" alt="" />
                  </li>
                  <li>
                    <img src="/assets/img/i5.jpg" alt="" />
                  </li>
                  <li>
                    <img src="/assets/img/i6.jpg" alt="" />
                  </li>
                  <li>
                    <img src="/assets/img/i7.jpg" alt="" />
                  </li>
                  <li>
                    <img src="/assets/img/i8.jpg" alt="" />
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-sm-6">
              <div className="single-footer-widget">
                <h6>Theo dõi chúng tôi</h6>
                <p style={{color: "#727272"}}>Hãy theo dõi chúng tôi trên các mạng xã hội</p>
                <div className="footer-social d-flex align-items-center">
                  <a href="/">
                    <i className="fa fa-facebook" />
                  </a>
                  <a href="/">
                    <i className="fa fa-twitter" />
                  </a>
                  <a href="/">
                    <i className="fa fa-dribbble" />
                  </a>
                  <a href="/">
                    <i className="fa fa-behance" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom d-flex justify-content-center align-items-center flex-wrap">
            <p className="footer-text m-0"  style={{color: "#727272"}}>
              {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
              Copyright © All rights reserved | This template is made with{" "}
              <i className="fa fa-heart-o" aria-hidden="true" />
              {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
            </p>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
