import React, { Component } from "react";
import cartService from "../../service/cart.service";
import productService from "../../service/product.service";
import GeneralDialog from "../layouts/modal/GeneralDialog";
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
      this.openResponseDialog("error", "Gi??? h??ng ??ang tr???ng! H??y th??m s???n ph???m v??o gi??? h??ng c???a b???n!");
    }
  }
  
  render() {
    const {products, totalMoney, numOfCart, dialogProps} = this.state;
    return (
      <div>
        <GeneralDialog { ...dialogProps } />
        <Header numOfCart={numOfCart} />
        {/* Start Banner Area */}
        <section className="banner-area organic-breadcrumb">
          <div className="container">
            <div className="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
              <div className="col-first">
                <h1>Gi??? h??ng</h1>
                <nav className="d-flex align-items-center">
                  <a href="/home">
                    Trang ch???
                    <span className="lnr lnr-arrow-right" />
                  </a>
                  <a href="category.html">Gi??? h??ng</a>
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
                      <th scope="col">S???n ph???m</th>
                      <th scope="col">Gi??</th>
                      <th scope="col">S??? l?????ng</th>
                      <th scope="col">Th??nh ti???n</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((item, index) => {
                      if (!item.data.productPhotos[0].startsWith('http') && !item.data.productPhotos[0].startsWith('/')) {
                        item.data.productPhotos[0] = '/'+item.data.productPhotos[0]
                      }
                      return (
                        <tr>
                          <td style={{cursor: "pointer"}} onClick={()=> window.location.href = `/product-detail/${item.data.productCode}`}>
                            <div className="media">
                              <div className="d-flex">
                                <img src={item.data.productPhotos[0]} width="100px" height="100px" alt="" />
                              </div>
                              <div className="media-body">
                                <p>{item.data.shortTitle}</p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <h5>{item.data.price.toLocaleString("it-IT", { style: "currency", currency: "VND" })}</h5>
                          </td>
                          <td style={{minWidth: '150px'}}>
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
                                title="S??? l?????ng"
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
                          C???p nh???t gi??? h??ng
                        </a>
                      </td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td>
                        <h5>Th??nh ti???n</h5>
                      </td>
                      <td>
                        <h5>{(totalMoney || 0).toLocaleString("it-IT", { style: "currency", currency: "VND" })}</h5>
                      </td>
                    </tr>
                    <tr className="shipping_area">
                      <td></td>
                      <td></td>
                      <td>
                        <h5>Giao h??ng</h5>
                      </td>
                      <td>
                        <div className="shipping_box">
                          <ul className="list">
                            <li>
                              <a href="/" className="disabled" onClick={(e) => e.preventDefault()}>Nhanh:   50.000 VND</a>
                            </li>
                            <li className="active">
                              <a href="/" onClick={(e) => e.preventDefault()}>Ti??u chu???n: Mi???n ph??</a>
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
                            Ti???p t???c mua h??ng
                          </a>
                          <a className="primary-btn" href="/checkout" onClick={this.handleCheckout}>
                            Thanh to??n gi??? h??ng
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
