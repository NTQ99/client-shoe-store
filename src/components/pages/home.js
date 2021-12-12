import React, { Component } from "react";

import Header from "../layouts/shoe-store/header";
import Footer from "../layouts/shoe-store/footer";

import ProductService from "../../service/product.service";
import cartService from "../../service/cart.service";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productGroups: [],
      numOfcart: 0,
    };
  }

  componentDidMount() {
    ProductService.getProductCategory().then((res) => {
      this.setState({ productGroups: res.data.data });
    });
  }

  addProductToCart(id) {
    this.setState({ numOfcart: this.state.numOfcart + 1 });
    cartService.addToCart(id, 1);
  }

  render() {
    const { productGroups, numOfcart } = this.state;
    return (
      <div>
        <Header numOfcart={numOfcart} />
        {/* start banner Area */}
        <section className="banner-area">
          <div className="container">
            <div className="row fullscreen align-items-center justify-content-start">
              <div className="col-lg-12">
                <div className="active-banner-slider owl-carousel">
                  {/* single-slide */}
                  <div className="row single-slide align-items-center d-flex">
                    <div className="col-lg-5 col-md-6">
                      <div className="banner-content">
                        <h1>
                          Nike New <br />
                          Collection!
                        </h1>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation.
                        </p>
                        <div className="add-bag d-flex align-items-center">
                          <a className="add-btn" href>
                            <span className="lnr lnr-cross" />
                          </a>
                          <span className="add-text text-uppercase">
                            Thêm vào giỏ
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-7">
                      <div className="banner-img">
                        <img
                          className="img-fluid"
                          src="/assets/img/banner/banner-img.png"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  {/* single-slide */}
                  <div className="row single-slide">
                    <div className="col-lg-5">
                      <div className="banner-content">
                        <h1>
                          Nike New <br />
                          Collection!
                        </h1>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation.
                        </p>
                        <div className="add-bag d-flex align-items-center">
                          <a className="add-btn" href>
                            <span className="lnr lnr-cross" />
                          </a>
                          <span className="add-text text-uppercase">
                            Thêm vào giỏ
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-7">
                      <div className="banner-img">
                        <img
                          className="img-fluid"
                          src="/assets/img/banner/banner-img.png"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End banner Area */}
        {/* start features Area */}
        <section className="features-area section_gap">
          <div className="container">
            <div className="row features-inner">
              {/* single features */}
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="single-features">
                  <div className="f-icon">
                    <img src="/assets/img/features/f-icon1.png" alt="" />
                  </div>
                  <h6>Miễn phí vận chuyển</h6>
                  <p>Miễn phí vận chuyển toàn quốc</p>
                </div>
              </div>
              {/* single features */}
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="single-features">
                  <div className="f-icon">
                    <img src="/assets/img/features/f-icon2.png" alt="" />
                  </div>
                  <h6>Chính sách đổi trả</h6>
                  <p>7 ngày đổi trả sản phẩm</p>
                </div>
              </div>
              {/* single features */}
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="single-features">
                  <div className="f-icon">
                    <img src="/assets/img/features/f-icon3.png" alt="" />
                  </div>
                  <h6>Hỗ trợ 24/7</h6>
                  <p>Liên hệ chúng tôi để được hỗ trợ</p>
                </div>
              </div>
              {/* single features */}
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="single-features">
                  <div className="f-icon">
                    <img src="/assets/img/features/f-icon4.png" alt="" />
                  </div>
                  <h6>Bảo mật thanh toán</h6>
                  <p>Tiêu chuẩn PCI DSS</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* end features Area */}
        {/* Start category Area */}
        <section className="category-area">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8 col-md-12">
                <div className="row">
                  <div className="col-lg-8 col-md-8">
                    <div className="single-deal">
                      <div className="overlay" />
                      <img
                        className="img-fluid w-100"
                        src="/assets/img/category/c1.jpg"
                        alt=""
                      />
                      <a
                        href="img/category/c1.jpg"
                        className="img-pop-up"
                        target="_blank"
                      >
                        <div className="deal-details">
                          <h6 className="deal-title">Sneaker for Sports</h6>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4">
                    <div className="single-deal">
                      <div className="overlay" />
                      <img
                        className="img-fluid w-100"
                        src="/assets/img/category/c2.jpg"
                        alt=""
                      />
                      <a
                        href="img/category/c2.jpg"
                        className="img-pop-up"
                        target="_blank"
                      >
                        <div className="deal-details">
                          <h6 className="deal-title">Sneaker for Sports</h6>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4">
                    <div className="single-deal">
                      <div className="overlay" />
                      <img
                        className="img-fluid w-100"
                        src="/assets/img/category/c3.jpg"
                        alt=""
                      />
                      <a
                        href="img/category/c3.jpg"
                        className="img-pop-up"
                        target="_blank"
                      >
                        <div className="deal-details">
                          <h6 className="deal-title">Product for Couple</h6>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-8 col-md-8">
                    <div className="single-deal">
                      <div className="overlay" />
                      <img
                        className="img-fluid w-100"
                        src="/assets/img/category/c4.jpg"
                        alt=""
                      />
                      <a
                        href="img/category/c4.jpg"
                        className="img-pop-up"
                        target="_blank"
                      >
                        <div className="deal-details">
                          <h6 className="deal-title">Sneaker for Sports</h6>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="single-deal">
                  <div className="overlay" />
                  <img
                    className="img-fluid w-100"
                    src="/assets/img/category/c5.jpg"
                    alt=""
                  />
                  <a
                    href="img/category/c5.jpg"
                    className="img-pop-up"
                    target="_blank"
                  >
                    <div className="deal-details">
                      <h6 className="deal-title">Sneaker for Sports</h6>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End category Area */}
        {/* start product Area */}
        <section className="owl-carousel active-product-area section_gap">
          {/* single product slide */}
          <div className="single-product-slider">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-6 text-center">
                  <div className="section-title">
                    <h1>Sản phẩm mới</h1>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                {productGroups.map((item, i) => {
                  if (!item.productPhotos[0].startsWith("http") && !item.productPhotos[0].startsWith("/")) {
                    item.productPhotos[0] = "/" + item.productPhotos[0];
                  }
                  return (
                    <div className="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6">
                    <div className="product__item">
                      <div
                        className="product__item__pic set-bg"
                      >
                        <a href={"/product-detail/" + item.productCode}>
                          <img
                            className="product__item__pic set-bg"
                            src={item.productPhotos[0]}
                            alt=""
                          />
                        </a>
                      </div>
                      <div className="product__item__text">
                        <h6>{item.productName}</h6>
                        <a href={"/product-detail/" + item.productCode} className="add-cart">
                          + Xem thêm
                        </a>
                        <div className="rating">
                          <i className="fa fa-star-o" />
                          <i className="fa fa-star-o" />
                          <i className="fa fa-star-o" />
                          <i className="fa fa-star-o" />
                          <i className="fa fa-star-o" />
                        </div>
                        <h5>{item.price.toLocaleString("it-IT", { style: "currency", currency: "VND" })}</h5>
                        <div className="product__color__select">
                          {item.color.map((value,indexx) => {
                            return(
                            <label style={{background: value}} className={indexx === 0 ? "active": ""}>
                              <input type="radio" />
                            </label>
                          )})}
                        </div>
                      </div>
                    </div>
                  </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/* single product slide */}
          <div className="single-product-slider">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-6 text-center">
                  <div className="section-title">
                    <h1>Hàng sắp về</h1>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
              {productGroups.map((item, i) => {
                    if (!item.productPhotos[0].startsWith("http") && !item.productPhotos[0].startsWith("/")) {
                      item.productPhotos[0] = "/" + item.productPhotos[0];
                    }
                    return (
                      <div className="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6">
                      <div className="product__item">
                        <div
                          className="product__item__pic set-bg"
                        >
                          <a href={"/product-detail/" + item.productCode}>
                            <img
                              className="product__item__pic set-bg"
                              src={item.productPhotos[0]}
                              alt=""
                            />
                          </a>
                          <ul className="product__hover">
                            <li>
                              <a href="#">
                                <img src="/assets/img/icon/heart.png" alt="" />
                                <span>Yêu thích</span>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <img src="/assets/img/icon/compare.png" alt="" />{" "}
                                <span>So sánh</span>
                              </a>
                            </li>
                            <li>
                              <a href={"/product-detail/" + item.productCode}>
                                <img src="/assets/img/icon/search.png" alt="" />
                                <span>Chi tiết</span>
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div className="product__item__text">
                          <h6>{item.productName}</h6>
                          <a href={"/product-detail/" + item.productCode} className="add-cart">
                            + Xem thêm
                          </a>
                          <div className="rating">
                            <i className="fa fa-star-o" />
                            <i className="fa fa-star-o" />
                            <i className="fa fa-star-o" />
                            <i className="fa fa-star-o" />
                            <i className="fa fa-star-o" />
                          </div>
                          <h5>{item.price.toLocaleString("it-IT", { style: "currency", currency: "VND" })}</h5>
                          <div className="product__color__select">
                            {item.color.map((value,indexx) => {
                              return(
                              <label style={{background: value}} className={indexx === 0 ? "active": ""}>
                                <input type="radio" />
                              </label>
                            )})}
                          </div>
                        </div>
                      </div>
                    </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </section>
        {/* end product Area */}
        {/* Start exclusive deal Area */}
        <section className="exclusive-deal-area">
          <div className="container-fluid">
            <div className="row justify-content-center align-items-center">
              <div className="col-lg-6 no-padding exclusive-left">
                <div className="row clock_sec clockdiv" id="clockdiv">
                  <div className="col-lg-12">
                    <h1>Ưu đãi độc quyền sẽ sớm kết thúc!</h1>
                    <p>Hay nhanh tay đặt hàng để nhận ưu đãi hấp dẫn.</p>
                  </div>
                  <div className="col-lg-12">
                    <div className="row clock-wrap">
                      <div className="col clockinner1 clockinner">
                        <h1 className="days">1</h1>
                        <span className="smalltext">Ngày</span>
                      </div>
                      <div className="col clockinner clockinner1">
                        <h1 className="hours">23</h1>
                        <span className="smalltext">Giờ</span>
                      </div>
                      <div className="col clockinner clockinner1">
                        <h1 className="minutes">47</h1>
                        <span className="smalltext">Phút</span>
                      </div>
                      <div className="col clockinner clockinner1">
                        <h1 className="seconds">59</h1>
                        <span className="smalltext">Giây</span>
                      </div>
                    </div>
                  </div>
                </div>
                <a href className="primary-btn">
                  Mua ngay
                </a>
              </div>
              <div className="col-lg-6 no-padding exclusive-right">
                <div className="active-exclusive-product-slider">
                  {/* single exclusive carousel */}
                  <div className="single-exclusive-slider">
                    <img
                      className="img-fluid"
                      src="/assets/img/product/e-p1.png"
                      alt=""
                    />
                    <div className="product-details">
                      <div className="price">
                        <h6>500,000 đ</h6>
                        <h6 className="l-through">700,000 đ</h6>
                      </div>
                      <h4>addidas New Hammer sole for Sports person</h4>
                      <div className="add-bag d-flex align-items-center justify-content-center">
                        <a className="add-btn" href>
                          <span className="ti-bag" />
                        </a>
                        <span className="add-text text-uppercase">
                          Thêm vào giỏ
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* single exclusive carousel */}
                  <div className="single-exclusive-slider">
                    <img
                      className="img-fluid"
                      src="/assets/img/product/e-p1.png"
                      alt=""
                    />
                    <div className="product-details">
                      <div className="price">
                        <h6>500,000 đ</h6>
                        <h6 className="l-through">700,000 đ</h6>
                      </div>
                      <h4>addidas New Hammer sole for Sports person</h4>
                      <div className="add-bag d-flex align-items-center justify-content-center">
                        <a className="add-btn" href>
                          <span className="ti-bag" />
                        </a>
                        <span className="add-text text-uppercase">
                          Thêm vào giỏ
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End exclusive deal Area */}
        {/* Start brand Area */}
        <section className="brand-area section_gap">
          <div className="container">
            <div className="row">
              <a className="col single-img" href="/">
                <img
                  className="img-fluid d-block mx-auto"
                  src="/assets/img/brand/1.png"
                  alt=""
                />
              </a>
              <a className="col single-img" href="/">
                <img
                  className="img-fluid d-block mx-auto"
                  src="/assets/img/brand/2.png"
                  alt=""
                />
              </a>
              <a className="col single-img" href="/">
                <img
                  className="img-fluid d-block mx-auto"
                  src="/assets/img/brand/3.png"
                  alt=""
                />
              </a>
              <a className="col single-img" href="/">
                <img
                  className="img-fluid d-block mx-auto"
                  src="/assets/img/brand/4.png"
                  alt=""
                />
              </a>
              <a className="col single-img" href="/">
                <img
                  className="img-fluid d-block mx-auto"
                  src="/assets/img/brand/5.png"
                  alt=""
                />
              </a>
            </div>
          </div>
        </section>
        {/* End brand Area */}
        {/* Start related-product Area */}
        <section className="related-product-area section_gap_bottom">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6 text-center">
                <div className="section-title">
                  <h1>Ưu đãi trong tuần</h1>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-9">
                <div className="row">
                  <div className="col-lg-4 col-md-4 col-sm-6 mb-20">
                    <div className="single-related-product d-flex">
                      <a href="/">
                        <img src="/assets/img/r1.jpg" alt="" />
                      </a>
                      <div className="desc">
                        <a href="/" className="title">
                          Black lace Heels
                        </a>
                        <div className="price">
                          <h6>449,000 đ</h6>
                          <h6 className="l-through">700,000 đ</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-6 mb-20">
                    <div className="single-related-product d-flex">
                      <a href="/">
                        <img src="/assets/img/r2.jpg" alt="" />
                      </a>
                      <div className="desc">
                        <a href="/" className="title">
                          Black lace Heels
                        </a>
                        <div className="price">
                          <h6>449,000 đ</h6>
                          <h6 className="l-through">700,000 đ</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-6 mb-20">
                    <div className="single-related-product d-flex">
                      <a href="/">
                        <img src="/assets/img/r3.jpg" alt="" />
                      </a>
                      <div className="desc">
                        <a href="/" className="title">
                          Black lace Heels
                        </a>
                        <div className="price">
                          <h6>449,000 đ</h6>
                          <h6 className="l-through">700,000 đ</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-6 mb-20">
                    <div className="single-related-product d-flex">
                      <a href="/">
                        <img src="/assets/img/r5.jpg" alt="" />
                      </a>
                      <div className="desc">
                        <a href="/" className="title">
                          Black lace Heels
                        </a>
                        <div className="price">
                          <h6>449,000 đ</h6>
                          <h6 className="l-through">700,000 đ</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-6 mb-20">
                    <div className="single-related-product d-flex">
                      <a href="/">
                        <img src="/assets/img/r6.jpg" alt="" />
                      </a>
                      <div className="desc">
                        <a href="/" className="title">
                          Black lace Heels
                        </a>
                        <div className="price">
                          <h6>449,000 đ</h6>
                          <h6 className="l-through">700,000 đ</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-6 mb-20">
                    <div className="single-related-product d-flex">
                      <a href="/">
                        <img src="/assets/img/r7.jpg" alt="" />
                      </a>
                      <div className="desc">
                        <a href="/" className="title">
                          Black lace Heels
                        </a>
                        <div className="price">
                          <h6>449,000 đ</h6>
                          <h6 className="l-through">700,000 đ</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-6">
                    <div className="single-related-product d-flex">
                      <a href="/">
                        <img src="/assets/img/r9.jpg" alt="" />
                      </a>
                      <div className="desc">
                        <a href="/" className="title">
                          Black lace Heels
                        </a>
                        <div className="price">
                          <h6>449,000 đ</h6>
                          <h6 className="l-through">700,000 đ</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-6">
                    <div className="single-related-product d-flex">
                      <a href="/">
                        <img src="/assets/img/r10.jpg" alt="" />
                      </a>
                      <div className="desc">
                        <a href="/" className="title">
                          Black lace Heels
                        </a>
                        <div className="price">
                          <h6>449,000 đ</h6>
                          <h6 className="l-through">700,000 đ</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-6">
                    <div className="single-related-product d-flex">
                      <a href="/">
                        <img src="/assets/img/r11.jpg" alt="" />
                      </a>
                      <div className="desc">
                        <a href="/" className="title">
                          Black lace Heels
                        </a>
                        <div className="price">
                          <h6>449,000 đ</h6>
                          <h6 className="l-through">700,000 đ</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="ctg-right">
                  <a href="/" target="_blank">
                    <img
                      className="img-fluid d-block mx-auto"
                      src="/assets/img/category/c5.jpg"
                      alt=""
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End related-product Area */}
        <Footer />
        {/*gmaps Js*/}
      </div>
    );
  }
}

export default HomePage;
