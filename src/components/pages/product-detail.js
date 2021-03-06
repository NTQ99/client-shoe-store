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
      }).catch(error => this.openResponseDialog("error", error.response.data.error.message));
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

  addProductToCart = async (e) => {
    e.preventDefault();
    if (this.state.productSelected.stock === 0) {
      this.openResponseDialog("error", "S??? l?????ng s???n ph???m ???? h???t!");
      return;
    } else if (this.state.productSelected.stock < this.state.productSelected.quantity) {
      this.openResponseDialog("error", `S??? l?????ng s???n ph???m t???i ??a b???n c?? th??? ?????t l?? ${this.state.productSelected.stock} !`);
      return;
    }
    this.setState({addToCartStatus: "wait"});
    await cartService.addToCart(
      this.state.productSelected.productId,
      this.state.productSelected.quantity,
      this.state.productDetail.productName + ", size " + this.state.productSelected.size + ", " + this.state.productSelected.color 
      );
    this.setState({addToCartStatus: "done"});
    setTimeout(() => this.setState({addToCartStatus: ""}), 2000);
    this.setState({
      numOfcart: this.state.numOfcart + this.state.productSelected.quantity,
    });
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
      addToCartStatus,
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
                <h1>Chi ti???t s???n ph???m</h1>
                <nav className="d-flex align-items-center">
                  <a href="/">
                    Trang ch???
                    <span className="lnr lnr-arrow-right" />
                  </a>
                  <a href="#">
                    S???n ph???m
                    <span className="lnr lnr-arrow-right" />
                  </a>
                  <a href="single-product.html">Chi ti???t</a>
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
                        <span>Danh m???c</span> : {productDetail.category}
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span>S??? l?????ng c??n</span> : {productSelected.stock}
                      </a>
                    </li>
                  </ul>
                  <p>{productDetail.productDetail.length>400?productDetail.productDetail.slice(0,400) + "...":productDetail.productDetail}</p>
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
                      <span>M??u s???c:</span>
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
                    <span>S??? l?????ng:</span>
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
                      Th??m v??o gi??? h??ng
                    </a>
                    {addToCartStatus === "wait" && <div>
                      <i className="d-flex justify-content-center align-items-center bi bi-arrow-clockwise fa-spin"></i>
                    </div>}
                    {addToCartStatus === "done" && <div className="text-success">
                      <i className="bi bi-cart-check-fill text-success mr-2"></i>
                      {`???? th??m ${productSelected.quantity} s???n ph???m v??o gi??? h??ng`}
                    </div>}
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
                  Th??ng tin chi ti???t
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
                  B??nh lu???n
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
                  ????nh gi??
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
                <p>{productDetail.productDetail}</p>
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
                            <a className="Tr??? l???i_btn" href="#">
                              Tr??? l???i
                            </a>
                          </div>
                        </div>
                        <p>
                          S???n ph???m ch???t l?????ng t???t, m???u m?? ??a d???ng!
                        </p>
                      </div>
                      <div className="review_item Tr??? l???i">
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
                            <a className="Tr??? l???i_btn" href="#">
                              Tr??? l???i
                            </a>
                          </div>
                        </div>
                        <p>
                          S???n ph???m r???t ????ng mua!
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
                            <a className="Tr??? l???i_btn" href="#">
                              Tr??? l???i
                            </a>
                          </div>
                        </div>
                        <p>
                          Gi??y ?????p l???m!
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="review_box">
                      <h4>Th??m b??nh lu???n</h4>
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
                              placeholder="T??n c???a b???n"
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
                              placeholder="?????a ch??? email"
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
                              placeholder="S??? ??i???n tho???i"
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
                              placeholder="L???i nh???n"
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
                            G???i
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
                          <h5>??i???m ????nh gi??</h5>
                          <h4>4.0</h4>
                          <h6>(03 ????nh gi??)</h6>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="rating_list">
                          <h3>D???a tr??n 3 ????nh gi??</h3>
                          <ul className="list">
                            <li>
                              <a href="#">
                                5 Sao <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" /> 01
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                4 Sao <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" /> 01
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                3 Sao <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" /> 01
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                2 Sao <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" /> 01
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                1 Sao <i className="fa fa-star" />
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
                        S???n ph???m ch???t l?????ng t???t, m???u m?? ??a d???ng!
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
                        S???n ph???m r???t ????ng mua!
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
                        S???n ph???m r???t ????ng mua!
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="review_box">
                      <h4>Th??m ????nh gi??</h4>
                      <p>????nh gi?? c???a b???n:</p>
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
                      <p>N???i b???t</p>
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
                              placeholder="T??n c???a b???n"
                              onFocus="this.placeholder = ''"
                              onBlur="this.placeholder = 'T??n c???a b???n'"
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
                              placeholder="?????a ch??? email"
                              onFocus="this.placeholder = ''"
                              onBlur="this.placeholder = '?????a ch??? email'"
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
                              placeholder="S??? ??i???n tho???i"
                              onFocus="this.placeholder = ''"
                              onBlur="this.placeholder = 'S??? ??i???n tho???i'"
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
                              onBlur="this.placeholder = '????nh gi??'"
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
                            G???i
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
        <Footer />
      </div>
    );
  }
}

export default ProductDetailPage;
