import React, { Component } from "react";
import cartService from "../../service/cart.service";
import productService from "../../service/product.service";
import Footer from "../layouts/shoe-store/footer";
import Header from "../layouts/shoe-store/header";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import GeneralDialog from "../layouts/modal/GeneralDialog";

class ProductDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productDetail: {
        price: [],
        productCode: "",
        productDetail: "",
        productName: "",
        productPhotos: [],
        stock: 0,
      },
      productSelected: {
        color: "",
        size: "",
        productId: "",
        quantity: 1,
        stock: 0,
      },
      productStocks: [],
      colorCodes: [],
    };
  }

  async componentDidMount() {
    await productService
      .getProductById(this.props.match.params.productCode)
      .then(async (res) => {
        if (res.data.error.statusCode === 100) {
          this.setState({
            productDetail: res.data.data[0],
            products: res.data.data,
          });
        } else this.openResponseDialog("error", res.data.error.message);
      }).catch(error => this.openResponseDialog("error", error.response.error.message));
    let productStocks = [];
    let colorCodes = [];
    for (let i = 0; i < this.state.products.length; i++) {
      let item = this.state.products[i];
      let color = item.color || "";
      let size = item.size.toString() || "";
      let obj = {
        stock: item.stock,
        id: item.id,
      };
      if (!productStocks[size]) productStocks[size] = [];
      productStocks[size][color] = obj;
      colorCodes[color] = await productService
        .getColorCode(color)
        .then((res) => res.data);
      if (i === 0)
        this.setState({
          productSelected: {
            color: color,
            size: size,
            productId: item.id,
            quantity: 1,
            stock: item.stock,
          },
        });
    }

    this.setState({ productStocks: productStocks, colorCodes: colorCodes });
  }

  openResponseDialog = (variant, message) => {
    this.setState({
      dialogProps: {
        show: true,
        handleOk: () => this.setState({dialogProps:{...this.state.dialogProps, show: false}}),
        variant: variant,
        message: message
      }
    });
  }

  addProductToCart = (e) => {
    e.preventDefault();
    if (this.state.productSelected.stock === 0) {
      this.openResponseDialog("error", "Số lượng sản phẩm đã hết!");
      return;
    }
    this.setState({
      numOfcart: this.state.numOfcart + this.state.productSelected.quantity,
    });
    cartService.addToCart(
      this.state.productSelected.productId,
      this.state.productSelected.quantity,
      this.state.productDetail.productName + ", size " + this.state.productSelected.size + ", " + this.state.productSelected.color 
    );
  };

  onSelectColor = (color) => {
    let productStocks = this.state.productStocks;
    let size = this.state.productSelected.size;
    this.setState({
      productSelected: {
        ...this.state.productSelected,
        color: color,
        productId: productStocks[size][color]
          ? productStocks[size][color].id
          : "",
        quantity: 1,
        stock: productStocks[size][color]
          ? productStocks[size][color].stock
          : 0,
      },
    });
  };

  onSelectSize = (size) => {
    let productStocks = this.state.productStocks;
    let color = this.state.productSelected.color;
    this.setState({
      productSelected: {
        ...this.state.productSelected,
        size: size,
        productId: productStocks[size][color]
          ? productStocks[size][color].id
          : "",
        quantity: 1,
        stock: productStocks[size][color]
          ? productStocks[size][color].stock
          : 0,
      },
    });
  };

  render() {
    const {
      productDetail,
      numOfcart,
      productStocks,
      colorCodes,
      productSelected,
      dialogProps
    } = this.state;

    const sliderSetting = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    return (
      <div style={{ backgroundColor: "#fff" }}>
        <GeneralDialog { ...dialogProps } />
        <Header numOfcart={numOfcart} />

        {/* Start Banner Area */}
        <section className="banner-area organic-breadcrumb">
          <div className="container">
            <div className="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
              <div className="col-first">
                <h1>Chi tiết sản phẩm</h1>
                <nav className="d-flex align-items-center">
                  <a href="/">
                    Trang chủ
                    <span className="lnr lnr-arrow-right" />
                  </a>
                  <a href="#">
                    Sản phẩm
                    <span className="lnr lnr-arrow-right" />
                  </a>
                  <a href="single-product.html">Chi tiết</a>
                </nav>
              </div>
            </div>
          </div>
        </section>
        {/* End Banner Area */}
        {/*================Single Product Area =================*/}
        <section className="product_image_area">
          <div className="container">
            <div className="row s_product_inner">
              <div className="col-lg-6">
                <Slider {...sliderSetting}>
                  {productDetail.productPhotos !== null &&
                    productDetail.productPhotos.map((item, i) => {
                      if (!item.startsWith("http") && !item.startsWith("/")) {
                        item = "/" + item;
                      }
                      return (
                        <div className="single-prd-item">
                          <img className="img-fluid" src={item} alt=""/>
                        </div>
                      );
                    })}
                </Slider>
              </div>
              <div className="col-lg-5 offset-lg-1">
                <div className="s_product_text">
                  <h3>{productDetail.productName}</h3>
                  <h2>{productDetail.price + " VND"}</h2>
                  <ul className="list">
                    <li>
                      <a className="active" href="#">
                        <span>Danh mục</span> : {productDetail.category}
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span>Số lượng còn</span> : {productSelected.stock}
                      </a>
                    </li>
                  </ul>
                  <p>{productDetail.productDetail}</p>
                  <div className="product__details__option">
                    <div className="product__details__option__size">
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
                  </div>

                  <div className="product__details__cart__option">
                    <span>Số lượng:</span>
                    <div className="quantity">
                      <div className="pro-qty">
                        <span
                          className="fa fa-angle-up dec qtybtn"
                          onClick={() =>
                            this.setState({
                              productSelected: {
                                ...this.state.productSelected,
                                quantity:
                                  this.state.productSelected.quantity + 1,
                              },
                            })
                          }
                        ></span>
                        <input
                          className="form-control"
                          type="text"
                          value={productSelected.quantity}
                          onChange={(e) =>
                            this.setState({
                              productSelected: {
                                ...this.state.productSelected,
                                quantity: e.target.value,
                              },
                            })
                          }
                        />
                        <span
                          className="fa fa-angle-down inc qtybtn"
                          onClick={() =>
                            productSelected.quantity > 1 &&
                            this.setState({
                              productSelected: {
                                ...this.state.productSelected,
                                quantity:
                                  this.state.productSelected.quantity - 1,
                              },
                            })
                          }
                        ></span>
                      </div>
                    </div>
                  </div>
                  <div className="card_area d-flex align-items-center">
                    <a
                      className="primary-btn"
                      href="/"
                      onClick={this.addProductToCart}
                    >
                      Thêm vào giỏ hàng
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*================End Single Product Area =================*/}
        {/*================Product Description Area =================*/}
        <section className="product_description_area">
          <div className="container">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item">
                <a
                  className="nav-link"
                  id="home-tab"
                  data-toggle="tab"
                  href="#home"
                  role="tab"
                  aria-controls="home"
                  aria-selected="true"
                >
                  Thông tin chi tiết
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  id="contact-tab"
                  data-toggle="tab"
                  href="#contact"
                  role="tab"
                  aria-controls="contact"
                  aria-selected="false"
                >
                  Bình luận
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active"
                  id="review-tab"
                  data-toggle="tab"
                  href="#review"
                  role="tab"
                  aria-controls="review"
                  aria-selected="false"
                >
                  Đánh giá
                </a>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <p>
                  Beryl Cook is one of Britain’s most talented and amusing
                  artists .Beryl’s pictures feature women of all shapes and
                  sizes enjoying themselves .Born between the two world wars,
                  Beryl Cook eventually left Kendrick School in Reading at the
                  age of 15, where she went to secretarial school and then into
                  an insurance office. After moving to London and then Hampton,
                  she eventually married her next door neighbour from Reading,
                  John Cook. He was an officer in the Merchant Navy and after he
                  left the sea in 1956, they bought a pub for a year before John
                  took a job in Southern Rhodesia with a motor company. Beryl
                  bought their young son a box of watercolours, and when showing
                  him how to use it, she decided that she herself quite enjoyed
                  painting. John subsequently bought her a child’s painting set
                  for her birthday and it was with this that she produced her
                  first significant work, a half-length portrait of a
                  dark-skinned lady with a vacant expression and large drooping
                  breasts. It was aptly named ‘Hangover’ by Beryl’s husband and
                </p>
                <p>
                  It is often frustrating to attempt to plan meals that are
                  designed for one. Despite this fact, we are seeing more and
                  more recipe books and Internet websites that are dedicated to
                  the act of cooking for one. Divorce and the death of spouses
                  or grown children leaving for college are all reasons that
                  someone accustomed to cooking for more than one would suddenly
                  need to learn how to adjust all the cooking practices utilized
                  before into a streamlined plan of cooking that is more
                  efficient for one person creating less
                </p>
              </div>
              <div
                className="tab-pane fade"
                id="contact"
                role="tabpanel"
                aria-labelledby="contact-tab"
              >
                <div className="row">
                  <div className="col-lg-6">
                    <div className="comment_list">
                      <div className="review_item">
                        <div className="media">
                          <div className="d-flex">
                            <img
                              src="/assets/img/product/review-1.png"
                              alt=""
                            />
                          </div>
                          <div className="media-body">
                            <h4>Blake Ruiz</h4>
                            <h5>12th Feb, 2018 at 05:56 pm</h5>
                            <a className="Trả lời_btn" href="#">
                              Trả lời
                            </a>
                          </div>
                        </div>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo
                        </p>
                      </div>
                      <div className="review_item Trả lời">
                        <div className="media">
                          <div className="d-flex">
                            <img
                              src="/assets/img/product/review-2.png"
                              alt=""
                            />
                          </div>
                          <div className="media-body">
                            <h4>Blake Ruiz</h4>
                            <h5>12th Feb, 2018 at 05:56 pm</h5>
                            <a className="Trả lời_btn" href="#">
                              Trả lời
                            </a>
                          </div>
                        </div>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo
                        </p>
                      </div>
                      <div className="review_item">
                        <div className="media">
                          <div className="d-flex">
                            <img
                              src="/assets/img/product/review-3.png"
                              alt=""
                            />
                          </div>
                          <div className="media-body">
                            <h4>Blake Ruiz</h4>
                            <h5>12th Feb, 2018 at 05:56 pm</h5>
                            <a className="Trả lời_btn" href="#">
                              Trả lời
                            </a>
                          </div>
                        </div>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="review_box">
                      <h4>Thêm bình luận</h4>
                      <form
                        className="row contact_form"
                        action="contact_process.php"
                        method="post"
                        id="contactForm"
                        noValidate="novalidate"
                      >
                        <div className="col-md-12">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              id="name"
                              name="name"
                              placeholder="Tên của bạn"
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <input
                              type="email"
                              className="form-control"
                              id="email"
                              name="email"
                              placeholder="Địa chỉ email"
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              id="number"
                              name="number"
                              placeholder="Số điện thoại"
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <textarea
                              className="form-control"
                              name="message"
                              id="message"
                              rows={1}
                              placeholder="Lời nhắn"
                              defaultValue={""}
                            />
                          </div>
                        </div>
                        <div className="col-md-12 text-right">
                          <button
                            type="submit"
                            value="submit"
                            className="btn primary-btn"
                          >
                            Gửi
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade show active"
                id="review"
                role="tabpanel"
                aria-labelledby="review-tab"
              >
                <div className="row">
                  <div className="col-lg-6">
                    <div className="row total_rate">
                      <div className="col-6">
                        <div className="box_total">
                          <h5>Điểm đánh giá</h5>
                          <h4>4.0</h4>
                          <h6>(03 đánh giá)</h6>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="rating_list">
                          <h3>Dựa trên 3 đánh giá</h3>
                          <ul className="list">
                            <li>
                              <a href="#">
                                5 Star <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" /> 01
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                4 Star <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" /> 01
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                3 Star <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" /> 01
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                2 Star <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" /> 01
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                1 Star <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" /> 01
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="review_list">
                      <div className="review_item">
                        <div className="media">
                          <div className="d-flex">
                            <img
                              src="/assets/img/product/review-1.png"
                              alt=""
                            />
                          </div>
                          <div className="media-body">
                            <h4>Blake Ruiz</h4>
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                          </div>
                        </div>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo
                        </p>
                      </div>
                      <div className="review_item">
                        <div className="media">
                          <div className="d-flex">
                            <img
                              src="/assets/img/product/review-2.png"
                              alt=""
                            />
                          </div>
                          <div className="media-body">
                            <h4>Blake Ruiz</h4>
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                          </div>
                        </div>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo
                        </p>
                      </div>
                      <div className="review_item">
                        <div className="media">
                          <div className="d-flex">
                            <img
                              src="/assets/img/product/review-3.png"
                              alt=""
                            />
                          </div>
                          <div className="media-body">
                            <h4>Blake Ruiz</h4>
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                          </div>
                        </div>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="review_box">
                      <h4>Thêm đánh giá</h4>
                      <p>Đánh giá của bạn:</p>
                      <ul className="list">
                        <li>
                          <a href="#">
                            <i className="fa fa-star" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fa fa-star" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fa fa-star" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fa fa-star" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fa fa-star" />
                          </a>
                        </li>
                      </ul>
                      <p>Nổi bật</p>
                      <form
                        className="row contact_form"
                        action="contact_process.php"
                        method="post"
                        id="contactForm"
                        noValidate="novalidate"
                      >
                        <div className="col-md-12">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              id="name"
                              name="name"
                              placeholder="Tên của bạn"
                              onFocus="this.placeholder = ''"
                              onBlur="this.placeholder = 'Tên của bạn'"
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <input
                              type="email"
                              className="form-control"
                              id="email"
                              name="email"
                              placeholder="Địa chỉ email"
                              onFocus="this.placeholder = ''"
                              onBlur="this.placeholder = 'Địa chỉ email'"
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              id="number"
                              name="number"
                              placeholder="Số điện thoại"
                              onFocus="this.placeholder = ''"
                              onBlur="this.placeholder = 'Số điện thoại'"
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <textarea
                              className="form-control"
                              name="message"
                              id="message"
                              rows={1}
                              placeholder="Review"
                              onFocus="this.placeholder = ''"
                              onBlur="this.placeholder = 'Đánh giá'"
                              defaultValue={""}
                            />
                          </div>
                        </div>
                        <div className="col-md-12 text-right">
                          <button
                            type="submit"
                            value="submit"
                            className="primary-btn"
                          >
                            Gửi
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*================End Product Description Area =================*/}
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
                      <a href="#">
                        <img src="/assets/img/r1.jpg" alt="" />
                      </a>
                      <div className="desc">
                        <a href="#" className="title">
                          Black lace Heels
                        </a>
                        <div className="price">
                          <h6>$189.00</h6>
                          <h6 className="l-through">$210.00</h6>
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
                          <h6>$189.00</h6>
                          <h6 className="l-through">$210.00</h6>
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
                          <h6>$189.00</h6>
                          <h6 className="l-through">$210.00</h6>
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
                          <h6>$189.00</h6>
                          <h6 className="l-through">$210.00</h6>
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
                          <h6>$189.00</h6>
                          <h6 className="l-through">$210.00</h6>
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
                          <h6>$189.00</h6>
                          <h6 className="l-through">$210.00</h6>
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
                          <h6>$189.00</h6>
                          <h6 className="l-through">$210.00</h6>
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
                          <h6>$189.00</h6>
                          <h6 className="l-through">$210.00</h6>
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
                          <h6>$189.00</h6>
                          <h6 className="l-through">$210.00</h6>
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

export default ProductDetailPage;
