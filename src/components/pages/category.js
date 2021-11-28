import React, { Component } from "react";

import Header from "../layouts/shoe-store/header";
import Footer from "../layouts/shoe-store/footer";

import ProductService from "../../service/product.service";
import cartService from "../../service/cart.service";

class CategoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productGroups: [],
    };
  }

  componentDidMount() {
    ProductService.getProductCategory().then((res) => {
      this.setState({ productGroups: res.data.data });
    });
  }

  addProductToCart(e, id) {
    e.preventDefault();
    this.setState({numOfcart: this.state.numOfcart + 1});
    cartService.addToCart(id, 1);
  }

  render() {
    const { productGroups, numOfcart } = this.state;
    return (
      <div style={{backgroundColor:"#fff"}}>
        <Header numOfcart={numOfcart} />
        {/* Start Banner Area */}
        <section className="banner-area organic-breadcrumb">
          <div className="container">
            <div className="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
              <div className="col-first">
                <h1>Danh mục sản phẩm</h1>
                <nav className="d-flex align-items-center">
                  <a href="/">
                    Trang chủ
                    <span className="lnr lnr-arrow-right" />
                  </a>
                  <a href="/category">Danh mục</a>
                </nav>
              </div>
            </div>
          </div>
        </section>
        {/* End Banner Area */}
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-lg-4 col-md-5">
              <div className="sidebar-categories">
                <div className="head">Danh mục</div>
                <ul className="main-categories">
                  <li className="main-nav-list">
                    <a
                      data-toggle="collapse"
                      href="#fruitsVegetable"
                      aria-expanded="false"
                      aria-controls="fruitsVegetable"
                    >
                      <span className="lnr lnr-arrow-right" />
                      Giày nam<span className="number">(53)</span>
                    </a>
                  </li>
                  <li className="main-nav-list">
                    <a
                      data-toggle="collapse"
                      href="#meatFish"
                      aria-expanded="false"
                      aria-controls="meatFish"
                    >
                      <span className="lnr lnr-arrow-right" />
                      Giày nữ<span className="number">(53)</span>
                    </a>
                  </li>
                  <li className="main-nav-list">
                    <a
                      data-toggle="collapse"
                      href="#cooking"
                      aria-expanded="false"
                      aria-controls="cooking"
                    >
                      <span className="lnr lnr-arrow-right" />
                      Giày trẻ em<span className="number">(53)</span>
                    </a>
                    <ul
                      className="collapse"
                      id="cooking"
                      data-toggle="collapse"
                      aria-expanded="false"
                      aria-controls="cooking"
                    >
                      <li className="main-nav-list child">
                        <a href="#">
                          Frozen Fish<span className="number">(13)</span>
                        </a>
                      </li>
                      <li className="main-nav-list child">
                        <a href="#">
                          Dried Fish<span className="number">(09)</span>
                        </a>
                      </li>
                      <li className="main-nav-list child">
                        <a href="#">
                          Fresh Fish<span className="number">(17)</span>
                        </a>
                      </li>
                      <li className="main-nav-list child">
                        <a href="#">
                          Meat Alternatives<span className="number">(01)</span>
                        </a>
                      </li>
                      <li className="main-nav-list child">
                        <a href="#">
                          Meat<span className="number">(11)</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div className="sidebar-filter mt-50">
                <div className="top-filter-head">Lọc sản phẩm</div>
                <div className="common-filter">
                  <div className="head">Nhãn hiệu</div>
                  <form action="#">
                    <ul>
                      <li className="filter-list">
                        <input
                          className="pixel-radio"
                          type="radio"
                          id="apple"
                          name="brand"
                        />
                        <label htmlFor="apple">
                          Nike<span>(29)</span>
                        </label>
                      </li>
                      <li className="filter-list">
                        <input
                          className="pixel-radio"
                          type="radio"
                          id="asus"
                          name="brand"
                        />
                        <label htmlFor="asus">
                          Adidas<span>(29)</span>
                        </label>
                      </li>
                      <li className="filter-list">
                        <input
                          className="pixel-radio"
                          type="radio"
                          id="gionee"
                          name="brand"
                        />
                        <label htmlFor="gionee">
                          Puma<span>(19)</span>
                        </label>
                      </li>
                      <li className="filter-list">
                        <input
                          className="pixel-radio"
                          type="radio"
                          id="micromax"
                          name="brand"
                        />
                        <label htmlFor="micromax">
                          Biti's<span>(19)</span>
                        </label>
                      </li>
                    </ul>
                  </form>
                </div>
                <div className="common-filter">
                  <div className="head">Color</div>
                  <form action="#">
                    <ul>
                      <li className="filter-list">
                        <input
                          className="pixel-radio"
                          type="radio"
                          id="black"
                          name="color"
                        />
                        <label htmlFor="black">
                          Đen<span>(29)</span>
                        </label>
                      </li>
                      <li className="filter-list">
                        <input
                          className="pixel-radio"
                          type="radio"
                          id="balckleather"
                          name="color"
                        />
                        <label htmlFor="balckleather">
                          Đỏ<span>(29)</span>
                        </label>
                      </li>
                      <li className="filter-list">
                        <input
                          className="pixel-radio"
                          type="radio"
                          id="blackred"
                          name="color"
                        />
                        <label htmlFor="blackred">
                          Xanh biển<span>(19)</span>
                        </label>
                      </li>
                      <li className="filter-list">
                        <input
                          className="pixel-radio"
                          type="radio"
                          id="gold"
                          name="color"
                        />
                        <label htmlFor="gold">
                          Vàng<span>(19)</span>
                        </label>
                      </li>
                      <li className="filter-list">
                        <input
                          className="pixel-radio"
                          type="radio"
                          id="spacegrey"
                          name="color"
                        />
                        <label htmlFor="spacegrey">
                          Hồng<span>(19)</span>
                        </label>
                      </li>
                    </ul>
                  </form>
                </div>
                <div className="common-filter">
                  <div className="head">Khoảng giá</div>
                  <div className="price-range-area">
                    <div id="price-range" />
                    <div className="value-wrapper d-flex">
                      <div className="price">Từ:</div>
                      <span>$</span>
                      <div id="lower-value" />
                      <div className="to">đến</div>
                      <span>$</span>
                      <div id="upper-value" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-9 col-lg-8 col-md-7">
              {/* Start Filter Bar */}
              <div className="filter-bar d-flex flex-wrap align-items-center">
                <div className="sorting">
                  <select className="form-select">
                    <option value={1}>Sắp xếp mặc định</option>
                    <option value={1}>Sắp xếp theo giá thấp nhất</option>
                    <option value={1}>Sắp xếp theo giá cao nhất</option>
                  </select>
                </div>
                <div className="sorting mr-auto">
                  <select className="form-select">
                    <option value={1}>Hiển thị 10</option>
                    <option value={1}>Hiển thị 20</option>
                    <option value={1}>Hiển thị 30</option>
                  </select>
                </div>
                <div className="pagination">
                  <a href="#" className="prev-arrow">
                    <i className="fa fa-long-arrow-left" aria-hidden="true" />
                  </a>
                  <a href="#" className="active">
                    1
                  </a>
                  <a href="#">2</a>
                  <a href="#">3</a>
                  <a href="#" className="dot-dot">
                    <i className="fa fa-ellipsis-h" aria-hidden="true" />
                  </a>
                  <a href="#">6</a>
                  <a href="#" className="next-arrow">
                    <i className="fa fa-long-arrow-right" aria-hidden="true" />
                  </a>
                </div>
              </div>
              {/* End Filter Bar */}
              {/* Start Best Seller */}
              <section className="lattest-product-area pb-40 category-list mt-8">
                <div className="row">
                  {productGroups.map((item, i) => {
                    if (!item.productPhotos[0].startsWith("http") && !item.productPhotos[0].startsWith("/")) {
                      item.productPhotos[0] = "/" + item.productPhotos[0];
                    }
                    return (
                      <div className="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix hot-sales">
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
                            + Thêm vào giỏ hàng
                          </a>
                          <div className="rating">
                            <i className="fa fa-star-o" />
                            <i className="fa fa-star-o" />
                            <i className="fa fa-star-o" />
                            <i className="fa fa-star-o" />
                            <i className="fa fa-star-o" />
                          </div>
                          <h5>{item.price.toLocaleString("it-IT", { style: "currency", currency: "VND" })}</h5>
                          {/* <div className="product__details__option__size">
                            <span>Size:</span>
                            {Object.keys(productStocks).map((item) => (
                              <label
                                htmlFor={`size${item}`}
                                className={
                                  productSelected.size === item ? "active" : ""
                                }
                                onClick={() => this.onSelectSize(item)}
                              >
                                {item}
                                <input type="radio" id={`size${item}`} />
                              </label>
                            ))}
                          </div>
                          <div className="product__details__option__color">
                            <span>Màu sắc:</span>
                            {Object.keys(colorCodes).map((item) => {
                              return (
                                <label
                                  htmlFor={`color${item}`}
                                  className={
                                    productSelected.color === item ? "active" : ""
                                  }
                                  onClick={() => this.onSelectColor(item)}
                                  style={{ background: colorCodes[item] }}
                                >
                                  <input type="radio" id={`color${item}`} />
                                </label>
                              );
                            })}
                          </div>
                        </div> */}
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
              </section>
              {/* End Best Seller */}
              {/* Start Filter Bar */}
              <div className="filter-bar d-flex flex-wrap align-items-center">
                <div className="sorting mr-auto">
                  <select className="form-select">
                    <option value={1}>Hiển thị 10</option>
                    <option value={1}>Hiển thị 20</option>
                    <option value={1}>Hiển thị 30</option>
                  </select>
                </div>
                <div className="pagination">
                  <a href="#" className="prev-arrow">
                    <i className="fa fa-long-arrow-left" aria-hidden="true" />
                  </a>
                  <a href="#" className="active">
                    1
                  </a>
                  <a href="#">2</a>
                  <a href="#">3</a>
                  <a href="#" className="dot-dot">
                    <i className="fa fa-ellipsis-h" aria-hidden="true" />
                  </a>
                  <a href="#">6</a>
                  <a href="#" className="next-arrow">
                    <i className="fa fa-long-arrow-right" aria-hidden="true" />
                  </a>
                </div>
              </div>
              {/* End Filter Bar */}
            </div>
          </div>
        </div>
        {/* Start related-product Area */}
        <section className="related-product-area section_gap">
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
                      <a href="#">
                        <img src="/assets/img/r1.jpg" alt="" />
                      </a>
                      <div className="desc">
                        <a href="#" className="title">
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
                      <a href="#">
                        <img src="/assets/img/r2.jpg" alt="" />
                      </a>
                      <div className="desc">
                        <a href="#" className="title">
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
                      <a href="#">
                        <img src="/assets/img/r3.jpg" alt="" />
                      </a>
                      <div className="desc">
                        <a href="#" className="title">
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
                      <a href="#">
                        <img src="/assets/img/r5.jpg" alt="" />
                      </a>
                      <div className="desc">
                        <a href="#" className="title">
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
                      <a href="#">
                        <img src="/assets/img/r6.jpg" alt="" />
                      </a>
                      <div className="desc">
                        <a href="#" className="title">
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
                      <a href="#">
                        <img src="/assets/img/r7.jpg" alt="" />
                      </a>
                      <div className="desc">
                        <a href="#" className="title">
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
                      <a href="#">
                        <img src="/assets/img/r9.jpg" alt="" />
                      </a>
                      <div className="desc">
                        <a href="#" className="title">
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
                      <a href="#">
                        <img src="/assets/img/r10.jpg" alt="" />
                      </a>
                      <div className="desc">
                        <a href="#" className="title">
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
                      <a href="#">
                        <img src="/assets/img/r11.jpg" alt="" />
                      </a>
                      <div className="desc">
                        <a href="#" className="title">
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
                  <a href="#" target="_blank">
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
      </div>
    );
  }
}

export default CategoryPage;
