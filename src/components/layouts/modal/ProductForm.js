import { Component } from "react";
import { InputGroup, Row, Col, Form, Modal, Button } from "react-bootstrap";
import SimpleReactValidator from "simple-react-validator";

class ProductForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        size: [],
        color: [],
        stock: [],
        category: ""
      },
      btnLoading: false,
      productRows: []
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
        productCode: formData.productCode,
        productName: formData.productName,
        shortTitle: formData.shortTitle,
        brand: formData.brand,
        category: formData.category,
        price: formData.price,
        promotion: formData.promotion,
        color: [formData.color],
        size: [formData.size],
        stock: [formData.stock],
        productPhotos: formData.productPhotos.toString(),
        productDetail: formData.productDetail
      }
    })
  }

  handleOk = async () => {
    const form = this.state.form;
    if (this.validator.allValid()) {
      this.setState({btnLoading: true});
      let productCode = (Date.now() % 1046527).toString().padStart(7, "0");
      for (let i = 0; i < form.stock.length; i ++) {
        await this.props.handleOk({
          id: form.id,
          productCode: productCode,
          productName: form.productName,
          shortTitle: `${form.productName}, size ${form.size[i]}, ${form.color[i]}`,
          brand: form.brand,
          category: form.category,
          price: form.price,
          promotion: form.promotion,
          color: form.color[i],
          size: form.size[i],
          stock: form.stock[i],
          productPhotos: (form.productPhotos || "").replace(' ', '').split(';'),
          productDetail: form.productDetail || ""
        })
      }
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
      form: {
        size: [],
        color: [],
        stock: []
      },
      productRows: []
    })
  }

  handleInputChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.id;
    const index = target.classList[1];

    switch (name) {
      case "size":
      case "color":
      case "stock":
        let newValue = this.state.form[name];
        newValue[index] = value;
        this.setState({
          form: {
            ...this.state.form,
            [name]: newValue
          }
        });
        break;
    
      default:
        this.setState({
          form: {
            ...this.state.form,
            [name]: value
          }
        });
        break;
    }
    this.validator.showMessageFor(name);
    console.log(this.state.form)
  }

  addProductRow = (e) => {
    e.preventDefault();
    let newRow = (index) => (<Row>
      <Form.Group as={Col} xs={3} className="mb-3" controlId="size">
        <Form.Control autoComplete="none" type="number" bsPrefix={`form-control ${index+1}`} min={16} defaultValue={this.state.form.size[index+1]} onChange={this.handleInputChange} placeholder="0" />
        {this.validator.message(
          "size",
          this.state.form.size[index+1],
          "required"
        )}
      </Form.Group>
      <Form.Group as={Col} xs={3} className="mb-3" controlId="color">
        <Form.Control as="select" bsPrefix={`form-control ${index+1}`} value={this.state.form.color[index+1]} onChange={this.handleInputChange} >
          <option value=""></option>
          <option value="DE">Đen</option>
          <option value="TR">Trắng</option>
          <option value="XL">Xanh lục</option>
          <option value="XB">Xanh biển</option>
          <option value="DO">Đỏ</option>
          <option value="BE">Be</option>
          <option value="NA">Nâu</option>
          <option value="TI">Tím</option>
          <option value="VA">Vàng</option>
          <option value="XA">Xám</option>
          <option value="CA">Cam</option>
          <option value="HO">Hồng</option>
          <option value="XX">Khác</option>
        </Form.Control>
        {this.validator.message(
          "color",
          this.state.form.color[index+1],
          "required"
        )}
      </Form.Group>
      <Form.Group as={Col} xs={3} className="mb-3" controlId="stock">
        <Form.Control autoComplete="none" type="number" bsPrefix={`form-control ${index+1}`} min={1} defaultValue={this.state.form.stock[index+1]} onChange={this.handleInputChange} placeholder="0" />
        {this.validator.message(
          "stock",
          this.state.form.stock[index+1],
          "required"
        )}
      </Form.Group>
      {index === this.state.productRows.length - 1 &&<button
        className="btn btn-primary mt-1 d-flex justify-content-center align-items-center"
        style={{width: "30px", height: "30px"}}
        onClick={this.addProductRow}
      >
        <i className="fa fa-plus pr-0"></i>
      </button>}
      {index === this.state.productRows.length - 1 &&<button
        className="btn btn-primary mt-1 ml-3 d-flex justify-content-center align-items-center"
        style={{width: "30px", height: "30px"}}
        onClick={this.removeProductRow}
      >
        <i className="fa fa-minus pr-0"></i>
      </button>}
    </Row>);

    this.setState({productRows: [...this.state.productRows, newRow]})
  }

  removeProductRow = () => {
    let productRows = this.state.productRows;
    let form = this.state.form;
    productRows.pop();
    form.color.pop();
    form.size.pop();
    form.stock.pop();
    this.setState({
      productRows: productRows,
      form: form
    })
  }

  render() {
    const { btnLoading, form, productRows } = this.state;
    const { show, formData } = this.props;

    return (
      <>
        <Modal size="lg" show={show} onHide={this.handleClose}>
          <Modal.Header>
            <Modal.Title>
              {formData && "Thay đổi thông tin sản phẩm"}
              {!formData && "Tạo sản phẩm mới"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row>
                <Form.Group as={Col} className="mb-3" controlId="productName">
                  <Form.Label className="required">Tên sản phẩm</Form.Label>
                  <Form.Control autoComplete="none" type="text" defaultValue={form.productName} onChange={this.handleInputChange} placeholder="Nhập tên sản phẩm" />
                  {this.validator.message(
                    "productName",
                    this.state.form.productName,
                    "required"
                  )}
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} className="mb-3" controlId="brand">
                  <Form.Label className="required">Nhãn hiệu</Form.Label>
                  <Form.Control autoComplete="none" type="text" defaultValue={form.brand} onChange={this.handleInputChange} placeholder="Nhãn hiệu" />
                  {this.validator.message(
                    "brand",
                    this.state.form.brand,
                    "required"
                  )}
                </Form.Group>
                <Form.Group as={Col} className="mb-3" controlId="category">
                  <Form.Label className="required">Phân loại</Form.Label>
                  <Form.Control as="select" value={form.category} onChange={this.handleInputChange} >
                    <option value=""></option>
                    <option value="Giày nam">Giày nam</option>
                    <option value="Giày nữ">Giày nữ</option>
                    <option value="Giày trẻ em">Giày trẻ em</option>
                  </Form.Control>
                  {this.validator.message(
                    "category",
                    this.state.form.category,
                    "required"
                  )}
                </Form.Group>
                <Form.Group as={Col} className="mb-3" controlId="price">
                  <Form.Label className="required">Giá bán</Form.Label>
                  <InputGroup>
                    <Form.Control autoComplete="none" type="number" min={0} defaultValue={form.price} onChange={this.handleInputChange} placeholder="0" />
                    <div className="input-group-append">
                      <span className="input-group-text bg-transparent p-1">đ</span>
                    </div>
                  </InputGroup>
                  {this.validator.message(
                    "price",
                    this.state.form.price,
                    "required"
                  )}
                </Form.Group>
                <Form.Group as={Col} className="mb-3" controlId="promotion">
                  <Form.Label className="required">Khuyến mãi</Form.Label>
                  <InputGroup>
                    <Form.Control autoComplete="none" type="number" min={0} defaultValue={form.promotion} onChange={this.handleInputChange} placeholder="0" />
                    <div className="input-group-append">
                      <span className="input-group-text bg-transparent p-1">%</span>
                    </div>
                  </InputGroup>
                  {this.validator.message(
                    "promotion",
                    this.state.form.promotion,
                    "required"
                  )}
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} xs={3} className="mb-0">
                  <Form.Label className="required">Size</Form.Label>
                </Form.Group>
                <Form.Group as={Col} xs={3} className="mb-0">
                  <Form.Label className="required">Màu sắc</Form.Label>
                </Form.Group>
                <Form.Group as={Col} xs={3} className="mb-0">
                  <Form.Label className="required">Số lượng</Form.Label>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} xs={3} className="mb-3" controlId="size">
                  <Form.Control autoComplete="none" type="number" bsPrefix="form-control 0" min={16} defaultValue={form.size[0]} onChange={this.handleInputChange} placeholder="0" />
                  {this.validator.message(
                    "size",
                    this.state.form.size[0],
                    "required"
                  )}
                </Form.Group>
                <Form.Group as={Col} xs={3} className="mb-3" controlId="color">
                  <Form.Control as="select" bsPrefix="form-control 0" value={form.color[0]} onChange={this.handleInputChange} >
                    <option value=""></option>
                    <option value="DE">Đen</option>
                    <option value="TR">Trắng</option>
                    <option value="XL">Xanh lục</option>
                    <option value="XB">Xanh biển</option>
                    <option value="DO">Đỏ</option>
                    <option value="BE">Be</option>
                    <option value="NA">Nâu</option>
                    <option value="TI">Tím</option>
                    <option value="VA">Vàng</option>
                    <option value="XA">Xám</option>
                    <option value="CA">Cam</option>
                    <option value="HO">Hồng</option>
                    <option value="XX">Khác</option>
                  </Form.Control>
                  {this.validator.message(
                    "color",
                    this.state.form.color[0],
                    "required"
                  )}
                </Form.Group>
                <Form.Group as={Col} xs={3} className="mb-3" controlId="stock">
                  <Form.Control autoComplete="none" type="number" bsPrefix="form-control 0" min={1} defaultValue={form.stock[0]} onChange={this.handleInputChange} placeholder="0" />
                  {this.validator.message(
                    "stock",
                    this.state.form.stock[0],
                    "required"
                  )}
                </Form.Group>
                {!form.id && productRows.length === 0 && <button
                  className="btn btn-primary mt-1 d-flex justify-content-center align-items-center"
                  style={{width: "30px", height: "30px"}}
                  onClick={this.addProductRow}
                >
                  <i className="fa fa-plus pr-0"></i>
                </button>}
              </Row>
              {!form.id && productRows.map((row,index) => row(index))}
              <Row>
                <Form.Group as={Col} className="mb-3" controlId="productPhotos">
                  <Form.Label className="required">Link ảnh sản phẩm</Form.Label>
                  <Form.Control autoComplete="none" type="text" defaultValue={form.productPhotos} onChange={this.handleInputChange} placeholder="https://photo1.com,https://photo2.com;... (2 url cách nhau bởi dấu ';')" />
                  {this.validator.message(
                    "productPhotos",
                    this.state.form.productPhotos,
                    "required"
                  )}
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
