import React, { Component } from "react";

import Header from "../layouts/shoe-store/header";
import Footer from "../layouts/shoe-store/footer";

import ProductService from "../../service/product.service";
import cartService from "../../service/cart.service";

const colorCode = {
  "DE": "Đen",
  "TR": "Trắng",
  "XL": "Xanh lục",
  "XB": "Xanh biển",
  "DO": "Đỏ",
  "BE": "Be",
  "NA": "Nâu",
  "TI": "Tím",
  "VA": "Vàng",
  "XA": "Xám",
  "CA": "Cam",
  "HO": "Hồng",
  "XX": "Khác"
}

class CategoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productGroups: [],
      cateList: {},
      brandList: {},
      colorList: {},
      querySearch: {}
    };
  }

  componentDidMount() {
    let urlParams = new URLSearchParams(this.props.location.search.substring(1));
    let params = Object.fromEntries(urlParams);
    this.setState({querySearch: params});

    ProductService.getProductCategory(params).then((res) => {
      this.setState({ productGroups: res.data.data });
    });
    ProductService.getCategoryNum().then((res) => {
      this.setState({ cateList: res.data.data });
    });
    ProductService.getBrandNum().then((res) => {
      this.setState({ brandList: res.data.data });
    });
    ProductService.getColorNum().then((res) => {
      this.setState({ colorList: res.data.data });
    });

  }

  setFilter = (e, queryName, queryValue) => {
    e.preventDefault();
    let urlParams = new URLSearchParams(this.props.location.search.substring(1));
    let params = Object.fromEntries(urlParams);

    params[queryName] = queryValue;

    let queryString = new URLSearchParams(params).toString();
    window.location.href = "/category?" + queryString;
  }

  addProductToCart(e, id, title) {
    e.preventDefault();
    this.setState({numOfcart: this.state.numOfcart + 1});
    cartService.addToCart(id, 1, title);
  }

  render() {
    const { productGroups, numOfcart, cateList, brandList, colorList, querySearch } = this.state;
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
                  {Object.keys(cateList).map(item => (
                    <li className="main-nav-list">
                      <a
                        className={querySearch.type === item? "active" : ""}
                        onClick={(e) => this.setFilter(e, "type", item)}
                        href="/"
                        
                      >
                        <span className="lnr lnr-arrow-right" />
                        {item}<span className="number">({cateList[item]})</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="sidebar-filter mt-50">
                <div className="top-filter-head">
                  Lọc sản phẩm
                  {Object.keys(querySearch).length > 0 && <a href="/category">Xóa bộ lọc</a>}
                </div>
                <div className="common-filter">
                  <div className="head">Nhãn hiệu</div>
                  <form action="#">
                    <ul>
                      {Object.keys(brandList).map((item, index) => (
                        <li className="filter-list">
                          <input
                            className="pixel-radio"
                            id={`brand-${index}`}
                            type="radio"
                            checked={querySearch.brand === item? true : false}
                            onClick={(e) => this.setFilter(e, "brand", item)}
                          />
                          <label htmlFor={`brand-${index}`}>
                            {item}<span>({brandList[item]})</span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </form>
                </div>
                <div className="common-filter">
                  <div className="head">Color</div>
                  <form action="#">
                    <ul>
                    {Object.keys(colorList).sort().map((item, index) => (
                        colorList[item] > 0 && <li className="filter-list">
                          <input
                            className="pixel-radio"
                            type="radio"
                            id={`color-${index}`}
                            checked={querySearch.color === item? true : false}
                            onClick={(e) => this.setFilter(e, "color", item)}
                          />
                          <label htmlFor={`color-${index}`}>
                            {colorCode[item]}<span>({colorList[item]})</span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </form>
                </div>
                <div className="common-filter">
                  <div className="head">Khoảng giá</div>
                  <div className="price-range-area">
                    <div id="price-range" />
                    <div className="value-wrapper d-flex">
                      <div className="price">Từ:</div>
                      <div id="lower-value" />
                      <span>đ</span>
                      <div className="to">đến</div>
                      <div id="upper-value" />
                      <span>đ</span>
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
