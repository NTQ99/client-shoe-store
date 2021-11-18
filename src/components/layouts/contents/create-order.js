import React, { Component } from "react";
import { withRouter } from "react-router";

import { Card, Form, Col, Row, Dropdown, InputGroup, Button } from "react-bootstrap";
import { orderProductColumns } from "../../../config/configTable";
import { addressData } from "../../../config/dvhcvn";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { CSVExport } from "react-bootstrap-table2-toolkit";

import customerService from "../../../service/customer.service";
import productService from "../../../service/product.service";

import CreatableSelect from "react-select/creatable"
import Select from "react-select"
import orderService from "../../../service/order.service";
import GeneralDialog from "../modal/GeneralDialog";

class CreateOrderContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogProps: {
        show: false,
      },
      customerPhone: "",
      customerEmail: "",
      customerName: "",
      deliveryTo: {},
      addressList: {district: [], ward: []},
      customerLoading: false,
      productLoading: false,
      btnLoading: false,
      customerList: [],
      productList: [],
      totalPrice: 0,
      paid: 0,
      shipFee: 0,
      promotion: 0,
      products: [],
    };
  }

  componentDidMount() {
    this.loadCustomerOptions();
    this.loadProductOptions();
  }

  calcPrice = (row) => {
    let totalPrice = this.state.totalPrice;
    this.state.products.forEach((product) => {
      if (product.productId === row.productId) {
        product.quantity = row.quantity;
        totalPrice += product.price * row.quantity - product.totalMoney
        product.totalMoney = product.price * row.quantity;
      }
    });
    this.setState({ products: [...this.state.products], totalPrice: totalPrice});
  };

  loadCustomerOptions = async () => {
    this.setState({customerLoading: true});
    await customerService.getCustomerBoard().then((res) => res.data.data)
    .then(async data => {
      let customerList=[];
      await data.forEach((customer, index) => customerList.push({
        id: customer.id,
        value: index,
        label: customer.customerName,
        customerName: customer.customerName,
        customerPhone: customer.customerPhone || "",
        customerEmail: customer.customerEmail || "",
        defaultAddress: customer.customerAddresses[customer.defaultAddressId]
      }));
      this.setState({customerList: customerList});
    });
    this.setState({customerLoading: false});
  };

  loadProductOptions = async () => {
    this.setState({productLoading: true});
    await productService.getProductBoard().then((res) => res.data.data)
    .then(async data => {
      let productList=[];
      await data.forEach((product, index) => productList.push({
        productId: product.id,
        value: index,
        label: product.productName,
        productName: product.productName,
        stock: product.stock,
        price: product.price,
      }));
      this.setState({productList: productList});
    });
    this.setState({productLoading: false});
  };

  onAddressSelect = (e) => {
    let deliveryTo = this.state.deliveryTo;
    let addressListRow = this.state.addressList;
    switch (e.target.id) {
      case "addressProvince":
        document.getElementById("addressDistrict").value = "-1";
        document.getElementById("addressProvince").classList.remove("border-warning");
        const provinceId = e.target.value;
        let province = e.target.options[e.target.selectedIndex].text;
        let districtList = [];
        if (provinceId !== "-1") {
          districtList = addressData.find((el) => el.level1_id === provinceId).level2s;
        } else province = null;
        deliveryTo = {
          ...deliveryTo,
          provinceId: provinceId,
          province: province,
          districtId: null,
          district: null,
          wardId: null,
          ward: null
        };
        addressListRow = {
          district: districtList,
          ward: []
        };
        this.setState({
          deliveryTo: deliveryTo,
          addressList: addressListRow
        });
        break;
      case "addressDistrict":
        document.getElementById("addressWard").value = "-1";
        document.getElementById("addressDistrict").classList.remove("border-warning");
        const districtId = e.target.value;
        let district = e.target.options[e.target.selectedIndex].text;
        let wardList = [];
        if (districtId !== "-1") {
          wardList = addressData.find(el => el.level1_id === this.state.deliveryTo.provinceId).level2s
                                    .find(el => el.level2_id === districtId).level3s;
        } else district = null;
        deliveryTo = {
          ...deliveryTo,
          districtId: districtId,
          district: district,
          wardId: null,
          ward: null,
        }
        addressListRow = {
          ...addressListRow,
          ward: wardList
        }
        this.setState({
          deliveryTo: deliveryTo,
          addressList: addressListRow
        });
        break;
      case "addressWard":
        document.getElementById("addressWard").classList.remove("border-warning");
        const wardId = e.target.value;
        let ward = e.target.options[e.target.selectedIndex].text;
        if (wardId === "-1") ward = null;
        deliveryTo = {
          ...deliveryTo,
          wardId: wardId,
          ward: ward
        }
        this.setState({
          deliveryTo: deliveryTo
        });
        break;
      default:
        const detail = e.target.value;
        deliveryTo = {
          ...deliveryTo,
          detail: detail,
        }
        this.setState({
          deliveryTo: deliveryTo
        });
        break;
    }
  }

  handleCustomerSelect = (value) => {
    console.log(value)
    if (value.customerName) {
      let provinceObject = {level1_id: "-1"};
      let districtObject = {level2_id: "-1"};
      let wardObject = {level3_id: "-1"};
      let addressList = {
        district: [],
        ward: []
      }
      if (value.defaultAddress) {
        provinceObject = addressData.find((province) => province.name === value.defaultAddress.province);
        districtObject = provinceObject.level2s.find((district) => district.name === value.defaultAddress.district);
        wardObject = districtObject.level3s.find((ward) => ward.name === value.defaultAddress.ward);
        addressList = {
          district: provinceObject.level2s,
          ward: districtObject.level3s
        }
      }
      let deliveryTo = {
        provinceId: provinceObject.level1_id,
        province: provinceObject.name,
        districtId: districtObject.level2_id,
        district: districtObject.name,
        wardId: wardObject.level3_id,
        ward: wardObject.name,
        detail: value.defaultAddress? (value.defaultAddress.detail || "") : "",
      }
      this.setState({
        customerId: value.id,
        customerName: value.customerName,
        customerPhone: value.customerPhone || "",
        customerEmail: value.customerEmail || "",
        addressList: addressList,
        deliveryTo: deliveryTo
      });
      document.getElementById("customerPhone").value = value.customerPhone;
      document.getElementById("customerEmail").value = value.customerEmail;
      document.getElementById("addressProvince").value = deliveryTo.provinceId;
      document.getElementById("addressDistrict").value = deliveryTo.districtId;
      document.getElementById("addressWard").value = deliveryTo.wardId;
    } else {
      this.setState({
        customerName: value.value,
        customerPhone: null,
        deliveryTo: {},
        addressList: {district: [], ward: []},
      });
      document.getElementById("customerPhone").value = null;
    }
  }

  handleProductSelect = async (value) => {
    let currentProducts = this.state.products;
    let totalPrice = 0;

    await value.forEach((selectedProduct, index) => {
      if (!currentProducts.find(product => product.productId === selectedProduct.productId)) {
        currentProducts.push({});
        currentProducts[currentProducts.length-1] = {
          ...selectedProduct,
          quantity: 1,
          totalMoney: selectedProduct.price
        }
      }
    });
    await currentProducts.forEach((currentProduct, index) => {
      if (!value.find(product => product.productId === currentProduct.productId)) {
        currentProducts.splice(index, 1);
      } else {
        totalPrice += currentProduct.totalMoney;
      }
    })

    this.setState({
      product: currentProducts,
      totalPrice: totalPrice
    })
  }

  openResponseDialog = async (cb) => {
    await cb.then(res => {
        if (res.data.error.statusCode === 102) this.showSuccess(res.data.error.message);
        else this.showError(res.data.error.message);
      }).catch(error => this.showError(error.message)) 
  }

  showSuccess = (message) => {
    this.setState({
      btnLoading: false,
      dialogProps: {
        show: true,
        handleOk: () => {
          this.setState({dialogProps:{...this.state.dialogProps, show: false}})
          this.props.history.push("/order");
        },
        variant: "success",
        message: message
      }
    })
  }

  showError = (message) => {
    this.setState({
      btnLoading: false,
      dialogProps: {
        show: true,
        handleOk: () => this.setState({dialogProps:{...this.state.dialogProps, show: false}}),
        variant: "error",
        message: message
      }
    })
  }

  onOrderSubmit = async () => {
    this.setState({btnLoading: true});
    await this.openResponseDialog(orderService.createOrder({
      customerId: this.state.customerId,
      customerName: this.state.customerName,
      customerPhone: this.state.customerPhone,
      products: this.state.products,
      deliveryTo: this.state.deliveryTo,
      totalPrice: this.state.totalPrice,
      codAmount: this.state.totalPrice * (100 - this.state.promotion) / 100 - this.state.paid,
    }))
  }

  render() {
    let products = this.state.products;
    let columns = [
      ...orderProductColumns(this),
    ];
    const {dialogProps, customerLoading, customerList, customerPhone, customerEmail, productLoading, productList, deliveryTo, addressList, deliveryUnitName, shipFee, totalPrice, promotion, paid, btnLoading} = this.state;
    return (
      <Form>
        <GeneralDialog { ...dialogProps } />
        <Row>
          <Col md={8}>
            <Card className="gutter-b">
              <Card.Header>
                <Card.Title className="mb-0">Thông tin khách hàng</Card.Title>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Form.Group
                    as={Col}
                    className="mb-2"
                  >
                    <Form.Label>Tên khách hàng</Form.Label>
                    <CreatableSelect components={{DropdownIndicator:() => null, IndicatorSeparator:() => null}}
                      classNamePrefix="input"
                      isLoading={customerLoading}
                      loadingMessage={()=> "Đang tải"}
                      noOptionsMessage={() => "Không có dữ liệu"}
                      options={customerList}
                      placeholder="Nhập tên khách hàng"
                      formatCreateLabel={(inputText) => `Thêm mới "${inputText}"`}
                      onChange={this.handleCustomerSelect}
                    />
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group
                    as={Col}
                    className="mb-2"
                    controlId="customerPhone"
                    onChange={(e) => this.setState({customerPhone: e.target.value})}
                  >
                    <Form.Label>Số điện thoại</Form.Label>
                    <Form.Control
                      defaultValue={customerPhone}
                      type="phone"
                      placeholder="0123456789"
                      autoComplete="off"
                    />
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    className="mb-2"
                    controlId="customerEmail"
                    onChange={(e) => this.setState({customerEmail: e.target.value})}
                  >
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      defaultValue={customerEmail}
                      type="phone"
                      placeholder="example@domain.com"
                      autoComplete="off"
                    />
                  </Form.Group>
                </Row>
                <Form.Text muted style={{ fontSize: "100%" }}>
                  Nhập ô để tìm kiếm hoặc tạo mới khách hàng.
                </Form.Text>
              </Card.Body>
            </Card>
            <Card className="gutter-b">
              <Card.Header>
                <div className="w-100 d-flex justify-content-between flex-row align-items-center">
                  <Card.Title className="mb-0">Sản phẩm</Card.Title>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="w-100 d-flex justify-content-between flex-row align-items-center">
                  <div className="w-100">
                    <Select
                      components={{
                        DropdownIndicator: () => (<div className="input-prefix-icon"><i className="flaticon2-search-1 text-muted" /></div>),
                      }}
                      classNamePrefix="input"
                      isLoading={productLoading}
                      loadingMessage={()=> "Đang tải"}
                      noOptionsMessage={() => "Không có dữ liệu"}
                      options={productList}
                      placeholder="Nhập tên sản phẩm"
                      formatCreateLabel={(inputText) => `Thêm mới "${inputText}"`}
                      onChange={this.handleProductSelect}
                      isMulti
                    />
                  </div>
                </div>
                <ToolkitProvider
                  keyField="productId"
                  data={products}
                  columns={columns}
                  exportCSV
                >
                  {(props) => (
                    <BootstrapTable
                      {...props.baseProps}
                      wrapperClasses="table-responsive"
                      bordered={false}
                      classes="table table-head-custom table-vertical-center overflow-scroll"
                      bootstrap4
                      noDataIndication="Nhập tên sản phẩm và chọn"
                      // remote
                    />
                  )}
                </ToolkitProvider>
                <Form.Text muted style={{ fontSize: "100%" }}>
                  Chọn và nhập số lượng để thay đổi.
                </Form.Text>
              </Card.Body>
            </Card>
            <Card className="gutter-b">
              <Card.Header>
                <Card.Title className="mb-0">Địa chỉ giao hàng</Card.Title>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Form.Group
                    as={Col}
                    controlId="addressProvince"
                    className="mb-2"
                    onChange={this.onAddressSelect}
                  >
                    <Form.Label>Tỉnh/Thành phố</Form.Label>
                    <Form.Control as="select" value={deliveryTo.provinceId || "-1"} >
                      <option value={"-1"}>Chọn</option>
                      {addressData.map((province) => (
                        <option value={province.level1_id}>
                          {province.name}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    controlId="addressDistrict"
                    className="mb-2"
                    onChange={this.onAddressSelect}
                  >
                    <Form.Label>Quận/Huyện</Form.Label>
                    <Form.Control as="select" value={deliveryTo.districtId}>
                      <option value={"-1"}>Chọn</option>
                      {addressList.district.map((district) => (
                            <option value={district.level2_id}>{district.name}</option>
                          ))}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    controlId="addressWard"
                    className="mb-2"
                    onChange={this.onAddressSelect}
                  >
                    <Form.Label>Xã/Phường</Form.Label>
                    <Form.Control as="select" value={deliveryTo.wardId}>
                      <option value={"-1"}>Chọn</option>
                      {addressList.ward.map((ward) => (
                        <option value={ward.level3_id}>{ward.name}</option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group
                    as={Col}
                    controlId="addressDetail"
                    className="mb-2"
                    onBlur={this.onAddressSelect} 
                  >
                    <Form.Label>Địa chỉ cụ thể</Form.Label>
                    <Form.Control defaultValue={deliveryTo.detail} placeholder="Số nhà, tên tòa nhà, tên đường, tên khu vực" />
                  </Form.Group>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="position-fixed" style={{ marginRight: "25px" }}>
              <Card.Header>
                <Card.Title className="mb-0">Thông tin thanh toán</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form.Group
                  as={InputGroup}
                  controlId="promotion"
                  className="mb-2"
                  onChange={(e) => this.setState({promotion: e.target.value})}
                >
                  <div className="input-group-prepend" style={{ width: "30%" }}>
                    <InputGroup.Text className="w-100">
                      Chiết khấu:
                    </InputGroup.Text>
                  </div>
                  <Form.Control placeholder="0" type="number" />
                  <div className="input-group-append" style={{ width: "10%" }}>
                    <InputGroup.Text className="w-100">%</InputGroup.Text>
                  </div>
                </Form.Group>
                <Form.Group as={InputGroup} className="mb-5" controlId="paid" onChange={(e) => this.setState({paid: e.target.value})}>
                  <div className="input-group-prepend" style={{ width: "30%" }}>
                    <InputGroup.Text className="w-100">
                      Đã trả:
                    </InputGroup.Text>
                  </div>
                  <Form.Control placeholder="0" min={0} type="number" />
                  <div className="input-group-append" style={{ width: "10%" }}>
                    <InputGroup.Text className="w-100">đ</InputGroup.Text>
                  </div>
                </Form.Group>

                <div className="d-flex justify-content-between mb-5">
                  <span>Tổng tiền:</span>
                  <span>{totalPrice * (100 - promotion) / 100 + shipFee} đ</span>
                </div>
                <div className="d-flex justify-content-between mb-5">
                  <span>Khách trả:</span>
                  <span>{totalPrice * (100 - promotion) / 100 - paid + shipFee} đ</span>
                </div>
                
                <div className="d-flex justify-content-center">
                  <Button variant="primary" onClick={this.onOrderSubmit}>
                    {btnLoading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    {!btnLoading && "Tạo đơn"}
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default withRouter(CreateOrderContent);
