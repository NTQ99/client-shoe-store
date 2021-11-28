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

  async componentDidMount() {
    await this.getCart();
  }

  getCart = async () => {
    this.setState({products: [], totalMoney: 0});
    let currentCart = [];
    let totalMoney = 0;
    currentCart = await cartService.getCart();
    currentCart.forEach(item => {
      productService.getProductById(item.productId).then(res => {
        totalMoney += res.data.data.price * item.quantity;
        this.setState({
          products: [...this.state.products, {data: res.data.data, quantity: item.quantity}],
          totalMoney: totalMoney
        })
      })
    });
  }

  handleClickNumProduct(e, index, cnt) {  
    let el = e.currentTarget.parentElement.parentElement.querySelector("input");
    let products = this.state.products;
    let newValue = products[index].quantity + cnt;
    el.value = newValue;
    this.updateProductToCart(newValue, index);
  }
  
  updateProductToCart(value, index) {
    let products = this.state.products;
    let totalMoney = this.state.totalMoney + (Number(value)-products[index].quantity)*products[index].data.price;
    this.setState({numOfCart: this.state.numOfCart + Number(value)});
    if (Number(value) === 0) {
      products.splice(index, 1);
    } else {
      products[index].quantity = Number(value);
    }
    this.setState({products: [...products], totalMoney: totalMoney});
    cartService.updateItemCart(index, value);
  }
  
  handleChangeNumProduct = (value, index) => {
    let products = this.state.products;
    let totalMoney = this.state.totalMoney + (Number(value)-products[index].quantity)*products[index].data.price;
    products[index].quantity = Number(value);
    this.setState({products: [...products], totalMoney: totalMoney});
  }

  handleCheckout = (e) => {
    if (this.state.products.length === 0) {
      e.preventDefault();
      alert("Giỏ hàng đang trống! Hãy thêm sản phẩm vào giỏ hàng của bạn!");
    }
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
                    {products.map((item, index) => {
                      console.log(products)
                      if (!item.data.productPhotos[0].startsWith('http') && !item.data.productPhotos[0].startsWith('/')) {
                        item.data.productPhotos[0] = '/'+item.data.productPhotos[0]
                      }
                      return (
                        <tr>
                          <td>
                            <div className="media">
                              <div className="d-flex">
                                <img src={item.data.productPhotos[0]} width="100px" alt="" />
                              </div>
                              <div className="media-body">
                                <p>{item.data.shortTitle}</p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <h5>{item.data.price.toLocaleString("it-IT", { style: "currency", currency: "VND" })}</h5>
                          </td>
                          <td style={{maxWidth: '100px'}}>
                            <div className="input-group" style={{width: 'fit-content'}}>
                              <span class="input-group-btn">
                                  <button
                                    className="btn btn-white"
                                    onClick={(e) => this.handleClickNumProduct(e, index, -1)}
                                    type="button"
                                    >
                                    -
                                  </button>
                              </span>
                              <input
                                type="number"
                                value={products[index].quantity}
                                onChange={(e) => this.handleChangeNumProduct(e.target.value, index)}
                                onBlur={(e) => this.updateProductToCart(e.target.value, index)}
                                title="Số lượng"
                                style={{width: '50px'}}
                                className="form-control"
                                />
                              <span class="input-group-btn">
                                  <button
                                    className="btn btn-white"
                                    onClick={(e) => this.handleClickNumProduct(e, index, 1)}
                                    type="button"
                                    >
                                    +
                                  </button>
                              </span>
                            </div>
                          </td>
                          <td style={{minWidth: "150px"}}>
                            <h5>{(item.data.price * item.quantity).toLocaleString("it-IT", { style: "currency", currency: "VND" })}</h5>
                          </td>
                        </tr>
                      )
                    })}
                    <tr className="bottom_button">
                      <td>
                        <a className="gray_btn" href="/" onClick={(e) => {e.preventDefault(); this.getCart()}}>
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
                        <h5>{(totalMoney || 0).toLocaleString("it-IT", { style: "currency", currency: "VND" })}</h5>
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
                              <a href="/" className="disabled" onClick={(e) => e.preventDefault()}>Nhanh:   50.000 VND</a>
                            </li>
                            <li className="active">
                              <a href="/" onClick={(e) => e.preventDefault()}>Tiêu chuẩn: Miễn phí</a>
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
                          <a className="gray_btn" href="/home">
                            Tiếp tục mua hàng
                          </a>
                          <a className="primary-btn" href="/checkout" onClick={this.handleCheckout}>
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
