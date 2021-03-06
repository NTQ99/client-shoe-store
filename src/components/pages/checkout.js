import React, { Component } from "react";

import AuthService from "../../service/auth.service";
import authHeader from "../../service/auth-header";
import cartService from "../../service/cart.service";
import productService from "../../service/product.service";
import customerService from "../../service/customer.service";
import { addressData } from "../../config/dvhcvn";
import * as helper from "../../commons/helper";

import Header from "../layouts/shoe-store/header";
import Footer from "../layouts/shoe-store/footer";

import {
  Card,
  Form,
  Col,
  Row,
  Dropdown,
  InputGroup,
  Button,
} from "react-bootstrap";
import { now } from "moment";
import orderService from "../../service/order.service";
import GeneralDialog from "../layouts/modal/GeneralDialog";
import SimpleReactValidator from "simple-react-validator";
import userService from "../../service/user.service";

class CheckoutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderCode: null,
      orderTime: now(),
      numOfCart: 0,
      notSuccess: true,
      notAuth: true,
      products: [],
      deliveryTo: {},
      addressList: { district: [], ward: [] },
    };
    SimpleReactValidator.addLocale("vi", {
      required: "Không được bỏ trống!",
      email: "Email không hợp lệ.",
      url: "Đường dẫn không hợp lệ."
    });
    this.validator = new SimpleReactValidator({
      autoForceUpdate: this,
      locale: "vi",
      element: (message) => (
        <div className="fv-plugins-bootstrap fv-plugins-message-container">
          <div className="fv-help-block">{message}</div>
        </div>
      ),
      validators: {
        phone: {
          message: 'Số điện thoại không đúng định dạng!',
          rule: (val, params, validator) => {
            return validator.helpers.testRegex(val,/(\+84|84|0)+([0-9]{9})$/i) && params.indexOf(val) === -1
          },
          required: true  // optional
        }
      }
    });
    this.onAddressSelect = helper.onAddressSelect.bind(this);
  }

  async componentDidMount() {
    let userInfo = JSON.parse(localStorage.getItem("user"));
    if (authHeader()) {
      this.setState({
        notAuth: false,
        customerFirstName: userInfo.firstName,
        customerLastName: userInfo.lastName,
        customerEmail: userInfo.email,
        customerPhone: userInfo.phone,
      });
      await customerService.getCustomerInfo(userInfo.customerCode).then(res => {
        if (res.data.error.statusCode !== 100) return;
        if (!res.data.data) return;
        if (!res.data.data.customerAddresses) return;
        let defaultAddress = res.data.data.customerAddresses[res.data.data.defaultAddressId];
        if (!defaultAddress) return;

        let provinceObject = addressData.find((province) => province.name === defaultAddress.province);
        let districtObject = provinceObject.level2s.find((district) => district.name === defaultAddress.district);
        let wardObject = districtObject.level3s.find((ward) => ward.name === defaultAddress.ward);
        
        let addressListRow = {
          district: provinceObject.level2s,
          ward: districtObject.level3s
        };

        defaultAddress = {
          ...defaultAddress,
          provinceId: provinceObject.level1_id,
          districtId: districtObject.level2_id,
          wardId: wardObject.level3_id
        }
        this.setState({deliveryTo: defaultAddress, addressList: addressListRow});
      });
    }
    await this.getCart();
  }

  getCart = async () => {
    this.setState({ products: [], totalMoney: 0 });
    let currentCart = [];
    let totalMoney = 0;
    currentCart = await cartService.getCart();
    if (currentCart.length === 0) {
      this.setState({
        dialogProps: {
          show: true,
          handleOk: () => this.setState({dialogProps:{...this.state.dialogProps, show: false}}),
          variant: "error",
          message: "Giỏ hàng đang trống!"
        }
      });
      setTimeout(() => window.location.href = "/home", 1000);
    }
    currentCart.forEach((item) => {
      productService.getProductById(item.productId).then((res) => {
        totalMoney += res.data.data.price * item.quantity;
        this.setState({
          products: [
            ...this.state.products,
            { data: res.data.data, ...item },
          ],
          totalMoney: totalMoney,
        });
      });
    });
  };

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

  login = (e) => {
    e.preventDefault();
    let username = e.target.username.value;
    let password = e.target.password.value;
    AuthService.login(username, password).then((res) => {
      if (res.error.statusCode === 200) {
        this.openResponseDialog("success", res.error.message);
        setTimeout(() => {
          if (
            userService.getRoles().includes("ROLE_SELLER") ||
            userService.getRoles().includes("ROLE_ADMIN")
          ) {
            window.location.href = "/order";
          } else {
            window.location.reload();
          }
        }, 1000);
      } else this.openResponseDialog("error", res.error.message);
    }).catch(error => this.openResponseDialog("error", error.response.data.error.message));
  };

  onOrderSubmit = async () => {
    if (this.validator.allValid()) {
      this.setState({btnLoading: true});
      await orderService.createOrder({
        customerName: (this.state.customerFirstName.trim() + " " + this.state.customerLastName.trim()).trim(),
        customerPhone: this.state.customerPhone,
        customerEmail: this.state.customerEmail,
        products: this.state.products,
        deliveryTo: this.state.deliveryTo,
        totalPrice: this.state.totalMoney,
        codAmount: this.state.totalMoney
      }).then(res => {
        if (res.data.error.statusCode === 102) {
          this.openResponseDialog("success", res.data.error.message);
          cartService.clearCart();
          setTimeout(() => {
            this.setState({
              notSuccess: false, numOfCart: this.state.numOfCart + 1, orderCode: res.data.data.orderCode,
              dialogProps: {
                show: false
              }
            });
          }, 1000)
        } else this.openResponseDialog("error", res.data.error.message);
      }).catch(error => this.openResponseDialog("error", error.response.data.error.message));
    } else {
      this.validator.showMessages();
    }
  }

  render() {
    const {
      notSuccess,
      notAuth,
      numOfCart,
      totalMoney,
      deliveryTo,
      addressList,
      products,
      orderCode,
      orderTime,
      customerFirstName,
      customerLastName,
      customerPhone,
      customerEmail,
      dialogProps
    } = this.state;
    return (
      <div>
        <GeneralDialog { ...dialogProps } />
        <Header numOfCart={numOfCart} />
        {/* Start Banner Area */}
        <section className="banner-area organic-breadcrumb">
          <div className="container">
            <div className="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
              <div className="col-first">
                <h1>Thanh toán</h1>
                <nav className="d-flex align-items-center">
                  <a href="/home">
                    Trang chủ
                    <span className="lnr lnr-arrow-right" />
                  </a>
                  <a href="/checkout">Thanh toán</a>
                </nav>
              </div>
            </div>
          </div>
        </section>
        {/* End Banner Area */}
        {/*================Checkout Area =================*/}
        {notSuccess && (
          <section className="checkout_area section_gap">
            <div className="container">
              {notAuth && (
                <div className="returning_customer">
                  <div className="check_title">
                    <h2>
                      Bạn đã có tài khoản? <a href="/login">Đăng nhập</a>
                    </h2>
                  </div>
                  <p>
                    Nếu bạn đã có tài khoản, vui lòng đăng nhập. Nếu bạn là
                    khách hàng mới, vui lòng bỏ qua.
                  </p>
                  <Form onSubmit={this.login} className="row contact_form">
                    <Row className="col-md-12">
                      <Form.Group as={Col} className="mb-3">
                        <Form.Control
                          type="text"
                          id="username"
                          name="username"
                          placeholder="Tài khoản"
                          autoComplete="off"
                        />
                      </Form.Group>
                      <Form.Group as={Col} className="mb-3">
                        <Form.Control
                          type="password"
                          id="password"
                          name="password"
                          placeholder="Mật khẩu"
                          autoComplete="off"
                        />
                      </Form.Group>
                    </Row>
                    <div className="col-md-12 form-group">
                      <button type="submit" className="primary-btn">
                        Đăng nhập
                      </button>
                      <div className="creat_account">
                        <input type="checkbox" id="f-option" name="selector" />
                        <label htmlFor="f-option">Ghi nhớ đăng nhập</label>
                      </div>
                      <a className="lost_pass" href="/reset-password">
                        Quên mật khẩu?
                      </a>
                    </div>
                  </Form>
                </div>
              )}
              <div className="billing_details">
                <div className="row">
                  <Form as={Col}>
                    <h3>Thông tin khách hàng</h3>
                    <Col className="mb-5">
                      <Row>
                        <Form.Group as={Col} className="mb-3" controlId="customerFirstName" onChange={(e) =>
                            this.setState({ customerFirstName: e.target.value })
                          }>
                          <Form.Label className="required">Họ</Form.Label>
                          <Form.Control
                            defaultValue={customerFirstName}
                            type="text"
                            placeholder="Họ"
                            autoComplete="off"
                          />
                          {this.validator.message(
                            "customerFirstName",
                            this.state.customerFirstName,
                            "required"
                          )}
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3" controlId="customerLastName" onChange={(e) =>
                            this.setState({ customerLastName: e.target.value })
                          }>
                          <Form.Label className="required">Tên</Form.Label>
                          <Form.Control
                            defaultValue={customerLastName}
                            type="text"
                            placeholder="Tên"
                            autoComplete="off"
                          />
                          {this.validator.message(
                            "customerLastName",
                            this.state.customerLastName,
                            "required"
                          )}
                        </Form.Group>
                      </Row>
                      <Row>
                        <Form.Group
                          as={Col}
                          className="mb-3"
                          controlId="customerPhone"
                          onChange={(e) =>
                            this.setState({ customerPhone: e.target.value })
                          }
                        >
                          <Form.Label className="required">
                            Số điện thoại
                          </Form.Label>
                          <Form.Control
                            defaultValue={customerPhone}
                            type="phone"
                            placeholder="0123456789"
                            autoComplete="off"
                          />
                          {this.validator.message(
                            "customerPhone",
                            this.state.customerPhone,
                            "phone"
                          )}
                        </Form.Group>
                        <Form.Group
                          as={Col}
                          className="mb-3"
                          controlId="customerEmail"
                          onChange={(e) =>
                            this.setState({ customerEmail: e.target.value })
                          }
                        >
                          <Form.Label className="required">Email</Form.Label>
                          <Form.Control
                            defaultValue={customerEmail}
                            type="email"
                            placeholder="example@domain.com"
                            autoComplete="off"
                          />
                          {this.validator.message(
                            "customerEmail",
                            this.state.customerEmail,
                            "required|email"
                          )}
                        </Form.Group>
                      </Row>
                    </Col>
                    <h3>Địa chỉ giao hàng</h3>
                    <Col className="mb-5">
                      <Row>
                        <Form.Group
                          as={Col}
                          controlId="addressProvince"
                          className="mb-3"
                          onChange={this.onAddressSelect}
                        >
                          <Form.Label className="required">
                            Tỉnh/Thành phố
                          </Form.Label>
                          <Form.Control
                            as="select"
                            value={deliveryTo.provinceId || "-1"}
                          >
                            <option value={"-1"}>Chọn</option>
                            {addressData.map((province) => (
                              <option value={province.level1_id}>
                                {province.name}
                              </option>
                            ))}
                          </Form.Control>
                          {this.validator.message(
                            "addressProvince",
                            deliveryTo.provinceId,
                            "required"
                          )}
                        </Form.Group>
                        <Form.Group
                          as={Col}
                          controlId="addressDistrict"
                          className="mb-3"
                          onChange={this.onAddressSelect}
                        >
                          <Form.Label className="required">
                            Quận/Huyện
                          </Form.Label>
                          <Form.Control
                            as="select"
                            value={deliveryTo.districtId}
                          >
                            <option value={"-1"}>Chọn</option>
                            {addressList.district.map((district) => (
                              <option value={district.level2_id}>
                                {district.name}
                              </option>
                            ))}
                          </Form.Control>
                          {this.validator.message(
                            "addressDistrict",
                            deliveryTo.districtId,
                            "required"
                          )}
                        </Form.Group>
                        <Form.Group
                          as={Col}
                          controlId="addressWard"
                          className="mb-3"
                          onChange={this.onAddressSelect}
                        >
                          <Form.Label className="required">
                            Xã/Phường
                          </Form.Label>
                          <Form.Control as="select" value={deliveryTo.wardId}>
                            <option value={"-1"}>Chọn</option>
                            {addressList.ward.map((ward) => (
                              <option value={ward.level3_id}>
                                {ward.name}
                              </option>
                            ))}
                          </Form.Control>
                          {this.validator.message(
                            "addressWard",
                            deliveryTo.wardId,
                            "required"
                          )}
                        </Form.Group>
                      </Row>
                      <Row>
                        <Form.Group
                          as={Col}
                          controlId="addressDetail"
                          className="mb-3"
                          onBlur={this.onAddressSelect}
                        >
                          <Form.Label className="required">
                            Địa chỉ chi tiết
                          </Form.Label>
                          <Form.Control
                            defaultValue={deliveryTo.detail}
                            placeholder="Số nhà, tên tòa nhà, tên đường, tên khu vực"
                          />
                          {this.validator.message(
                            "addressDetail",
                            deliveryTo.detail,
                            "required"
                          )}
                        </Form.Group>
                      </Row>
                    </Col>
                  </Form>
                  <div className="col-lg-4">
                    <div
                      className="order_box"
                      onClick={(e) => e.preventDefault()}
                    >
                      <h2>Giỏ hàng</h2>
                      <ul className="list">
                        <li>
                          <a href="/">
                            Sản phẩm <span>Thành tiền</span>
                          </a>
                        </li>
                        {products.map((item) => {console.log(item); return (
                          <li>
                            <a
                              href="/"
                              className="d-flex justify-content-between"
                            >
                              <div className="text-truncate">
                                {item.data.shortTitle}
                              </div>
                              <div className="middle ml-2 text-left">
                                x {item.quantity}
                              </div>{" "}
                              <span className="last">
                                {(
                                  item.data.price * item.quantity
                                ).toLocaleString("it-IT", {
                                  style: "currency",
                                  currency: "VND",
                                })}
                              </span>
                            </a>
                          </li>
                        )})}
                      </ul>
                      <ul className="list list_2">
                        <li>
                          <a href="/">
                            Tổng{" "}
                            <span>
                              {(totalMoney || 0).toLocaleString("it-IT", {
                                style: "currency",
                                currency: "VND",
                              })}
                            </span>
                          </a>
                        </li>
                        <li>
                          <a href="/">
                            Phí vận chuyển <span>Tiêu chuẩn: 0 VND</span>
                          </a>
                        </li>
                        <li>
                          <a href="/">
                            Phải trả{" "}
                            <span>
                              {(totalMoney || 0).toLocaleString("it-IT", {
                                style: "currency",
                                currency: "VND",
                              })}
                            </span>
                          </a>
                        </li>
                        <li>
                          <a href="/">Phương thức thanh toán</a>
                        </li>
                      </ul>
                      <div className="payment_item">
                        <p>
                          <div className="shipping_box">
                            <ul className="list">
                              <li>
                                <a href="/" className="checkout disabled">
                                  Tài khoản ngân hàng
                                </a>
                              </li>
                              <li className="active">
                                <a href="/" className="checkout">
                                  Thanh toán khi nhận hàng
                                </a>
                              </li>
                            </ul>
                          </div>
                        </p>
                      </div>
                      <a
                        className="primary-btn"
                        href="/"
                        onClick={this.onOrderSubmit}
                      >
                        Đặt hàng
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
        {!notSuccess && (
          <section className="order_details section_gap">
            <div className="container">
              <h3 className="title_confirmation">
                Cảm ơn. Đơn hàng của bạn đã được ghi nhận.
              </h3>
              <div className="row order_d_inner">
                <div className="col-lg-4">
                  <div className="details_item">
                    <h4>Thông tin đơn hàng</h4>
                    <ul className="list">
                      <li>
                        <a href="#">
                          <span>Mã đơn hàng</span> : {orderCode}
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <span>Thời gian đặt hàng</span> :{" "}
                          {helper.getTimeFormat(orderTime, "HH:MM, dd/mm/yyyy")}
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <span>Tổng tiền thanh toán</span> :{" "}
                          {(totalMoney || 0).toLocaleString("it-IT", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <span>Phương thức thanh toán</span> : Thanh toán khi
                          nhận hàng
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="details_item">
                    <h4>Thông tin người nhận</h4>
                    <ul className="list">
                      <li>
                        <a href="#">
                          <span>Họ</span> : {customerFirstName}
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <span>Tên</span> : {customerLastName}
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <span>Số điện thoại</span> : {customerPhone}
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <span>Email</span> : {customerEmail}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="details_item">
                    <h4>Địa chỉ nhận hàng</h4>
                    <ul className="list">
                      <li>
                        <a href="#">
                          <span>Tỉnh/Thành phố</span> : {deliveryTo.province}
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <span>Quận/Huyện</span> : {deliveryTo.district}
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <span>Xa/Phường</span> : {deliveryTo.ward}
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <span>Địa chỉ chi tiết</span> : {deliveryTo.detail}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="order_details_table">
                <h2>Chi tiết đơn hàng</h2>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Sản phẩm</th>
                        <th scope="col">Số lượng</th>
                        <th scope="col">Thành tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((item) => (
                        <tr>
                          <td>
                            <p>{item.data.shortTitle}</p>
                          </td>
                          <td>
                            <p>x {item.quantity}</p>
                          </td>
                          <td>
                            <p>
                              {(item.data.price * item.quantity).toLocaleString(
                                "it-IT",
                                {
                                  style: "currency",
                                  currency: "VND",
                                }
                              )}
                            </p>
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <td>
                          <h4>Tổng</h4>
                        </td>
                        <td>
                          <p />
                        </td>
                        <td>
                          <p>
                            {(totalMoney || 0).toLocaleString("it-IT", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h4>Shipping</h4>
                        </td>
                        <td>
                          <p />
                        </td>
                        <td>
                          <p>0 VND</p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h4>Total</h4>
                        </td>
                        <td>
                          <p />
                        </td>
                        <td>
                          <p>
                            {(totalMoney || 0).toLocaleString("it-IT", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        )}
        <Footer />
      </div>
    );
  }
}

export default CheckoutPage;
