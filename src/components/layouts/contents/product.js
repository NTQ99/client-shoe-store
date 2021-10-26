import React, { Component } from "react";
import { Card, Table } from "react-bootstrap";

import {
  getPaginationOptions,
  productColumns,
} from "../../../config/configTable";

import CustomTable from "../table/CustomTable";

import SVG from "react-inlinesvg";

import productService from "../../../service/product.service";
import GeneralDialog from "../modal/GeneralDialog";
import ProductForm from "../modal/ProductForm";

const SearchInput = (props) => {
  const { onSearch } = props;
  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };
  return (
    <div className="row align-items-center">
      <div className="col-md-3 my-2 my-md-0">
        <div className="input-icon">
          <input
            type="text"
            className="form-control"
            placeholder="Nhập tên, mã sản phẩm,..."
            autoComplete="nope"
            onChange={handleSearchChange}
          />
          <span>
            <i className="flaticon2-search-1 text-muted" />
          </span>
        </div>
        <small className="form-text text-muted">
          Tìm theo <b>Tất cả cột</b>
        </small>
      </div>
    </div>
  );
};

const OrderToolbar = (onCreateHandle) => {
  return (
    <button className="btn btn-primary font-weight-bolder" onClick={onCreateHandle}>
      <span className="svg-icon svg-icon-md">
        <SVG src="assets/media/svg/icons/Design/Flatten.svg" />
      </span>
      Tạo mới
    </button>
  );
};

const expandRow = {
  renderer: (row) => (
    <Card>
      <Card.Body>
        <Table className="mb-0" style={{ borderBottom: "1px solid #ebedf3" }}>
          <tbody>
            <tr>
              <td className="title-style" style={{width: '130px'}}>Giá lẻ</td>
              <td>{row.price[1] + " VND"}</td>
              <td colSpan="2">
                <span
                  className="title-style"
                  style={{ display: "inline-block", width: "120px" }}
                >
                  Giá sỉ
                </span>
                <span>{row.price[2] + " VND"}</span>
              </td>
            </tr>
            <tr>
              <td className="title-style">Trọng lượng</td>
              <td colSpan="3">{`${row.weight} gram`}</td>
            </tr>
            <tr>
              <td className="title-style">Chi tiết</td>
              <td>
                <img src={row.productPhotos[0]} width="250" />
              </td>
              <td colSpan="2" className="align-top">
                {row.productDetail.split("\n").map(v => <>{v}<br/></>)}
              </td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  ),
  showExpandColumn: true,
  onlyOneExpanding: true,
  expandHeaderColumnRenderer: ({ isAnyExpands }) => {
    if (isAnyExpands) {
      return (
        <div
          className="btn btn-sm btn-clean btn-icon active"
          style={{ width: "20px", height: "20px" }}
        >
          <span className="svg-icon svg-icon-md">
            <i className="las la-minus-square"></i>
          </span>
        </div>
      );
    }
    return (
      <div
        className="btn btn-sm btn-clean btn-icon"
        style={{ width: "20px", height: "20px" }}
      >
        <span className="svg-icon svg-icon-md">
          <i class="lar la-plus-square"></i>
        </span>
      </div>
    );
  },
  expandColumnRenderer: ({ expanded }) => {
    if (expanded) {
      return (
        <div
          className="btn btn-sm btn-clean btn-icon active"
          style={{ width: "20px", height: "20px" }}
        >
          <span className="svg-icon svg-icon-md">
            <i className="las la-caret-down"></i>
          </span>
        </div>
      );
    }
    return (
      <div
        className="btn btn-sm btn-clean btn-icon"
        style={{ width: "20px", height: "20px" }}
      >
        <span className="svg-icon svg-icon-md">
          <i className="las la-caret-right"></i>
        </span>
      </div>
    );
  },
};

const defaultSorted = [
  {
    dataField: "createdAt",
    order: "desc",
  },
];

class CustomerContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      dialogProps: {
        show: false,
      },
      formProps: {
        show: false,
      },
      entities: [],
    };
  }

  async componentDidMount() {
    await this.fetchData();
  }

  async fetchData() {
    this.setState({ isLoading: true });
    await productService.getProductBoard().then(async (res) => {
      this.setState({ entities: res.data.data });
    });
    this.setState({ isLoading: false });
  }

  openResponseDialog = async (cb) => {
    await cb.then(res => {
      this.fetchData();
      this.setState({
        dialogProps: {
          show: true,
          handleOk: () => this.setState({dialogProps:{...this.state.dialogProps, show: false}}),
          variant: "success",
          message: res.data.error.message
        }
      })
    }).catch(error => this.setState({
      dialogProps: {
        show: true,
        handleOk: () => this.setState({dialogProps:{...this.state.dialogProps, show: false}}),
        variant: "error",
        message: error.message
      }
    })) 
  }

  deleteProduct = async (id) => {
    await this.openResponseDialog(productService.deleteProduct(id));
  }
  createProduct = async (data) => {
    await this.openResponseDialog(productService.createProduct(data));
    this.setState({formProps:{...this.state.formProps, show: false}});
  }
  updateProduct = async (data) => {
    await this.openResponseDialog(productService.updateProduct(data));
    this.setState({formProps:{...this.state.formProps, show: false}});
  }

  openCreateProductForm = () => {
    this.setState({
      formProps: {
        show: true,
        handleOk: this.createProduct,
        handleClose: () => this.setState({formProps:{show: false}}),
      },
    })
  }
  openEditProductForm = (data) => {
    this.setState({
      formProps: {
        show: true,
        formData: data,
        handleOk: this.updateProduct,
        handleClose: () => this.setState({formProps:{show: false}}),
      },
    })
  }
  openDeleteProductDialog = (id) => {
    this.setState({
      dialogProps: {
        show: true,
        handleClose: () => this.setState({dialogProps:{...this.state.dialogProps, show: false}}),
        handleOk: () => this.deleteProduct(id),
        variant: "danger",
        message: "Dữ liệu các đơn hàng liên quan đến sản phẩm này có thể sẽ bị ảnh hưởng. Bạn có chắc chắn muốn xóa sản phẩm này?"
      }
    })
  }

  render() {
    const { dialogProps, formProps, entities, isLoading } = this.state;
    const columns = productColumns(this);
    const options = getPaginationOptions(entities.length);
    return (
      <CustomTable
        title="Danh sách sản phẩm"
        loading={isLoading}
        options={options}
        entities={entities}
        columns={columns}
        Search={SearchInput}
        Toolbar={() => OrderToolbar(this.openCreateProductForm)}
        expandRow={expandRow}
        defaultSorted={defaultSorted}
        rowStyle={{ cursor: "pointer" }}
      >
        <ProductForm { ...formProps } />
        <GeneralDialog { ...dialogProps } />
      </CustomTable>
    );
  }
}

export default CustomerContent;
