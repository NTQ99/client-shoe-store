import React, { Component } from "react";

import AuthService from "../../service/auth.service";

import authHeader from "../../service/auth-header";
import Header from "../layouts/shoe-store/header";
import Footer from "../layouts/shoe-store/footer";
import GeneralDialog from "../layouts/modal/GeneralDialog";
import SimpleReactValidator from "simple-react-validator";

import DatePicker from "react-datepicker";
import authService from "../../service/auth.service";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typePage: "login",
      login: {},
      register: {}
    }
    SimpleReactValidator.addLocale("vi", {
      required: "Không được bỏ trống!",
      email: "Email không hợp lệ!",
      url: "Đường dẫn không hợp lệ!"
    });
    this.validatorLogin = new SimpleReactValidator({
      autoForceUpdate: this,
      locale: "vi",
      element: (message) => (
        <div className="fv-plugins-bootstrap fv-plugins-message-container">
          <div className="fv-help-block text-left">{message}</div>
        </div>
      )
    });
    this.validatorRegister = new SimpleReactValidator({
      autoForceUpdate: this,
      locale: "vi",
      element: (message) => (
        <div className="fv-plugins-bootstrap fv-plugins-message-container">
          <div className="fv-help-block text-left">{message}</div>
        </div>
      ),
      validators: {
        confirmedPass: {  // name the rule
          message: 'Mật khẩu không khớp!',
          rule: (val, params, validator) => {
            return val === this.state.register.password
          },
          required: true  // optional
        },
        password: {
          message: 'Phải có ít nhất 6 ký tự, bao gồm cả số và chữ!',
          rule: (val, params, validator) => {
            return validator.helpers.testRegex(val,/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/i) && params.indexOf(val) === -1
          },
          required: true  // optional
        }
      }
    });
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
  
  login = async (e) => {
    e.preventDefault();
    let loginObj = this.state.login;
    if (this.validatorLogin.allValid()) {
      this.setState({loginBtnLoading: true});
      await AuthService.login(loginObj.username, loginObj.password).then(async res=>{
        if (res.error.statusCode === 200) {
          this.openResponseDialog("success", res.error.message);
          setTimeout(() => {
            if (AuthService.getRoles().includes("ROLE_SELLER") || AuthService.getRoles().includes("ROLE_ADMIN")) {
              window.location.replace("/order");
            } else {
              window.location.replace("/home");
            }
          }, 1000)
        } else {
          this.openResponseDialog("error", res.error.message);
        }
      }).catch(error => this.openResponseDialog("error", error.response.data.error.message))
      this.setState({loginBtnLoading: false});
    } else this.validatorLogin.showMessages();
  }

  register = async (e) => {
    e.preventDefault();
    let registerObj = this.state.register;
    if (this.validatorRegister.allValid()) {
      this.setState({registerBtnLoading: true});
      await AuthService.register(registerObj).then(async res=>{
        if (res.error.statusCode === 206) {
          this.openResponseDialog("success", res.error.message);
          setTimeout(() => window.location.replace('/login'), 1000);
        } else {
          this.openResponseDialog("error", res.error.message);
        }
      }).catch(error => this.openResponseDialog("error", error.response.data.error.message))
      this.setState({registerBtnLoading: false});
    } else this.validatorRegister.showMessages();
  }

  render() {
    const {typePage, login, register, dialogProps, loginBtnLoading, registerBtnLoading} = this.state
    return (
      <div>
        <GeneralDialog { ...dialogProps } />
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
                  <a href="/home">
                    Trang chủ
                    <span className="lnr lnr-arrow-right" />
                  </a>
                  <a href="/login">Tài khoản</a>
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
                    <a className="primary-btn" href="/" onClick={(e)=>{
                          e.preventDefault();
                          this.validatorLogin.hideMessages();
                          this.validatorLogin.visibleFields.length = 0;
                          this.setState({typePage: "register"})}}>
                      Đăng ký
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="login_form_inner">
                  <h3>ĐĂNG NHẬP</h3>
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
                        onChange={(e) => this.setState({login: {...login, username: e.target.value}})}
                      />
                      {this.validatorLogin.message(
                        "username",
                        login.username,
                        "required"
                      )}
                    </div>
                    <div className="col-md-12 form-group">
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="Mật khẩu"
                        onChange={(e) => this.setState({login: {...login, password: e.target.value}})}
                      />
                      {this.validatorLogin.message(
                        "password",
                        login.password,
                        "required"
                      )}
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
                        {loginBtnLoading && (
                          <span className="spinner-border spinner-border-sm"></span>
                        )}
                        {!loginBtnLoading && "Đăng nhập"}
                      </button>
                      <a href="/reset-password">Quên mật khẩu?</a>
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
                  <h3 style ={{marginTop: "31px"}}>ĐĂNG KÝ</h3>
                  <div className="row login_form">
                    <div className="col-md-12 form-group">
                      <div className="row">
                        <div className="col">
                          <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            name="lastName"
                            placeholder="Họ"
                            onChange={(e) => this.setState({register: {...register, lastName: e.target.value}})}
                          />
                          {this.validatorRegister.message(
                            "lastName",
                            register.lastName,
                            "required"
                          )}
                        </div>
                        <div className="col">
                          <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            name="firstName"
                            placeholder="Tên"
                            onChange={(e) => this.setState({register: {...register, firstName: e.target.value}})}
                          />
                          {this.validatorRegister.message(
                            "firstName",
                            register.firstName,
                            "required"
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 form-group">
                      <DatePicker
                        className="form-control"
                        selected={register.birthday? new Date(register.birthday) : register.birthday}
                        onChange={date => this.setState({register: {...register, birthday: date? date.toString(): date}})}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Ngày sinh"
                      />
                      {this.validatorRegister.message(
                        "birthday",
                        register.birthday,
                        "required"
                      )}
                    </div>
                    <div className="col-md-12 form-group">
                      <input
                        type="text"
                        className="form-control"
                        id="phone"
                        name="phone"
                        placeholder="Số điện thoại"
                        onChange={(e) => this.setState({register: {...register, phone: e.target.value}})}
                      />
                      {this.validatorRegister.message(
                        "phone",
                        register.phone,
                        "required"
                      )}
                    </div>
                    <div className="col-md-12 form-group">
                      <input
                        type="text"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Email"
                        onChange={(e) => this.setState({register: {...register, email: e.target.value}})}
                      />
                      {this.validatorRegister.message(
                        "email",
                        register.email,
                        "required|email"
                      )}
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
                        name=""
                        placeholder="Tài khoản"
                        onChange={(e) => this.setState({register: {...register, username: e.target.value}})}
                      />
                      {this.validatorRegister.message(
                        "username",
                        register.username,
                        "required"
                      )}
                    </div>
                    <div className="col-md-12 form-group">
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="Mật khẩu"
                        onChange={(e) => this.setState({register: {...register, password: e.target.value}})}
                      />
                      {this.validatorRegister.message(
                        "password",
                        register.password,
                        "password"
                      )}
                    </div>
                    <div className="col-md-12 form-group">
                      <input
                        type="password"
                        className="form-control"
                        id="confirmedPass"
                        name="confirmedPass"
                        placeholder="Xác nhận mật khẩu"
                        onChange={(e) => this.setState({register: {...register, confirmedPass: e.target.value}})}
                      />
                      {this.validatorRegister.message(
                        "confirmedPass",
                        register.confirmedPass,
                        "confirmedPass"
                      )}
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
                        
                        {registerBtnLoading && (
                          <span className="spinner-border spinner-border-sm"></span>
                        )}
                        {!registerBtnLoading && "Đăng ký"}
                      </button>
                    </div>
                    <div className="col-md-12 form-group">
                      <div className="d-flex align-items-center justify-content-end mb-3">
                        <div>Bạn đã có tài khoản? 
                        </div>
                        <button className="primary-btn ml-3" style={{width: "auto", padding: "0 10px", lineHeight: "28px", background: "none", border: "solid 2px", borderImage: "linear-gradient(90deg, #ffba00, #ff6c00) 1 10", color: "#ffba00"}}
                        onClick={(e)=>{
                          e.preventDefault();
                          this.validatorRegister.hideMessages();
                          this.validatorRegister.visibleFields.length = 0;
                          this.setState({typePage: "login"})}}>
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
