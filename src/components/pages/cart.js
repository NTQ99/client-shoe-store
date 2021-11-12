import React, { Component } from "react";
import cartService from "../../service/cart.service";
import productService from "../../service/product.service";
import Footer from "../layouts/shoe-store/footer";
import Header from "../layouts/shoe-store/header";

class CartPage extends Component {
  constructor(props) {
    super(props);
    this.state={
      products: [],
      numOfCart: 0
    }
  }

  componentDidMount() {
    let currentCart = [];
    let totalMoney = 0;
    currentCart = cartService.getCart();
    currentCart.forEach(item => {
      productService.getProductById(item.id).then(res => {
        totalMoney += res.data.data.price * item.number;
        this.setState({
          products: [...this.state.products, {data: res.data.data, number: item.number}],
          totalMoney: totalMoney
        })
      })
    });
  }

  updateProductToCart(e, id) {
    cartService.updateCart(id, e.target.value)
    this.setState({numOfCart: this.state.numOfCart + 1})
  }
  
  render() {
    const {products, totalMoney, numOfCart} = this.state;
    return (
      <div>
        <Header numOfCart={numOfCart} />
        {/* Start Banner Area */}
        <section className="banner-area organic-breadcrumb">
          <div className="container">
            <div className="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
              <div className="col-first">
                <h1>Giỏ hàng</h1>
                <nav className="d-flex align-items-center">
                  <a href="index.html">
                    Trang chủ
                    <span className="lnr lnr-arrow-right" />
                  </a>
                  <a href="category.html">Giỏ hàng</a>
                </nav>
              </div>
            </div>
          </div>
        </section>
        {/* End Banner Area */}
        {/*================Cart Area =================*/}
        <section className="cart_area">
          <div className="container">
            <div className="cart_inner">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Sản phẩm</th>
                      <th scope="col">Giá</th>
                      <th scope="col">Số lượng</th>
                      <th scope="col">Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((item, i) => {
                      if (!item.data.productPhotos[0].startsWith('http') && !item.data.productPhotos[0].startsWith('/')) {
                        item.data.productPhotos[0] = '/'+item.data.productPhotos[0]
                      }
                      return (
                        <tr>
                          <td>
                            <div className="media">
                              <div className="d-flex">
                                <img src={item.data.productPhotos[0]} width="250px" alt="" />
                              </div>
                              <div className="media-body">
                                <p>{item.data.productName}</p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <h5>{item.data.price + " VND"}</h5>
                          </td>
                          <td>
                            <div className="product_count">
                              <input
                                type="text"
                                name="qty"
                                id="sst"
                                maxLength={12}
                                defaultValue={item.number}
                                onBlur={(e) => {this.updateProductToCart(e, item.data.id); item.number = e.target.value}}
                                title="Quantity:"
                                className="input-text qty"
                              />
                              <button
                                onclick="var result = document.getElementById('sst'); var sst = result.value; if( !isNaN( sst )) result.value++;return false;"
                                className="increase items-count"
                                type="button"
                              >
                                <i className="lnr lnr-chevron-up" />
                              </button>
                              <button
                                onclick="var result = document.getElementById('sst'); var sst = result.value; if( !isNaN( sst ) && sst > 0 ) result.value--;return false;"
                                className="reduced items-count"
                                type="button"
                              >
                                <i className="lnr lnr-chevron-down" />
                              </button>
                            </div>
                          </td>
                          <td>
                            <h5>{item.data.price * item.number + " VND"}</h5>
                          </td>
                        </tr>
                      )
                    })}
                    <tr className="bottom_button">
                      <td>
                        <a className="gray_btn" href="#">
                          Cập nhật giỏ hàng
                        </a>
                      </td>
                      <td></td>
                      <td></td>
                      <td>
                        <div className="cupon_text d-flex align-items-center">
                          <input type="text" placeholder="Nhập mã giảm giá" />
                          <a className="primary-btn" href="#">
                            Áp dụng
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td>
                        <h5>Thành tiền</h5>
                      </td>
                      <td>
                        <h5>{totalMoney || 0 + " VND"}</h5>
                      </td>
                    </tr>
                    <tr className="shipping_area">
                      <td></td>
                      <td></td>
                      <td>
                        <h5>Giao hàng</h5>
                      </td>
                      <td>
                        <div className="shipping_box">
                          <ul className="list">
                            <li>
                              <a href="#">Ship nhanh: 50.000 VND</a>
                            </li>
                            <li>
                              <a href="#">Ship chậm: 30.000 VND</a>
                            </li>
                            <li className="active">
                              <a href="#">Miễn phí ship</a>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                    <tr className="out_button_area">
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        <div className="checkout_btn_inner d-flex align-items-center">
                          <a className="gray_btn" href="#">
                            Tiếp tục mua hàng
                          </a>
                          <a className="primary-btn" href="#">
                            Thanh toán giỏ hàng
                          </a>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
        {/*================End Cart Area =================*/}

        <Footer />
      </div>
    );
  }
}

export default CartPage;
