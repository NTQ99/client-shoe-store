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

class AuthPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    SimpleReactValidator.addLocale("vi", {
      required: "Không được bỏ trống!",
    });
    this.validator = new SimpleReactValidator({
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
            return val === this.state.newPassword
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

  async componentDidMount() {
    const urlParams = await new URLSearchParams(
      this.props.location.search.substring(1)
    );
    const params = await Object.fromEntries(urlParams);
    this.setState({ ...params });

    switch (params.mode) {
      case "resetPassword":
        // Display reset password handler and UI.
        await authService.handleFirebaseVerifyResetPassword(params.oobCode).then(async email => {
          this.setState({email: email});
        }).catch(() => this.openResponseDialog("error", "Đã có lỗi xảy ra! Yêu cầu đặt lại mật khẩu của bạn đã hết hạn hoặc liên kết đã được sử dụng.", "/home"));
        break;
      case "verifyEmail":
        // Display email recovery handler and UI.
        authService.handleFirebaseVerifyEmail(params.oobCode).then(() => this.openResponseDialog("success", "Email đã được xác minh thành công!", "/login"))
        .catch(() => this.openResponseDialog("error", "Đã có lỗi xảy ra! Yêu cầu xác minh email của bạn đã hết hạn hoặc liên kết đã được sử dụng.", "/home"));
        break;
        default:
          this.openResponseDialog("error", "Đã có lỗi xảy ra!", "/home");
    }
  }

  resetPassword = async (e) => {
    e.preventDefault();
    const {email, newPassword, oobCode} = this.state;
    if (this.validator.allValid()) {
      this.setState({btnLoading: true});
      await authService.resetPassword(email, newPassword).then(async res => {
        if (res.data && res.data.error)
        if (res.data.error.statusCode === 208) {
          await authService.handleFirebaseconfirmPasswordReset(oobCode, newPassword).then(() => {
            this.openResponseDialog("success", "Mật khẩu đã được thay đổi! Vui lòng đăng nhập để tiếp tục mua hàng.", "/login");
          }).catch(() => this.openResponseDialog("error", "Đã có lỗi xảy ra! Yêu cầu đặt lại mật khẩu của bạn đã hết hạn hoặc liên kết đã được sử dụng.", "/home"));
        }
        else {
          this.openResponseDialog("error", res.data.error.message, "/home");
        }
      }).catch(error => {
        if (error.response && error.response.data.error) this.openResponseDialog("error", error.response.data.error.message, "/home");
        else this.openResponseDialog("error", error.message, "/home");
      })
      this.setState({btnLoading: false});
    } else this.validator.showMessages();
  }

  openResponseDialog = (variant, message, redirect) => {
    this.setState({
      dialogProps: {
        show: true,
        handleOk: () => window.location.replace(redirect),
        variant: variant,
        message: message,
      },
    });
  };
  render() {
    const { dialogProps, mode, newPassword, confirmedPass, btnLoading } = this.state;
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
        {mode === "resetPassword" && (<section className="tracking_box_area section_gap">
          <div className="container">
            <p>
              Nhập mật khẩu mới và nhấn nút "Tạo mật khẩu".
            </p>
            <div className="tracking_box_inner">
              <form
                className="row tracking_form"
                noValidate="novalidate"
                onSubmit={this.resetPassword}
              >
                <div className="col-md-12 form-group">
                  <input
                    type="password"
                    className="form-control"
                    id="newPassword"
                    name="newPassword"
                    placeholder="Mật khẩu mới"
                    onChange={(e) => this.setState({newPassword: e.target.value})}
                  />
                  {this.validator.message(
                    "newPassword",
                    newPassword,
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
                    onChange={(e) => this.setState({confirmedPass: e.target.value})}
                  />
                  {this.validator.message(
                    "confirmedPass",
                    confirmedPass,
                    "confirmedPass"
                  )}
                </div>
                <div className="col-md-12 form-group">
                  <button type="submit" value="submit" className="primary-btn">
                    {btnLoading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    {!btnLoading && "Tạo mật khẩu"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>)}
        {/*================End Login Box Area =================*/}
        {/* start footer Area */}
        <Footer />
        {/* End footer Area */}
      </div>
    );
  }
}

export default AuthPage;
