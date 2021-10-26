import { Component } from "react";
import { InputGroup, Row, Col, Form, Modal, Button } from "react-bootstrap";
import SimpleReactValidator from "simple-react-validator";

class ProductForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {},
      btnLoading: false,
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
    });
  }

  componentDidUpdate(preProps) {
    const {formData} = this.props;
    if (formData && preProps.formData !== formData) this.setState({
      form: {
        ...this.state.form,
        id: formData.id,
        productName: formData.productName,
        capitalPrice: formData.price[0],
        retailPrice: formData.price[1],
        wholesalePrice: formData.price[2],
        stock: formData.stock,
        weight: formData.weight,
        length: formData.length,
        width: formData.width,
        height: formData.height,
        productPhotos: formData.productPhotos.toString(),
        productDetail: formData.productDetail
      }
    })
  }

  handleOk = async () => {
    const form = this.state.form;
    if (this.validator.allValid()) {
      this.setState({btnLoading: true});
      await this.props.handleOk({
        id: form.id,
        productName: form.productName,
        price: [form.capitalPrice, form.retailPrice, form.wholesalePrice],
        stock: form.stock,
        weight: form.weight,
        length: form.length,
        width: form.width,
        height: form.height,
        productPhotos: (form.productPhotos || "").replace(' ', '').split(','),
        productDetail: form.productDetail || ""
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
    this.setState({
      btnLoading: false,
      form: {}
    })
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

  render() {
    const { btnLoading, form } = this.state;
    const { show, formData } = this.props;
    return (
      <>
        <Modal size="lg" show={show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {formData && "Thay đổi thông tin sản phẩm"}
              {!formData && "Tạo sản phẩm mới"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row>
                <Form.Group as={Col} xs={5} className="mb-3" controlId="productName">
                  <Form.Label className="required">Tên sản phẩm</Form.Label>
                  <Form.Control autoComplete="none" type="text" defaultValue={form.productName} onChange={this.handleInputChange} placeholder="Nhập tên sản phẩm" />
                  {this.validator.message(
                    "productName",
                    this.state.form.productName,
                    "required"
                  )}
                </Form.Group>
                <Form.Group as={Col} className="mb-3" controlId="capitalPrice">
                  <Form.Label className="required">Giá nhập</Form.Label>
                  <InputGroup>
                    <Form.Control autoComplete="none" type="number" min={0} defaultValue={form.capitalPrice} onChange={this.handleInputChange} placeholder="0" />
                    <div className="input-group-append">
                      <span className="input-group-text bg-transparent p-1">đ</span>
                    </div>
                  </InputGroup>
                  {this.validator.message(
                    "capitalPrice",
                    this.state.form.capitalPrice,
                    "required"
                  )}
                </Form.Group>
                <Form.Group as={Col} className="mb-3" controlId="retailPrice">
                  <Form.Label className="required">Giá lẻ</Form.Label>
                  <InputGroup>
                    <Form.Control autoComplete="none" type="number" min={0} defaultValue={form.retailPrice} onChange={this.handleInputChange} placeholder="0" />
                    <div className="input-group-append">
                      <span className="input-group-text bg-transparent p-1">đ</span>
                    </div>
                  </InputGroup>
                  {this.validator.message(
                    "retailPrice",
                    this.state.form.retailPrice,
                    "required"
                  )}
                </Form.Group>
                <Form.Group as={Col} className="mb-3" controlId="wholesalePrice">
                  <Form.Label className="required">Giá sỉ</Form.Label>
                  <InputGroup>
                    <Form.Control autoComplete="none" type="number" min={0} defaultValue={form.wholesalePrice} onChange={this.handleInputChange} placeholder="0" />
                    <div className="input-group-append bg-white">
                      <span className="input-group-text bg-transparent p-1">đ</span>
                    </div>
                  </InputGroup>
                  {this.validator.message(
                    "wholesalePrice",
                    this.state.form.wholesalePrice,
                    "required"
                  )}
                </Form.Group>
              </Row>
              <Row>
                <Col xs={5}>
                  <Row>
                    <Form.Group as={Col} className="mb-3" controlId="stock">
                      <Form.Label className="required">Số lượng sẵn có</Form.Label>
                      <Form.Control autoComplete="none" type="number" min={0} defaultValue={form.stock} onChange={this.handleInputChange} placeholder="0" />
                      {this.validator.message(
                        "stock",
                        this.state.form.stock,
                        "required"
                      )}
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="weight">
                      <Form.Label className="required">Trọng lượng</Form.Label>
                      <InputGroup>
                        <Form.Control autoComplete="none" type="number" min={0} defaultValue={form.weight} onChange={this.handleInputChange} placeholder="0" />
                        <div className="input-group-append">
                          <span className="input-group-text bg-transparent p-1">gram</span>
                        </div>
                      </InputGroup>
                      {this.validator.message(
                        "weight",
                        this.state.form.weight,
                        "required"
                      )}
                    </Form.Group>
                  </Row>
                </Col>
                <Col>
                  <Form.Label>Kích thước</Form.Label>
                  <Row>
                    <Form.Group as={Col} className="mb-3" controlId="length">
                      <InputGroup>
                        <Form.Control autoComplete="none" type="number" min={0} defaultValue={form.length} onChange={this.handleInputChange} placeholder="Chiều dài" />
                        <div className="input-group-append">
                          <span className="input-group-text bg-transparent p-1">cm</span>
                        </div>
                        <div className="position-absolute top-50 start-110 translate-middle">X</div>
                      </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="width">
                      <InputGroup>
                        <Form.Control autoComplete="none" type="number" min={0} defaultValue={form.width} onChange={this.handleInputChange} placeholder="Chiều rộng" />
                        <div className="input-group-append">
                          <span className="input-group-text bg-transparent p-1">cm</span>
                        </div>
                        <div className="position-absolute top-50 start-110 translate-middle">X</div>
                      </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="height">
                      <InputGroup>
                        <Form.Control autoComplete="none" type="number" min={0} defaultValue={form.height} onChange={this.handleInputChange} placeholder="Chiều cao" />
                        <div className="input-group-append bg-white">
                          <span className="input-group-text bg-transparent p-1">cm</span>
                        </div>
                      </InputGroup>
                    </Form.Group>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Form.Group as={Col} className="mb-3" controlId="productPhotos">
                  <Form.Label>Link ảnh sản phẩm</Form.Label>
                  <Form.Control autoComplete="none" type="text" defaultValue={form.productPhotos} onChange={this.handleInputChange} placeholder="https://photo1.com,https://photo2.com,... (2 url cách nhau bởi dấu ',')" />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} className="mb-3" controlId="productDetail">
                  <Form.Label>Thông tin chi tiết</Form.Label>
                  <Form.Control autoComplete="none" as="textarea" defaultValue={form.productDetail} onChange={this.handleInputChange} rows={3} placeholder="Nhập thông tin chi tiết sản phẩm" />
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
              {!btnLoading && !formData && "Tạo mới"}
              {!btnLoading && formData && "Cập nhật"}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default ProductForm;
