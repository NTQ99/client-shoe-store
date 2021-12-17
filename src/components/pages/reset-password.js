import React, { Component } from "react";

import AuthService from "../../service/auth.service";

import authHeader from "../../service/auth-header";
import Header from "../layouts/shoe-store/header";
import Footer from "../layouts/shoe-store/footer";
import GeneralDialog from "../layouts/modal/GeneralDialog";
import SimpleReactValidator from "simple-react-validator";

import DatePicker from "react-datepicker";
import authService from "../../service/auth.service";
import { Form } from "react-bootstrap";
import { debugErrorMap } from "@firebase/auth";

class ResetPassPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    SimpleReactValidator.addLocale("vi", {
      required: "Không được bỏ trống!",
      email: "Email không hợp lệ!",
    });
    this.validator = new SimpleReactValidator({
      autoForceUpdate: this,
      locale: "vi",
      element: (message) => (
        <div className="fv-plugins-bootstrap fv-plugins-message-container">
          <div className="fv-help-block text-left">{message}</div>
        </div>
      ),
    });
  }

  sendEmail = async (e) => {
    e.preventDefault();
    const {email, username} = this.state;
    if (this.validator.allValid()) {
      this.setState({btnLoading: true});
      await authService.validatePassword(username, email).then(async res => {
        if (res.data && res.data.error)
        if (res.data.error.statusCode === 100) {
          await authService.handleFirebaseSendPasswordResetEmail(email).then(() => {
            this.openResponseDialogRedirect("success", "Bạn vui lòng kiểm tra email và tạo mật khẩu mới.", "/login");
          }).catch(() => this.openResponseDialog("error", "Đã có lỗi xảy ra!"));
        }
        else {
          this.openResponseDialog("error", res.data.error.message);
        }
      }).catch(error => {
        if (error.response && error.response.data) this.openResponseDialog("error", error.response.data.error.message);
        else this.openResponseDialog("error", error.message);
      })
      this.setState({btnLoading: false});
    } else this.validator.showMessages();
  }

  openResponseDialogRedirect = (variant, message, redirect) => {
    this.setState({
      dialogProps: {
        show: true,
        handleOk: () => window.location.replace(redirect),
        variant: variant,
        message: message,
      },
    });
  };
  openResponseDialog = (variant, message) => {
    this.setState({
      dialogProps: {
        show: true,
        handleOk: () => this.setState({dialogProps:{...this.state.dialogProps, show: false}}),
        variant: variant,
        message: message,
      },
    });
  };
  render() {
    const { dialogProps, username, email, btnLoading } = this.state;
    return (
      <div>
        <GeneralDialog {...dialogProps} />
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
                  <a href="/__/auth/action">Xác thực</a>
                </nav>
              </div>
            </div>
          </div>
        </section>
        {/* End Banner Area */}
        {/*================Login Box Area =================*/}
        <section className="tracking_box_area section_gap">
          <div className="container">
            <p>
              Để lấy lại mật kkhẩu, vui lòng nhập tài khoản, email của bạn vào ô bên dưới và nhấn nút "Tiếp tục", chúng tôi sẽ gửi email cho bạn.
            </p>
            <div className="tracking_box_inner">
              <form
                className="row tracking_form"
                noValidate="novalidate"
                onSubmit={this.sendEmail}
              >
                <div className="col-md-12 form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    placeholder="Tài khoản"
                    onChange={(e) => this.setState({username: e.target.value})}
                  />
                  {this.validator.message(
                    "username",
                    username,
                    "required"
                  )}
                </div>
                <div className="col-md-12 form-group">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Email"
                    onChange={(e) => this.setState({email: e.target.value})}
                  />
                  {this.validator.message(
                    "email",
                    email,
                    "email"
                  )}
                </div>
                <div className="col-md-12 form-group">
                  <button type="submit" value="submit" className="primary-btn">
                    {btnLoading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    {!btnLoading && "Tiếp tục"}
                  </button>
                </div>
              </form>
            </div>
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

export default ResetPassPage;
