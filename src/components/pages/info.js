import React, { Component } from "react";

import Header from "../layouts/shoe-store/header";
import Footer from "../layouts/shoe-store/footer";

import { Row, Col, Form, Modal, Button } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import SimpleReactValidator from "simple-react-validator";
import { addressData } from "../../config/dvhcvn";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import authService from "../../service/auth.service";
import customerService from "../../service/customer.service";
import * as helper from "../../commons/helper";
import CustomerForm from "../layouts/modal/CustomerForm";
import GeneralDialog from "../layouts/modal/GeneralDialog";

class InfoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        defaultAddressId: null,
        customerAddresses: [],
        // customerBirth: "Wed Dec 10 1969 08:00:00 GMT+0800 (Indochina Time)"
      },
      nonSelectable: [],
      btnUserModalLoading: false,
      userModalShow: false,
      passRequestData: {
        oldPassword: null,
        newPassword: null,
        confirmedNewPassword: null
      }
    };
    SimpleReactValidator.addLocale("vi", {
      required: "Không được bỏ trống!",
      email: "Email không hợp lệ!",
      url: "Đường dẫn không hợp lệ!"
    });
    this.validator = new SimpleReactValidator({
      autoForceUpdate: this,
      locale: "vi",
      element: (message) => (
        <div className="fv-plugins-bootstrap fv-plugins-message-container">
          <div className="fv-help-block">{message}</div>
        </div>
      ),
      validators: {
        confirmedPass: {  // name the rule
          message: 'Mật khẩu mới không khớp!',
          rule: (val, params, validator) => {
            return val === this.state.passRequestData.newPassword
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
    let customerCode =  authService.getCustomerCode();
    customerService.getCustomerInfo(customerCode).then(res => {
      if (!res.data) return;
      if (!res.data.error) return;
      if (res.data.error.statusCode === 100) {
        console.log(res)
        this.loadData(res.data.data);
      } else {
        this.setState({errorMsg: res.data.error.message});
      }
    })
  }

  loadData = (formData) => {
    if (!formData.customerAddresses) formData.customerAddresses = [];
    formData.customerAddresses.forEach((element,index) => {
      element.id = index;
    });
    let fullName = formData.customerName;
    if (fullName) {
      let name = fullName.split(" ", 2);
      formData.customerFirstName = name[0];
      formData.customerLastName = name[1];
    }
    let len = formData.customerAddresses.length;
    let nonSelectable = [];
    while (len > 0) {
      nonSelectable.push(--len);
    }

    this.setState({
      formData: {
        ...this.state.formData,
        ...formData
      },
      nonSelectable: nonSelectable,
      username: authService.getCurrentUser().username
    })
  }

  openResponseDialog = async (cb) => {
    return cb.then(res => {
      this.setState({
        dialogProps: {
          show: true,
          handleOk: () => this.setState({dialogProps:{...this.state.dialogProps, show: false}}),
          variant: "success",
          message: res.data.error.message
        }
      });
      return res.data.data;
    }).catch(error => {
      this.setState({
        dialogProps: {
          show: true,
          handleOk: () => this.setState({dialogProps:{...this.state.dialogProps, show: false}}),
          variant: "error",
          message: error.response.data? error.response.data.error.message : error.message
        }
      })
      return "error";
    }) 
  }

  updateCustomer = async (data) => {
    await this.openResponseDialog(customerService.updateCustomer(data)).then(res => {if (res !== "error") this.loadData(res)});
    this.setState({formProps:{...this.state.formProps, show: false}});
  }
  
  updatePassword = async (e) => {
    const requestData = this.state.passRequestData;
    if (this.validator.allValid()) {
      this.setState({btnUserModalLoading: true});
      await this.openResponseDialog(authService.updatePassword(requestData)).then(res => {if (res !== "error") this.handleCloseUserModal()});
      this.setState({btnUserModalLoading: false});
    } else {
      this.validator.showMessages();
    }
  }

  openEditCustomerForm = (data) => {
    this.setState({
      formProps: {
        show: true,
        formData: data,
        handleOk: this.updateCustomer,
        handleClose: () => this.setState({formProps:{show: false}}),
      },
    })
  }

  handleCloseUserModal = () => {
    this.validator.hideMessages();
    this.validator.visibleFields.length = 0;
    
    this.setState({userModalShow: false});
  }

  render() {
    const { formData, nonSelectable, username, formProps, dialogProps, userModalShow, btnUserModalLoading, passRequestData } = this.state;
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
                  <a href="/home">
                    Trang chủ
                    <span className="lnr lnr-arrow-right" />
                  </a>
                  <a href="/info">Thông tin cá nhân</a>
                </nav>
              </div>
            </div>
          </div>
        </section>
        {/* End Banner Area */}
        {/*================Info Box Area =================*/}
        <section className="info_box_area section_gap">
          <div className="container">
          <Form>
              <h3 className="my-10">Chi tiết đăng nhập</h3>
              <Row>
                <Form.Group as={Col} xs={3} className="mb-3" controlId="username">
                  <Form.Label>Tài khoản</Form.Label>
                  <Form.Control autoComplete="none" type="text" disabled defaultValue={username} placeholder="Tài khoản" />
                </Form.Group>
                <Form.Group as={Col} xs={3} className="mb-3" controlId="password">
                  <Form.Label>Mật khẩu</Form.Label>
                  <Form.Control autoComplete="none" type="text" disabled defaultValue={"********"} placeholder="Mật khẩu" />
                </Form.Group>
                <Col className="mb-3" style={{flexGrow: "unset"}}>
                  <Form.Label>{" "}</Form.Label>
                  <Form.Control as={Button}
                    variant="primary"
                    onClick={() => this.setState({userModalShow: true})}
                    >
                    Đổi mật khẩu
                  </Form.Control>
                </Col>
              </Row>
              <h3 className="my-10">Thông tin chi tiết</h3>
              <Row>
                <Form.Group as={Col} xs={3} className="mb-3" controlId="customerFirstName">
                  <Form.Label>Họ và tên</Form.Label>
                  <Form.Control autoComplete="none" type="text" disabled defaultValue={formData.customerFirstName} placeholder="Họ" />
                </Form.Group>
                <Form.Group as={Col} xs={3} className="mb-3" controlId="customerLastName">
                  <Form.Label>{" "}</Form.Label>
                  <Form.Control autoComplete="none" type="text" disabled defaultValue={formData.customerLastName} placeholder="Tên" />
                </Form.Group>
                <Form.Group as={Col} xs={3} className="mb-3" controlId="customerBirth">
                  <Form.Label>Ngày sinh</Form.Label>
                  <Form.Control as={DatePicker} disabled
                    selected={formData.customerBirth? new Date(formData.customerBirth) : formData.customerBirth}
                    onChange={date => this.setState({formData: {...this.state.formData, customerBirth: date? date.toString(): date}})}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="dd/MM/yyyy" />
                </Form.Group>
                <Col className="mb-3" xs={3}>
                  <Form.Label>Giới tính</Form.Label>
                  <Row className="align-items-center" style={{height: '38.4px'}}>
                    <Col>
                      <Form.Check
                        custom type="radio" label="Nam" name="customerGender" id="customerGender1"
                        checked = {this.state.formData.customerGender === 1}
                        disabled
                      />
                    </Col>
                    <Col>
                      <Form.Check
                        custom type="radio" label="Nữ" name="customerGender" id="customerGender2"
                        checked = {this.state.formData.customerGender === 2}
                        disabled
                      />
                    </Col>
                    <Col>
                      <Form.Check
                        custom type="radio" label="Khác" name="customerGender" id="customerGender0"
                        checked = {this.state.formData.customerGender === 0 || !this.state.formData.customerGender}
                        defaultChecked
                        disabled
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Form.Group as={Col} className="mb-3" controlId="customerPhone">
                  <Form.Label>Số điện thoại</Form.Label>
                  <Form.Control autoComplete="none" disabled defaultValue={formData.customerPhone} placeholder="0123456789" />
                </Form.Group>
                <Form.Group as={Col} className="mb-3" controlId="customerEmail">
                  <Form.Label>Địa chỉ Email</Form.Label>
                  <Form.Control autoComplete="none" disabled defaultValue={formData.customerEmail} placeholder="example@domain.com" />
                </Form.Group>
              </Row>
              <h3 className="my-10">Sổ địa chỉ</h3>
              <Row>
              <BootstrapTable
                keyField="id"
                height={'200px'}
                data={formData.customerAddresses}
                columns={[
                  {
                    dataField: "province",
                    text: "Tỉnh/Thành phố",
                    headerStyle: { width: "20%" },
                    formatter: (cell, row, index) => (
                      <Form.Control defaultValue={cell} disabled className="province-address" />
                    ),
                    formatExtraData: {
                      test: (id) => alert(id),
                    },
                  },
                  {
                    dataField: "district",
                    text: "Quận/Huyện",
                    headerStyle: { width: "20%" },
                    formatter: (cell, row, index) => (
                      <Form.Control defaultValue={cell} disabled className="district-address" />
                    ),
                    formatExtraData: {
                      test: (id) => alert(id),
                    },
                  },
                  {
                    dataField: "ward",
                    text: "Xã/Phường",
                    headerStyle: { width: "20%" },
                    formatter: (cell, row, index) => (
                      <Form.Control defaultValue={cell} disabled className="ward-address" />
                    ),
                    formatExtraData: {
                      test: (id) => alert(id),
                    },
                  },
                  {
                    dataField: "detail",
                    text: "Địa chỉ chi tiết",
                    headerStyle: { width: "33%" },
                    formatter: (cell, row, index) => (
                      <Form.Control defaultValue={cell} disabled placeholder="Số nhà, tên tòa nhà, tên đường, tên khu vực" />
                    ),
                    formatExtraData: {
                      test: (id) => alert(id),
                    },
                  },
                ]}
                selectRow={{
                  mode: 'radio',
                  selected: [formData.defaultAddressId],
                  nonSelectable: nonSelectable,
                  onSelect: (row, isSelected, rowIndex) => this.setState({
                    formData: {
                      ...formData,
                      defaultAddressId: rowIndex
                    }
                  }),
                  selectionHeaderRenderer: () => <i className="las la-home"></i>,
                  selectionRenderer: ({ mode, ...rest }) => (
                    <input type="checkbox" { ...rest } />
                  )
                }}
                wrapperClasses="table-responsive"
                bordered={false}
                classes="table table-head-custom table-vertical-center overflow-scroll"
                bootstrap4
              />
              </Row>
              <Button
                className="float-right"
                variant="primary"
                onClick={() => this.openEditCustomerForm(formData)}
              >
                Thay đổi thông tin
              </Button>
            </Form>
          </div>
        </section>
        {/*================End Info Box Area =================*/}
        {/* start footer Area */}
        <Footer />
        {/* End footer Area */}
        <CustomerForm { ...formProps } />
        <GeneralDialog { ...dialogProps } />
        <Modal show={userModalShow} onHide={this.handleCloseUserModal}>
          <Modal.Header>
            <Modal.Title>
              Thay đổi mật khẩu
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
            <Form.Group className="mb-3" controlId="oldPassword">
              <Form.Label>Mật khẩu cũ</Form.Label>
              <Form.Control autoComplete="none" type="password" placeholder="Nhập mật khẩu cũ"
              onBlur={(e) => this.setState({passRequestData: {...passRequestData, oldPassword: e.target.value}})} />
              {this.validator.message(
                "oldPassword",
                this.state.passRequestData.oldPassword,
                "required"
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="newPassword">
              <Form.Label>Mật khẩu mới</Form.Label>
              <Form.Control autoComplete="none" type="password" placeholder="Nhập mật khẩu mới"
              onBlur={(e) => this.setState({passRequestData: {...passRequestData, newPassword: e.target.value}})} />
              {this.validator.message(
                "newPassword",
                this.state.passRequestData.newPassword,
                "password"
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="confirmedNewPassword">
              <Form.Label>Xác nhận mật khẩu</Form.Label>
              <Form.Control autoComplete="none" type="password" placeholder="Nhập lại mật khẩu mới"
              onBlur={(e) => this.setState({passRequestData: {...passRequestData, confirmedNewPassword: e.target.value}})} />
              {this.validator.message(
                "confirmedNewPassword",
                this.state.passRequestData.confirmedNewPassword,
                "confirmedPass"
              )}
            </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              autoFocus
              variant="secondary"
              onClick={this.handleCloseUserModal}
            >
              Hủy bỏ
            </Button>
            <Button
              variant="primary"
              disabled={btnUserModalLoading ? true : false}
              onClick={this.updatePassword}
            >
              {btnUserModalLoading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              {!btnUserModalLoading && "Cập nhật"}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default InfoPage;
