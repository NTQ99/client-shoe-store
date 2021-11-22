import { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import DeliveryDialog from "./DeliveryDialog";

import axios from 'axios';

const BASE_DELIVERY_URL="https://dev-online-gateway.ghn.vn";
class DeliveryEditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      selectedRow: {
        id: this.props.row.id,
        deliveryUnitName: this.props.row.deliveryUnitName,
        token: this.props.row.token,
        shopId: this.props.row.shopId,
      }
    }
  }

  componentDidMount() {
    axios.get(BASE_DELIVERY_URL + "/shiip/public-api/v2/shop/all",{
      headers: {
        token: this.state.selectedRow.token
      }
    }).then(res => this.setState({shops: res.data.data.shops}))
  }

  showDelivery = (e) => {
    this.setState({
      selectedRow: {deliveryUnitName: e.target.value},
      shops: null,
    });
  };

  tokenHandle = (e) => {
    const el = document.getElementById("validate_token_edit");
    if (el.classList.contains('disabled')) {
      el.classList.remove('btn-success', 'btn-danger', 'disabled');
      el.classList.add('btn-secondary');
    }
    this.setState({
      selectedRow: {...this.state.selectedRow, token: e.target.value},
      shops: null
    });
  }

  getShops = (e) => {
    const el = e.currentTarget;
    this.setState({isLoading: true});
    axios.get(BASE_DELIVERY_URL + "/shiip/public-api/v2/shop/all",{
      headers: {
        token: this.state.selectedRow.token
      }
    }).then(res => {
      this.setState({
        isLoading: false,
        shops: res.data.data.shops,
        selectedRow: {...this.state.selectedRow, shopId: res.data.data.shops[0]._id}
      });
      el.classList.remove('btn-secondary');
      el.classList.add('btn-success', 'disabled');
    }).catch(() => {
      this.setState({isLoading: false});
      el.classList.remove('btn-secondary');
      el.classList.add('btn-danger', 'disabled');
    })
  }

  shopIdHandle = (e) => {
    this.setState({
      selectedRow: {...this.state.selectedRow, shopId: e.target.value}
    });
  }
  
  render() {
    const {selectedRow, shops, isLoading, showModal, handleOkModal, handleCloseModal, modalVariant, modalMessage} = this.state;
    return (<>
      <DeliveryDialog
        show={showModal}
        handleOk={handleOkModal}
        handleClose={handleCloseModal}
        variant={modalVariant}
        message={modalMessage}
      />
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header>
          <Modal.Title>Đơn vị vận chuyển {selectedRow.deliveryUnitName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            {/*begin: Select Input*/}
            <div className="row align-items-center mb-3">
              <div className="col-5 p-0">Chọn đơn vị vận chuyển</div>
              <div className="col-7 p-0">
                <select
                  className="form-control"
                  id="select_delivery_edit"
                  value={selectedRow.deliveryUnitName}
                  onChange={this.showDelivery}
                >
                  <option value={""}>Chọn</option>
                  <option value={"GHN"}>Giao hàng nhanh</option>
                  <option value={"VTP"}>Viettel Post</option>
                  <option value={"J&T"}>J&T</option>
                </select>
              </div>
            </div>
            {/*end::Select Input*/}
            {selectedRow.deliveryUnitName==="GHN" && (
              <>
                <div className="row align-items-center justify-content-end">
                  <div className="text-muted">
                    Bạn chưa có mã?&nbsp;
                    <a
                      href="https://khachhang.ghn.vn"
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary"
                    >
                      Đăng ký
                    </a>
                  </div>
                </div>
                <div className="row align-items-center mb-9">
                  <div className="col-4 p-0">Nhập mã bí mật</div>
                  <div className="col-8 p-0 input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Mã do đơn vị vận chuyển cung cấp"
                      value={selectedRow.token}
                      onChange={this.tokenHandle}
                    />
                    <div className="input-group-append">
                      <a
                        className="btn btn-secondary btn-icon"
                        id="validate_token_edit"
                        onClick={this.getShops}
                      >
                        {!isLoading && (
                          <span className="svg-icon svg-icon-md">
                            <i className="bi bi-patch-check"></i>
                          </span>
                        )}
                        {isLoading && (
                          <div
                            className="spinner-border spinner-border-sm"
                            role="status"
                          ></div>
                        )}
                      </a>
                    </div>
                  </div>
                </div>
                {shops && (
                  <div className="row align-items-center">
                    <div className="col-4 p-0">Chọn mã cửa hàng</div>
                    <div className="col-8 p-0 input-group">
                      <select
                        className="form-control"
                        onChange={this.shopIdHandle}
                        defaultValue={selectedRow.shopId}
                      >
                        {shops.map((shop, index) => (
                          <option
                            value={shop._id}
                          >
                            {shop._id + " | " + shop.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button autoFocus variant="secondary" onClick={this.props.handleClose}>
            Hủy bỏ
          </Button>
          {selectedRow.token && shops && selectedRow.shopId && <Button variant="primary" disabled={this.props.btnLoading? true: false} onClick={() => this.props.updateDelivery(selectedRow)}>
            {this.props.btnLoading && (
              <span className="spinner-border spinner-border-sm"></span>
              )}
            {!this.props.btnLoading && "Lưu"}
          </Button>}
        </Modal.Footer>
      </Modal>
    </>);
  }
};

export default DeliveryEditForm;
