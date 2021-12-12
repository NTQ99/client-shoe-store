import React, { Component } from "react";

import authHeader from "../../../service/auth-header";

import AuthService from "../../../service/auth.service";
import cartService from "../../../service/cart.service";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word: "",
      numOfCart: 0
    }
  }

  componentDidMount() {
    let urlParams = new URLSearchParams(window.location.search);
    let params = Object.fromEntries(urlParams);
    if (params.search) {
      document.getElementById("search_input_box").style.display = "block"
    }
    this.setState({numOfCart: cartService.getTotalNum(), word: params.search})
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({numOfCart: cartService.getTotalNum()})
  }

  logout = (e) => {
    e.preventDefault();
    AuthService.logout(() => window.location.replace("/"));
  };

  searchWord = (e) => {
    e.preventDefault();
    if (this.state.word) {
      window.location.replace(`/category?search=${this.state.word}`)
    } else {
      window.location.replace("/category");
    }
  }
  render() {
    const {numOfCart, word} = this.state
    return (
      <header className="header_area sticky-header">
        <div className="main_menu">
          <nav className="navbar navbar-expand-lg navbar-light main_box">
            <div className="container">
              {/* Brand and toggle get grouped for better mobile display */}
              <a className="navbar-brand logo_h" href="/home">
                <img
                  src="/assets/media/logos/logo-light.png"
                  height="50px"
                  alt=""
                />
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
              {/* Collect the nav links, forms, and other content for toggling */}
              <div
                className="collapse navbar-collapse offset"
                id="navbarSupportedContent"
              >
                <ul className="nav navbar-nav menu_nav ml-auto">
                  <li className="nav-item active">
                    <a className="nav-link" href="/home">
                      Trang chủ
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="/category"
                      className="nav-link"
                    >
                      Sản phẩm
                    </a>
                  </li>
                  {!authHeader() && (
                    <li className="nav-item">
                      <a
                        href="/tracking"
                        className="nav-link"
                      >
                        Tra cứu đơn hàng
                      </a>
                    </li>
                  )}
                  {authHeader() && (
                    <li className="nav-item">
                      <a
                        href="/my-order"
                        className="nav-link"
                      >
                        Đơn hàng của tôi
                      </a>
                    </li>
                  )}
                </ul>
                <ul className="nav navbar-nav navbar-right">
                  <li className="nav-item">
                    <button className="search">
                      <span className="lnr lnr-magnifier" id="search" />
                    </button>
                  </li>
                  <li className="nav-item">
                    <a href="/cart" className="cart">
                      <span className="ti-bag" />
                      <div
                        className="badge badge-danger"
                        style={{
                          position: "absolute",
                          borderRadius: "50%",
                          fontSize: "7px",
                          lineHeight: "8px",
                          top: "25%"
                        }}
                      >
                        {numOfCart}
                      </div>
                    </a>
                  </li>
                  {!authHeader() && (
                    <li className="nav-item">
                      <a href="/login">
                        <span className="lnr lnr-enter"></span>
                      </a>
                    </li>
                  )}
                  {authHeader() && (<>
                    <li className="nav-item">
                      <a href="/info">
                        <span className="lar la-user-circle" style={{fontSize: "15px"}}></span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="/logout" onClick={this.logout}>
                        <span className="lnr lnr-exit"></span>
                      </a>
                    </li>
                  </>)}
                </ul>
              </div>
            </div>
          </nav>
        </div>
        <div className="search_input" id="search_input_box">
          <div className="container">
            <form className="d-flex justify-content-between" onSubmit={(e)=> this.searchWord(e)}>
              <input
                type="text"
                className="form-control"
                id="search_input"
                placeholder="Nhập tên sản phẩm"
                defaultValue={word}
                onChange={(e) => this.setState({word: e.target.value})}
              />
              <button type="submit" className="btn" />
              <span
                className="lnr lnr-cross"
                id="close_search"
                title="Close Search"
              />
            </form>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
