import React, { Component } from "react";

import AuthService from "../../service/auth.service";

import authHeader from "../../service/auth-header";
import Header from "../layouts/shoe-store/header";
import Footer from "../layouts/shoe-store/footer";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typePage: "login"
    }
  }

  componentDidMount() {
    if (authHeader()) {
      if (AuthService.getRoles()) {
        if (AuthService.getRoles().includes("ROLE_SELLER") || AuthService.getRoles().includes("ROLE_ADMIN")) {
          window.location.replace("/order");
        } else {
          window.location.replace("/home");
        }
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
        <Header />
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
        <Footer />
        {/* End footer Area */}
      </div>
    );
  }
}

export default LoginPage;
