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

class OrderDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMsg: null,
      orderCode: null,
      numOfCart: 0,
      notSuccess: true,
      notAuth: true,
      products: [],
      deliveryTo: {},
      addressList: { district: [], ward: [] },
    };
    this.onAddressSelect = helper.onAddressSelect.bind(this);
  }

  componentDidMount() {
    let urlParams = new URLSearchParams(this.props.location.search.substring(1));
    let params = Object.fromEntries(urlParams);
    orderService.getOrderByCode(params.orderid,params.phone).then(res => {
      console.log(res)
      if (!res.data) return;
      if (!res.data.error) return;
      if (res.data.error.statusCode === 100) {
        let name = res.data.data.customerName.split(" ", 2);
        this.setState({...res.data.data, customerFirstName: name[0], customerLastName: name[1]});
      } else {
        this.setState({errorMsg: res.data.error.message});
      }
    })
  }

  render() {
    const {
      numOfCart,
      totalPrice,
      deliveryTo,
      errorMsg,
      status,
      products,
      orderCode,
      createdAt,
      customerFirstName,
      customerLastName,
      customerPhone,
      customerEmail
    } = this.state;
    return (
      <div>
        <Header numOfCart={numOfCart} />
        {/* Start Banner Area */}
        <section className="banner-area organic-breadcrumb">
          <div className="container">
            <div className="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
              <div className="col-first">
                <h1>Thông tin đơn hàng</h1>
                <nav className="d-flex align-items-center">
                  <a href="/home">
                    Trang chủ
                    <span className="lnr lnr-arrow-right" />
                  </a>
                  <a href="/home">Thông tin đơn hàng</a>
                </nav>
              </div>
            </div>
          </div>
        </section>
        {/* End Banner Area */}
        {/*================Order Detail Area =================*/}
        <section className="order_details section_gap">
          {errorMsg && (
            <h3 className="title_confirmation" style={{color: "#d73211"}}>
              {errorMsg}
            </h3>
          )}
          {!errorMsg && (
            <div className="container">
              <div className="track" id="trackingStatus">
                  <div className="step active">
                    <span className="icon"> 
                      <svg enable-background="new 0 0 32 32" viewBox="0 0 32 32" x="0" y="0" className="svg-order-icon"><g><path d="m5 3.4v23.7c0 .4.3.7.7.7.2 0 .3 0 .3-.2.5-.4 1-.5 1.7-.5.9 0 1.7.4 2.2 1.1.2.2.3.4.5.4s.3-.2.5-.4c.5-.7 1.4-1.1 2.2-1.1s1.7.4 2.2 1.1c.2.2.3.4.5.4s.3-.2.5-.4c.5-.7 1.4-1.1 2.2-1.1.9 0 1.7.4 2.2 1.1.2.2.3.4.5.4s.3-.2.5-.4c.5-.7 1.4-1.1 2.2-1.1.7 0 1.2.2 1.7.5.2.2.3.2.3.2.3 0 .7-.4.7-.7v-23.7z" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3"></path><g><line fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" x1="10" x2="22" y1="11.5" y2="11.5"></line><line fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" x1="10" x2="22" y1="18.5" y2="18.5"></line></g></g></svg>
                    </span>
                    <span className="text">Đã đặt</span>
                  </div>
                  <div className={`step active${(status === "wait_confirm")? " current": ""}`}>
                    <span className="icon" style={{fontSize: '2em'}}>
                      <i className="svg-order-icon fa fa-check"></i>
                    </span>
                    <span className="text">Đã xác nhận</span>
                  </div>
                  <div className={`step${(status === "await_trans")? " active current": (status === "success" || status === "fail")? " active": (status === "canceled")? " deactive": ""}`}>
                    <span className="icon">
                      <svg enable-background="new 0 0 32 32" viewBox="0 0 32 32" x="0" y="0" className="svg-order-icon"><g><line fill="none" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3" x1="18.1" x2="9.6" y1="20.5" y2="20.5"></line><circle cx="7.5" cy="23.5" fill="none" r="4" stroke-miterlimit="10" stroke-width="3"></circle><circle cx="20.5" cy="23.5" fill="none" r="4" stroke-miterlimit="10" stroke-width="3"></circle><line fill="none" stroke-miterlimit="10" stroke-width="3" x1="19.7" x2="30" y1="15.5" y2="15.5"></line><polyline fill="none" points="4.6 20.5 1.5 20.5 1.5 4.5 20.5 4.5 20.5 18.4" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3"></polyline><polyline fill="none" points="20.5 9 29.5 9 30.5 22 24.7 22" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3"></polyline></g></svg>
                    </span>
                    <span className="text">Đang vận chuyển</span>
                  </div>
                  {status !== "canceled" && status !== "fail" && (
                    <div className={`step${(status === "success")? " active current": ""}`}>
                      <span className="icon">
                        <svg enable-background="new 0 0 32 32" viewBox="0 0 32 32" x="0" y="0" className="svg-order-icon"><g><polygon fill="none" points="2 28 2 19.2 10.6 19.2 11.7 21.5 19.8 21.5 20.9 19.2 30 19.1 30 28" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3"></polygon><polyline fill="none" points="21 8 27 8 30 19.1" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3"></polyline><polyline fill="none" points="2 19.2 5 8 11 8" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3"></polyline><line fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3" x1="16" x2="16" y1="4" y2="14"></line><path d="m20.1 13.4-3.6 3.6c-.3.3-.7.3-.9 0l-3.6-3.6c-.4-.4-.1-1.1.5-1.1h7.2c.5 0 .8.7.4 1.1z" stroke="none"></path></g></svg>
                      </span>
                      <span className="text">Giao hàng thành công</span>
                    </div>
                  )}
                  {(status === "canceled" || status === "fail") && (
                    <div className="step deactive current">
                      <span className="icon">
                        <svg enable-background="new 0 0 32 32" viewBox="0 0 32 32" x="0" y="0" className="svg-order-icon"><g><g><path d="m5 3.4v23.7c0 .4.3.7.7.7.2 0 .3 0 .3-.2.5-.4 1-.5 1.7-.5.9 0 1.7.4 2.2 1.1.2.2.3.4.5.4s.3-.2.5-.4c.5-.7 1.4-1.1 2.2-1.1s1.7.4 2.2 1.1c.2.2.3.4.5.4s.3-.2.5-.4c.5-.7 1.4-1.1 2.2-1.1.9 0 1.7.4 2.2 1.1.2.2.3.4.5.4s.3-.2.5-.4c.5-.7 1.4-1.1 2.2-1.1.7 0 1.2.2 1.7.5.2.2.3.2.3.2.3 0 .7-.4.7-.7v-23.7z" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3"></path></g><line fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3" x1="16" x2="16" y1="9" y2="15"></line><circle cx="16" cy="20.5" r="2" stroke="none"></circle></g></svg>
                      </span>
                      <span className="text">{(status === "canceled")? "Đã hủy" : "Giao hàng thất bại"}</span>
                    </div>
                  )}
              </div>
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
                          {helper.getTimeFormat(createdAt, "HH:MM, dd/mm/yyyy")}
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <span>Tổng tiền thanh toán</span> :{" "}
                          {(totalPrice || 0).toLocaleString("it-IT", {
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
                            <p>{item.productName}</p>
                          </td>
                          <td>
                            <p>x {item.quantity}</p>
                          </td>
                          <td>
                            <p>
                              {(item.productId * item.quantity).toLocaleString(
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
                            {(totalPrice || 0).toLocaleString("it-IT", {
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
                            {(totalPrice || 0).toLocaleString("it-IT", {
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
          )}
        </section>
        <Footer />
      </div>
    );
  }
}

export default OrderDetailPage;
