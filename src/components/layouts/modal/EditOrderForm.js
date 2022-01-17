import { Component } from "react";
import { Row, Col, Form, Modal, Button } from "react-bootstrap";
import SimpleReactValidator from "simple-react-validator";

import { addressData } from "../../../config/dvhcvn";
import * as helper from "../../../commons/helper";

class EditOrderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
      btnLoading: false,
      deliveryTo: {},
      addressList: { district: [], ward: [] },
    };
    SimpleReactValidator.addLocale("vi", {
      required: "Không được bỏ trống!"
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
        phone: {
          message: 'Số điện thoại không đúng định dạng!',
          rule: (val, params, validator) => {
            return validator.helpers.testRegex(val,/(\+84|84|0)+([0-9]{9})$/i) && params.indexOf(val) === -1
          },
          required: true  // optional
        }
      }
    });

    this.onAddressSelect = helper.onAddressSelect.bind(this);
  }

  componentDidUpdate(prevProps) {
    const {formData} = this.props;
    if (formData && prevProps.formData !== formData) {
      this.setState({formData: formData});
      let defaultAddress = formData.deliveryTo;
      let provinceObject = addressData.find((province) => province.name === defaultAddress.province);
      let districtObject = provinceObject.level2s.find((district) => district.name === defaultAddress.district);
      let wardObject = districtObject.level3s.find((ward) => ward.name === defaultAddress.ward);
      
      let addressListRow = {
        district: provinceObject.level2s,
        ward: districtObject.level3s
      };
  
      defaultAddress = {
        ...defaultAddress,
        provinceId: provinceObject.level1_id,
        districtId: districtObject.level2_id,
        wardId: wardObject.level3_id
      }
      this.setState({deliveryTo: defaultAddress, addressList: addressListRow});
    }
  }

  handleOk = async () => {
    if (this.validator.allValid()) {
      this.setState({btnLoading: true});
      await this.props.handleOk({...this.state.formData, deliveryTo: this.state.deliveryTo});
      this.handleClose();
    } else {
      this.validator.showMessages();
    }
  }

  handleClose = () => {
    this.validator.hideMessages();
    this.validator.visibleFields.length = 0;
    this.props.handleClose();
    this.setState({
      btnLoading: false,
      orderData: {},
    })
  }

  handleInputChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.id;

    this.setState({
      formData: {
        ...this.state.formData,
        [name]: value
      }
    });
    this.validator.showMessageFor(name);
  }

  render() {
    const { btnLoading, formData, deliveryTo, addressList } = this.state;
    const { show } = this.props;
    return (
      <>
        <Modal size="lg" show={show} onHide={this.handleClose}>
          <Modal.Header>
            <Modal.Title>Thay đổi thông tin đơn hàng</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <h6 className="mb-5">Thông tin khách hàng</h6>
              <Row>
                <Form.Group as={Col} xs={6} className="mb-3" controlId="customerName">
                  <Form.Label className="required">Tên khách hàng</Form.Label>
                  <Form.Control autoComplete="none" disabled type="text" defaultValue={formData.customerName} onChange={this.handleInputChange} placeholder="Nhập tên khách hàng" />
                  {this.validator.message(
                    "customerName",
                    this.state.formData.customerName,
                    "required"
                  )}
                </Form.Group>
                <Col className="mb-3" xs={4}>
                  <Form.Label>Giới tính</Form.Label>
                  <Row className="align-items-center" style={{height: '38.4px'}}>
                    <Col>
                      <Form.Check
                        custom type="radio" label="Nam" name="customerGender" id="customerGender1"
                        checked = {this.state.formData.customerGender === 1}
                        disabled
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
                        checked = {this.state.formData.customerGender === 2}
                        disabled
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
                        checked = {this.state.formData.customerGender === 0 || !this.state.formData.customerGender}
                        defaultChecked
                        disabled
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
                  <Form.Control autoComplete="none" disabled defaultValue={formData.customerPhone} onChange={this.handleInputChange} placeholder="0123456789" />
                  {this.validator.message(
                    "customerPhone",
                    this.state.formData.customerPhone,
                    "phone"
                  )}
                </Form.Group>
                <Form.Group as={Col} className="mb-3" controlId="customerEmail">
                  <Form.Label>Địa chỉ Email</Form.Label>
                  <Form.Control autoComplete="none" disabled defaultValue={formData.customerEmail} onChange={this.handleInputChange} placeholder="example@domain.com" />
                  {this.validator.message(
                    "customerEmail",
                    this.state.formData.customerEmail,
                    "email"
                  )}
                </Form.Group>
              </Row>
              <h6 className="my-5">Địa chỉ giao hàng</h6>
              <Row>
                <Form.Group
                  as={Col}
                  controlId="addressProvince"
                  className="mb-3"
                  onChange={this.onAddressSelect}
                >
                  <Form.Label className="required">
                    Tỉnh/Thành phố
                  </Form.Label>
                  <Form.Control
                    as="select"
                    value={deliveryTo.provinceId || "-1"}
                  >
                    <option value={"-1"}>Chọn</option>
                    {addressData.map((province) => (
                      <option value={province.level1_id}>
                        {province.name}
                      </option>
                    ))}
                  </Form.Control>
                  {this.validator.message(
                    "addressProvince",
                    deliveryTo.province,
                    "required"
                  )}
                </Form.Group>
                <Form.Group
                  as={Col}
                  controlId="addressDistrict"
                  className="mb-3"
                  onChange={this.onAddressSelect}
                >
                  <Form.Label className="required">
                    Quận/Huyện
                  </Form.Label>
                  <Form.Control
                    as="select"
                    value={deliveryTo.districtId}
                  >
                    <option value={"-1"}>Chọn</option>
                    {addressList.district.map((district) => (
                      <option value={district.level2_id}>
                        {district.name}
                      </option>
                    ))}
                  </Form.Control>
                  {this.validator.message(
                    "addressDistrict",
                    deliveryTo.district,
                    "required"
                  )}
                </Form.Group>
                <Form.Group
                  as={Col}
                  controlId="addressWard"
                  className="mb-3"
                  onChange={this.onAddressSelect}
                >
                  <Form.Label className="required">
                    Xã/Phường
                  </Form.Label>
                  <Form.Control as="select" value={deliveryTo.wardId}>
                    <option value={"-1"}>Chọn</option>
                    {addressList.ward.map((ward) => (
                      <option value={ward.level3_id}>
                        {ward.name}
                      </option>
                    ))}
                  </Form.Control>
                  {this.validator.message(
                    "addressWard",
                    deliveryTo.ward,
                    "required"
                  )}
                </Form.Group>
              </Row>
              <Row>
                <Form.Group
                  as={Col}
                  controlId="addressDetail"
                  className="mb-3"
                  onBlur={this.onAddressSelect}
                >
                  <Form.Label className="required">
                    Địa chỉ chi tiết
                  </Form.Label>
                  <Form.Control
                    defaultValue={deliveryTo.detail}
                    placeholder="Số nhà, tên tòa nhà, tên đường, tên khu vực"
                  />
                  {this.validator.message(
                    "addressDetail",
                    deliveryTo.detail,
                    "required"
                  )}
                </Form.Group>
              </Row>
              <Form.Text className="text-muted">
                Lưu ý: Trường có dấu <span style={{color: 'red'}}>*</span> là các trường bắt buộc.
              </Form.Text>
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
              {!btnLoading && "Lưu"}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default EditOrderForm;
