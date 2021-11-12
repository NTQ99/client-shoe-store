import React, { Component } from "react";

import AuthService from "../../service/auth.service";

import authHeader from "../../service/auth-header";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typePage: "login"
    }
  }

  componentDidMount() {
    if (authHeader()) {
      if (AuthService.getRoles().includes("ROLE_SELLER") || AuthService.getRoles().includes("ROLE_ADMIN")) {
        window.location.replace("/order");
      } else {
        window.location.replace("/home");
      }
    }
  }
  
  login = (e) => {
    e.preventDefault();
    let username = e.target.username.value
    let password = e.target.password.value
    AuthService.login(username, password).then(res=>{
      alert(res.error.message)
      if (res.error.statusCode === 200) {
        if (AuthService.getRoles().includes("ROLE_SELLER") || AuthService.getRoles().includes("ROLE_ADMIN")) {
          window.location.replace("/order");
        } else {
          window.location.replace("/home");
        }
      }
    })
  }
  register = (e) => {
    e.preventDefault();
    let firstName = e.target.firstName.value
    let lastName = e.target.lastName.value
    let phone = e.target.phone.value
    let email = e.target.username.value
    let username = e.target.username.value
    let password = e.target.password.value
    AuthService.register(username, password, firstName, lastName, phone, email).then(res=>{
      
      alert(res.error.message)
      console.log(res)
      if (res.error.statusCode === 206) window.location.replace('/')
    })
  }
  render() {
    const {typePage} = this.state
    return (
      <div>
        {/* Start Header Area */}
        <header className="header_area sticky-header position-fixed">
          <div className="main_menu">
            <nav className="navbar navbar-expand-lg navbar-light main_box">
              <div className="container">
                {/* Brand and toggle get grouped for better mobile display */}
                <a className="navbar-brand logo_h" href="index.html">
                  <h3>Shoe Store</h3>
                </a>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="/navbarSupportedContent"
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
                    <li className="nav-item">
                      <a className="nav-link" href="/">
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
                    <li className="nav-item">
                      <a
                        href="/"
                        className="nav-link"
                      >
                        Bộ sưu tập
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="/"
                        className="nav-link"
                      >
                        Sale
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="contact.html">
                      Về chúng tôi
                      </a>
                    </li>
                  </ul>
                  <ul className="nav navbar-nav navbar-right">
                    <li className="nav-item">
                      <a href="/" className="cart">
                        <span className="ti-bag" />
                      </a>
                    </li>
                    <li className="nav-item">
                      <button className="search">
                        <span className="lnr lnr-magnifier" id="search" />
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
          <div className="search_input" id="search_input_box">
            <div className="container">
              <form className="d-flex justify-content-between">
                <input
                  type="text"
                  className="form-control"
                  id="search_input"
                  placeholder="Search Here"
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
        {/* End Header Area */}
        {/* Start Banner Area */}
        <section className="banner-area organic-breadcrumb">
          <div className="container">
            <div className="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
              <div className="col-first">
                <h1>Tài khoản</h1>
                <nav className="d-flex align-items-center">
                  <a href="index.html">
                    Trang chủ
                    <span className="lnr lnr-arrow-right" />
                  </a>
                  <a href="category.html">Tài khoản</a>
                </nav>
              </div>
            </div>
          </div>
        </section>
        {/* End Banner Area */}
        {/*================Login Box Area =================*/}
        <section className="login_box_area section_gap">
          <div className="container">
            {typePage === "login" && <div className="row">
              <div className="col-lg-6">
                <div className="login_box_img">
                  <img className="img-fluid" src="/assets/img/category/c3.jpg" alt="" />
                  <div className="hover">
                    <h4>Bạn chưa có tài khoản?</h4>
                    <p>
                      Chúng tôi sẽ mang tới cho bạn những sản phẩm tốt nhất cùng với trải nghiệm tuyệt vời nhất
                    </p>
                    <a className="primary-btn" href="/" onClick={(e)=>{e.preventDefault();this.setState({typePage:  "register"})}}>
                      Đăng ký
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="login_form_inner">
                  <h3>ĐẢNG NHẬP</h3>
                  <form
                    className="row login_form"
                    onSubmit={this.login}
                    id="loginForm"
                    noValidate="novalidate"
                  >
                    <div className="col-md-12 form-group">
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        placeholder="Tài khoản"
                        onFocus={(o) => {o.placeholder = ''}}
                        onBlur={(o) => {o.placeholder = 'Tài khoản'}}
                      />
                    </div>
                    <div className="col-md-12 form-group">
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="Mật khẩu"
                        onFocus={(o) => {o.placeholder = ''}}
                        onBlur={(o) => {o.placeholder = 'Mật khẩu'}}
                      />
                    </div>
                    <div className="col-md-12 form-group">
                      <div className="creat_account">
                        <input type="checkbox" id="f-option2" name="selector" />
                        <label htmlFor="f-option2">Giữ đăng nhập</label>
                      </div>
                    </div>
                    <div className="col-md-12 form-group">
                      <button
                        type="submit"
                        value="submit"
                        className="primary-btn"
                      >
                        Đăng nhập
                      </button>
                      <a href="/">Quên mật khẩu?</a>
                    </div>
                  </form>
                </div>
              </div>
            </div>}
            {typePage === "register" && <form className="row"
              onSubmit={this.register}
              id="registerForm"
              noValidate="novalidate">
              <div className="col-lg-6">
                <div className="login_form_inner">
                  <h3>ĐĂNG KÝ</h3>
                  <div className="row login_form">
                    <div className="col-md-12 form-group">
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        name="lastName"
                        placeholder="Họ"
                        onFocus={(o) => {o.placeholder = ''}}
                        onBlur={(o) => {o.placeholder = 'Họ'}}
                      />
                    </div>
                    <div className="col-md-12 form-group">
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        placeholder="Tên"
                        onFocus={(o) => {o.placeholder = ''}}
                        onBlur={(o) => {o.placeholder = 'Tên'}}
                      />
                    </div>
                    <div className="col-md-12 form-group">
                      <input
                        type="text"
                        className="form-control"
                        id="phone"
                        name="phone"
                        placeholder="Số điện thoại"
                        onFocus={(o) => {o.placeholder = ''}}
                        onBlur={(o) => {o.placeholder = 'Số điện thoại'}}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="login_form_inner">
                  <div className="row login_form">
                    <div className="col-md-12 form-group">
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        placeholder="Email/Tài khoản"
                        onFocus={(o) => {o.placeholder = ''}}
                        onBlur={(o) => {o.placeholder = 'Email/Tài khoản'}}
                      />
                    </div>
                    <div className="col-md-12 form-group">
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="Mật khẩu"
                        onFocus={(o) => {o.placeholder = ''}}
                        onBlur={(o) => {o.placeholder = 'Mật khẩu'}}
                      />
                    </div>
                    <div className="col-md-12 form-group">
                      <div className="creat_account">
                        <input type="checkbox" id="f-option2" name="selector" />
                        <label htmlFor="f-option2">Đăng ký nhận bản tin</label>
                      </div>
                      <div className="creat_account">
                        <input type="checkbox" id="f-option2" name="selector" />
                        <label htmlFor="f-option2">Đồng ý với các{" "} <a href="/" style={{color: "#ffba00", display: "initial"}}>điều khoản</a>{" "}của chúng tôi</label>
                      </div>
                    </div>
                    <div className="col-md-12 form-group">
                      <button
                        type="submit"
                        value="submit"
                        className="primary-btn"
                      >
                        Đăng ký
                      </button>
                    </div>
                    <div className="col-md-12 form-group">
                      <div className="d-flex align-items-center justify-content-end mb-3">
                        <div>Bạn đã có tài khoản? 
                        </div>
                        <button className="primary-btn ml-3" style={{width: "auto", padding: "0 10px", lineHeight: "28px", background: "none", border: "solid 2px", borderImage: "linear-gradient(90deg, #ffba00, #ff6c00) 1 10", color: "#ffba00"}}
                        onClick={(e)=>{e.preventDefault();this.setState({typePage:  "login"})}}>
                          Đăng nhập
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>}
          </div>
        </section>
        {/*================End Login Box Area =================*/}
        {/* start footer Area */}
        <footer className="footer-area section_gap">
          <div className="container">
            <div className="row">
              <div className="col-lg-3  col-md-6 col-sm-6">
                <div className="single-footer-widget">
                  <h6>Về chúng tôi</h6>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore dolore magna
                    aliqua.
                  </p>
                </div>
              </div>
              <div className="col-lg-4  col-md-6 col-sm-6">
                <div className="single-footer-widget">
                  <h6>Đăng ký nhận tin</h6>
                  <p>Đăng ký để nhận những khuyến mãi mới nhất của chúng tôi</p>
                  <div className id="mc_embed_signup">
                    <form
                      target="_blank"
                      noValidate="true"
                      action="https://spondonit.us12.list-manage.com/subscribe/post?u=1462626880ade1ac87bd9c93a&id=92a4423d01"
                      method="get"
                      className="form-inline"
                    >
                      <div className="d-flex flex-row">
                        <input
                          className="form-control"
                          name="EMAIL"
                          placeholder="Nhập Email"
                          onFocus={(o) => {o.placeholder = ''}}
                          onBlur={(o) => {o.placeholder = 'Nhập Email '}}
                          required
                          type="email"
                        />
                        <button className="click-btn btn btn-default">
                          <i
                            className="fa fa-long-arrow-right"
                            aria-hidden="true"
                          />
                        </button>
                        <div style={{ position: "absolute", left: "-5000px" }}>
                          <input
                            name="b_36c4fd991d266f23781ded980_aefe40901a"
                            tabIndex={-1}
                            defaultValue
                            type="text"
                          />
                        </div>
                        {/* <div class="col-lg-4 col-md-4">
													<button class="bb-btn btn"><span class="lnr lnr-arrow-right"></span></button>
												</div>  */}
                      </div>
                      <div className="info" />
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-lg-3  col-md-6 col-sm-6">
                <div className="single-footer-widget mail-chimp">
                  <h6 className="mb-20">Instragram Feed</h6>
                  <ul className="instafeed d-flex flex-wrap">
                    <li>
                      <img src="/assets/img/i1.jpg" alt="" />
                    </li>
                    <li>
                      <img src="/assets/img/i2.jpg" alt="" />
                    </li>
                    <li>
                      <img src="/assets/img/i3.jpg" alt="" />
                    </li>
                    <li>
                      <img src="/assets/img/i4.jpg" alt="" />
                    </li>
                    <li>
                      <img src="/assets/img/i5.jpg" alt="" />
                    </li>
                    <li>
                      <img src="/assets/img/i6.jpg" alt="" />
                    </li>
                    <li>
                      <img src="/assets/img/i7.jpg" alt="" />
                    </li>
                    <li>
                      <img src="/assets/img/i8.jpg" alt="" />
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-2 col-md-6 col-sm-6">
                <div className="single-footer-widget">
                  <h6>Follow Us</h6>
                  <p>Let us be social</p>
                  <div className="footer-social d-flex align-items-center">
                    <a href="/">
                      <i className="fa fa-facebook" />
                    </a>
                    <a href="/">
                      <i className="fa fa-twitter" />
                    </a>
                    <a href="/">
                      <i className="fa fa-dribbble" />
                    </a>
                    <a href="/">
                      <i className="fa fa-behance" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-bottom d-flex justify-content-center align-items-center flex-wrap">
              <p className="footer-text m-0">
                {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                Copyright ©{new Date().getFullYear()} All rights reserved | This website is made with{" "}
                <i className="fa fa-heart-o" aria-hidden="true" /> by{" "}
                <a href="/" target="_blank" rel="noreferrer">
                  MyTeam
                </a>
                {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
              </p>
            </div>
          </div>
        </footer>
        {/* End footer Area */}
      </div>
    );
  }
}

export default LoginPage;
