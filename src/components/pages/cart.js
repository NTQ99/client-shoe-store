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
        totalMoney += res.data.data.price[2] * item.number;
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
                <h1>Shopping Cart</h1>
                <nav className="d-flex align-items-center">
                  <a href="index.html">
                    Home
                    <span className="lnr lnr-arrow-right" />
                  </a>
                  <a href="category.html">Cart</a>
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
                      <th scope="col">Product</th>
                      <th scope="col">Price</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Total</th>
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
                            <h5>{item.data.price[2] + " VND"}</h5>
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
                            <h5>{item.data.price[2] * item.number + " VND"}</h5>
                          </td>
                        </tr>
                      )
                    })}
                    <tr className="bottom_button">
                      <td>
                        <a className="gray_btn" href="#">
                          Update Cart
                        </a>
                      </td>
                      <td></td>
                      <td></td>
                      <td>
                        <div className="cupon_text d-flex align-items-center">
                          <input type="text" placeholder="Coupon Code" />
                          <a className="primary-btn" href="#">
                            Apply
                          </a>
                          <a className="gray_btn" href="#">
                            Close Coupon
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td>
                        <h5>Subtotal</h5>
                      </td>
                      <td>
                        <h5>{totalMoney + " VND"}</h5>
                      </td>
                    </tr>
                    <tr className="shipping_area">
                      <td></td>
                      <td></td>
                      <td>
                        <h5>Shipping</h5>
                      </td>
                      <td>
                        <div className="shipping_box">
                          <ul className="list">
                            <li>
                              <a href="#">Flat Rate: 40.000 VND</a>
                            </li>
                            <li>
                              <a href="#">Free Shipping</a>
                            </li>
                            <li>
                              <a href="#">Flat Rate: 50.000 VND</a>
                            </li>
                            <li className="active">
                              <a href="#">Local Delivery: 30.000 VND</a>
                            </li>
                          </ul>
                          <h6>
                            Calculate Shipping{" "}
                            <i
                              className="fa fa-caret-down"
                              aria-hidden="true"
                            />
                          </h6>
                          <select className="shipping_select">
                            <option value={1}>Bangladesh</option>
                            <option value={2}>India</option>
                            <option value={4}>Pakistan</option>
                          </select>
                          <select className="shipping_select">
                            <option value={1}>Select a State</option>
                            <option value={2}>Select a State</option>
                            <option value={4}>Select a State</option>
                          </select>
                          <input type="text" placeholder="Postcode/Zipcode" />
                          <a className="gray_btn" href="#">
                            Update Details
                          </a>
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
                            Continue Shopping
                          </a>
                          <a className="primary-btn" href="#">
                            Proceed to checkout
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
