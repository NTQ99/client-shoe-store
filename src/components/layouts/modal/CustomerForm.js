import { Component } from "react";
import { Row, Col, Form, Modal, Button } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import SimpleReactValidator from "simple-react-validator";
import { addressData } from "../../../config/dvhcvn";

class CustomerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        defaultAddressId: null,
        customerAddresses: []
      },
      addressList: [{district: [], ward: []}],
      currentAddress: [{id:0}],
      btnLoading: false,
    };
    SimpleReactValidator.addLocale("vi", {
      required: "Không được bỏ trống!",
      email: "Email không hợp lệ.",
      url: "Đường dẫn không hợp lệ."
    });
    this.validator = new SimpleReactValidator({
      autoForceUpdate: this,
      locale: "vi",
      element: (message) => (
        <div className="fv-plugins-bootstrap fv-plugins-message-container">
          <div className="fv-help-block">{message}</div>
        </div>
      ),
    });
  }

  async componentDidUpdate(preProps) {
    const {formData} = this.props;
    if (!formData && preProps.formData !== formData) {
      this.setState({
        form: {
          defaultAddressId: null,
          customerAddresses: []
        },
        addressList: [{district: [], ward: []}],
        currentAddress: [{id:0}],
        btnLoading: false,
      })
    }
    if (formData && preProps.formData !== formData) {
      let addressList = [];
      let currentAddress = [];
      await formData.customerAddresses.forEach((address,index) => {
        let provinceObject = addressData.find((province) => province.name === address.province);
        let districtObject = provinceObject.level2s.find((district) => district.name === address.district);
        let wardObject = districtObject.level3s.find((ward) => ward.name === address.ward);
        addressList.push({
          district: provinceObject.level2s,
          ward: districtObject.level3s
        })
        currentAddress.push({
          id: index,
          provinceId: provinceObject.level1_id,
          province: provinceObject.name,
          districtId: districtObject.level2_id,
          district: districtObject.name,
          wardId: wardObject.level3_id,
          ward: wardObject.name,
          detail: address.detail,
          disabled: true
        })
        if (index === formData.customerAddresses.length - 1) {
          addressList.push({district: [], ward: []});
          currentAddress.push({id: formData.customerAddresses.length})
        }
      })
      this.setState({
        form: {
          ...this.state.form,
          id: formData.id,
          customerName: formData.customerName,
          customerGender: formData.customerGender,
          customerPhone: formData.customerPhone,
          customerEmail: formData.customerEmail,
          customerFacebook: formData.customerFacebook,
          customerAddresses: formData.customerAddresses,
          defaultAddressId: formData.defaultAddressId,
        },
        addressList: addressList,
        currentAddress: currentAddress
      })
    }
  }

  handleOk = async () => {
    const form = this.state.form;
    if (this.validator.allValid()) {
      this.setState({btnLoading: true});
      await this.props.handleOk({
        id: form.id,
        customerName: form.customerName,
        customerGender: form.customerGender || 0,
        customerPhone: form.customerPhone,
        customerEmail: form.customerEmail || "",
        customerFacebook: form.customerFacebook || "",
        customerAddresses: form.customerAddresses,
        defaultAddressId: form.defaultAddressId
      })
      this.handleClose();
    } else {
      this.validator.showMessages();
    }
  }

  handleClose = () => {
    this.validator.hideMessages();
    this.validator.visibleFields.length = 0;
    
    this.props.handleClose();
  }

  handleInputChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.id;

    this.setState({
      form: {
        ...this.state.form,
        [name]: value
      }
    });
    this.validator.showMessageFor(name);
  }

  onAddressSelect = (e, index) => {
    let addressRow = this.state.currentAddress;
    let addressListRow = this.state.addressList;
    switch (e.target.classList[0]) {
      case "province-address":
        document.getElementsByClassName("district-address")[index].value = "-1";
        document.getElementsByClassName("province-address")[index].classList.remove("border-warning");
        const provinceId = e.target.value;
        let province = e.target.options[e.target.selectedIndex].text;
        let districtList = [];
        if (provinceId !== "-1") {
          districtList = addressData.find((el) => el.level1_id === provinceId).level2s;
        } else province = null;
        addressRow[index] = {
          ...addressRow[index],
          provinceId: provinceId,
          province: province,
          districtId: null,
          district: null,
          wardId: null,
          ward: null
        };
        addressListRow[index] = {
          district: districtList,
          ward: []
        };
        this.setState({
          currentAddress: addressRow,
          addressList: addressListRow
        });
        break;
      case "district-address":
        document.getElementsByClassName("ward-address")[index].value = "-1";
        document.getElementsByClassName("district-address")[index].classList.remove("border-warning");
        const districtId = e.target.value;
        let district = e.target.options[e.target.selectedIndex].text;
        let wardList = [];
        if (districtId !== "-1") {
          wardList = addressData.find(el => el.level1_id === this.state.currentAddress[index].provinceId).level2s
                                    .find(el => el.level2_id === districtId).level3s;
        } else district = null;
        addressRow[index] = {
          ...addressRow[index],
          districtId: districtId,
          district: district,
          wardId: null,
          ward: null,
        }
        addressListRow[index] = {
          ...addressListRow[index],
          ward: wardList
        }
        this.setState({
          currentAddress: addressRow,
          addressList: addressListRow
        });
        break;
      case "ward-address":
        document.getElementsByClassName("ward-address")[index].classList.remove("border-warning");
        const wardId = e.target.value;
        let ward = e.target.options[e.target.selectedIndex].text;
        if (wardId === "-1") ward = null;
        addressRow[index] = {
          ...addressRow[index],
          wardId: wardId,
          ward: ward
        }
        this.setState({
          currentAddress: addressRow
        });
        break;
      default:
        const detail = e.target.value;
        addressRow[index] = {
          ...addressRow[index],
          detail: detail,
        }
        this.setState({
          currentAddress: addressRow
        });
        break;
    }
  }

  handleAddress = (index) => {
    let addressRow = this.state.currentAddress;
    let addressListRow = this.state.addressList;
    let customerAddresses = this.state.form.customerAddresses;
    if (!addressRow[index].disabled) {
      let validatation = true;
      
      if (!addressRow[index].province) {
        validatation = false;
        document.getElementsByClassName("province-address")[index].classList.add("border-warning");
      }
      if (!addressRow[index].district) {
        validatation = false;
        document.getElementsByClassName("district-address")[index].classList.add("border-warning");
      }
      if (!addressRow[index].ward) {
        validatation = false;
        document.getElementsByClassName("ward-address")[index].classList.add("border-warning");
      }

      if (validatation) {
        addressRow.push({id: index+1});
        addressListRow.push({district: [], ward: []});
        customerAddresses.push({
          ...addressRow[index]
        })
        this.setState({
          form: {
            ...this.state.form,
            customerAddresses: customerAddresses,
            defaultAddressId: this.state.form.defaultAddressId || 0
          },
          currentAddress: addressRow,
          addressList: addressListRow
        })
        addressRow[index].disabled = true;
      }
    } else {
      addressRow.splice(index, 1);
      addressRow.forEach((address, index) => address.id = index)
      addressListRow.splice(index, 1);
      customerAddresses.splice(index, 1);
      this.setState({
        form: {
          ...this.state.form,
          customerAddresses: customerAddresses,
          defaultAddressId: this.state.form.defaultAddressId >= addressRow.length-1? (addressRow.length === 1? null: 0)
                                                    : this.state.form.defaultAddressId
        },
        currentAddress: addressRow,
        addressList: addressListRow
      })
    }
  }

  render() {
    const { btnLoading, form } = this.state;
    const { show, formData } = this.props;
    return (
      <>
        <Modal size="lg" show={show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {formData && "Thay đổi thông tin khách hàng"}
              {!formData && "Khách hàng mới"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row>
                <Form.Group as={Col} xs={6} className="mb-3" controlId="customerName">
                  <Form.Label className="required">Tên khách hàng</Form.Label>
                  <Form.Control autoComplete="none" type="text" defaultValue={form.customerName} onChange={this.handleInputChange} placeholder="Nhập tên khách hàng" />
                  {this.validator.message(
                    "customerName",
                    this.state.form.customerName,
                    "required"
                  )}
                </Form.Group>
                <Col className="mb-3" xs={4}>
                  <Form.Label>Giới tính</Form.Label>
                  <Row className="align-items-center" style={{height: '38.4px'}}>
                    <Col>
                      <Form.Check
                        custom type="radio" label="Nam" name="customerGender" id="customerGender1"
                        checked = {this.state.form.customerGender === 1}
                        onChange={()=> this.setState({
                          form: {
                            ...this.state.form,
                            customerGender: 1
                          }
                        })}
                      />
                    </Col>
                    <Col>
                      <Form.Check
                        custom type="radio" label="Nữ" name="customerGender" id="customerGender2"
                        checked = {this.state.form.customerGender === 2}
                        onChange={()=> this.setState({
                          form: {
                            ...this.state.form,
                            customerGender: 2
                          }
                        })}
                      />
                    </Col>
                    <Col>
                      <Form.Check
                        custom type="radio" label="Khác" name="customerGender" id="customerGender0"
                        checked = {this.state.form.customerGender === 0 || !this.state.form.customerGender}
                        defaultChecked
                        onChange={()=> this.setState({
                          form: {
                            ...this.state.form,
                            customerGender: 0
                          }
                        })}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Form.Group as={Col} className="mb-3" controlId="customerPhone">
                  <Form.Label className="required">Số điện thoại</Form.Label>
                  <Form.Control autoComplete="none" defaultValue={form.customerPhone} onChange={this.handleInputChange} placeholder="0123456789" />
                  {this.validator.message(
                    "customerPhone",
                    this.state.form.customerPhone,
                    "required"
                  )}
                </Form.Group>
                <Form.Group as={Col} className="mb-3" controlId="customerEmail">
                  <Form.Label>Địa chỉ Email</Form.Label>
                  <Form.Control autoComplete="none" defaultValue={form.customerEmail} onChange={this.handleInputChange} placeholder="example@domain.com" />
                  {this.validator.message(
                    "customerEmail",
                    this.state.form.customerEmail,
                    "email"
                  )}
                </Form.Group>
              </Row>
              <Row>
                <Col>
                  <Form.Text className="text-muted mb-9">
                    Lưu ý: Trường có dấu <span style={{color: 'red'}}>*</span> là các trường bắt buộc.
                  </Form.Text>
                  <Form.Label className="required">Sổ địa chỉ</Form.Label>
                  {this.validator.message(
                    "customerAddress",
                    this.state.form.defaultAddressId,
                    "required"
                  )}
                </Col>
                <Form.Group as={Col} className="mb-3" controlId="customerFacebook">
                  <Form.Label>Đường dẫn Facebook</Form.Label>
                  <Form.Control autoComplete="none" defaultValue={form.customerFacebook} onChange={this.handleInputChange} placeholder="https://www.facebook.com/abc" />
                  {this.validator.message(
                    "customerFacebook",
                    this.state.form.customerFacebook,
                    "url"
                  )}
                </Form.Group>
              </Row>
              <Row>
              <BootstrapTable
                keyField="id"
                height={'200px'}
                data={this.state.currentAddress}
                columns={[
                  {
                    dataField: "provinceId",
                    text: "Tỉnh/Thành phố",
                    headerStyle: { width: "20%" },
                    formatter: (cell, row, index) => (
                      <Form.Control as="select" value={cell} className="province-address" disabled={this.state.currentAddress[index].disabled} onChange={(e) => this.onAddressSelect(e, index)}>
                        <option value={"-1"}>Chọn</option>
                        {addressData.map((province) => (
                          <option value={province.level1_id}>
                            {province.name}
                          </option>
                        ))}
                      </Form.Control>
                    ),
                    formatExtraData: {
                      test: (id) => alert(id),
                    },
                  },
                  {
                    dataField: "districtId",
                    text: "Quận/Huyện",
                    headerStyle: { width: "20%" },
                    formatter: (cell, row, index) => (
                      <Form.Control as="select" value={cell} className="district-address" disabled={this.state.currentAddress[index].disabled} onChange={(e) => this.onAddressSelect(e, index)}>
                        <option value={"-1"}>Chọn</option>
                        {this.state.addressList[index].district.map((district) => (
                              <option value={district.level2_id}>{district.name}</option>
                            ))}
                      </Form.Control>
                    ),
                    formatExtraData: {
                      test: (id) => alert(id),
                    },
                  },
                  {
                    dataField: "wardId",
                    text: "Xã/Phường",
                    headerStyle: { width: "20%" },
                    formatter: (cell, row, index) => (
                      <Form.Control as="select" value={cell} className="ward-address" disabled={this.state.currentAddress[index].disabled} onChange={(e) => this.onAddressSelect(e, index)}>
                        <option value={"-1"}>Chọn</option>
                        {this.state.addressList[index].ward.map((ward) => (
                          <option value={ward.level3_id}>{ward.name}</option>
                        ))}
                      </Form.Control>
                    ),
                    formatExtraData: {
                      test: (id) => alert(id),
                    },
                  },
                  {
                    dataField: "detail",
                    text: "Địa chỉ cụ thể",
                    headerStyle: { width: "33%" },
                    formatter: (cell, row, index) => (
                      <Form.Control defaultValue={cell} disabled={this.state.currentAddress[index].disabled} onBlur={(e) => this.onAddressSelect(e, index)}  placeholder="Số nhà, tên tòa nhà, tên đường, tên khu vực" />
                    ),
                    formatExtraData: {
                      test: (id) => alert(id),
                    },
                  },
                  {
                    dataField: "actions",
                    headerStyle: { width: "7%" },
                    formatter: (cell, row, index) => (
                      <div className="d-flex justify-content-center">
                        <div
                          title={this.state.currentAddress[index].disabled? "Xóa địa chỉ": "Thêm địa chỉ"}
                          className={`btn btn-icon btn-light btn-hover-${this.state.currentAddress[index].disabled? "danger": "primary"} btn-sm`}
                          onClick={() => this.handleAddress(index)}
                        >
                          <span className="svg-icon svg-icon-md">
                            {!this.state.currentAddress[index].disabled && <i className="las la-plus-square"></i>}
                            {this.state.currentAddress[index].disabled && <i className="las la-trash-alt"></i>}
                          </span>
                        </div>
                      </div>
                    ),
                    formatExtraData: {
                      test: (id) => alert(id),
                    },
                  }
                ]}
                selectRow={{
                  mode: 'radio',
                  bgColor: '#f8f9fa',
                  selected: [this.state.form.defaultAddressId],
                  nonSelectable: [this.state.form.customerAddresses.length],
                  onSelect: (row, isSelected, rowIndex) => this.setState({
                    form: {
                      ...this.state.form,
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
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              autoFocus
              variant="secondary"
              onClick={this.handleClose}
            >
              Hủy bỏ
            </Button>
            <Button
              variant="primary"
              disabled={btnLoading ? true : false}
              onClick={this.handleOk}
            >
              {btnLoading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              {!btnLoading && !formData && "Tạo mới"}
              {!btnLoading && formData && "Cập nhật"}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default CustomerForm;
