import React, { Component } from "react";
import { Card, Table, Dropdown, ButtonGroup } from "react-bootstrap";

import {
  getPaginationOptions,
  customerColumns,
  orderHistoryColumns,
} from "../../../config/configTable";

import CustomTable from "../table/CustomTable";

import SVG from "react-inlinesvg";

import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

import customerService from "../../../service/customer.service";
import RowExpandTable from "../table/RowExpandTable";
import GeneralDialog from "../modal/GeneralDialog";
import CustomerForm from "../modal/CustomerForm";

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
  return (props) => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const handleExportClick = () => {
      let jsonData = [...props.baseProps.data];
      const headers = {
        recordId: "#",
        orderCode: "Mã đơn hàng",
        customerName: "Tên khách hàng",
        customerPhone: "SĐT khách hàng",
        priceType: "Phân loại",
        totalPrice: "Tổng giá trị",
        deliveryUnitName: "Đơn vị vận chuyển",
        shipFee: "Phí vận chuyển",
        deliveryTo: "Địa chỉ",
        status: "Trạng thái",
        createdAt: "Thời gian tạo",
        note: "Ghi chú",
      };

      jsonData = jsonData.map((el, index) => {
        let newJson = new Object();
        Object.keys(headers).forEach((header) => {
          switch (header) {
            case "recordId":
              newJson[header] = index + 1;
              break;
            case "priceType":
              newJson[header] = el[header] === 1 ? "Đơn lẻ" : "Đơn sỉ";
              break;
            case "deliveryTo":
              newJson[
                header
              ] = `${el.deliveryTo.detail}; ${el.deliveryTo.ward}, ${el.deliveryTo.district}, ${el.deliveryTo.province}`;
              break;
            case "createdAt":
              newJson[header] = new Date(el[header]);
              break;
            default:
              newJson[header] = el[header];
              break;
          }
        });
        return newJson;
      });

      jsonData.unshift(headers);

      const ws = XLSX.utils.json_to_sheet(jsonData, { skipHeader: true });

      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(data, "DS_Đơn_hàng" + fileExtension);
    };
    return (
      <>
        <div
          className="btn btn-light-primary font-weight-bolder mr-2"
          onClick={handleExportClick}
        >
          <span className="svg-icon svg-icon-md">
            <SVG src="assets/media/svg/icons/Files/ExportFile.svg" />
          </span>
          Xuất file
        </div>
        {/*begin::Button*/}
        <button
          className="btn btn-primary font-weight-bolder"
          onClick={onCreateHandle}
        >
          <span className="svg-icon svg-icon-md">
            <SVG src="assets/media/svg/icons/Design/Flatten.svg" />
          </span>
          Tạo mới
        </button>
        {/*end::Button*/}
      </>
    );
  };
};

const defaultSorted = [
  {
    dataField: "createdAt",
    order: "desc",
  },
];

const expandRow = {
    renderer: (row) => {
      return (
        <RowExpandTable id={row.id} />
      )
    },
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
            <i className="lar la-plus-square"></i>
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
    await customerService.getCustomerBoard().then(async (res) => {
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

  deleteCustomer = async (id) => {
    await this.openResponseDialog(customerService.deleteCustomer(id));
  }
  createCustomer = async (data) => {
    await this.openResponseDialog(customerService.createCustomer(data));
    this.setState({formProps:{...this.state.formProps, show: false}});
  }
  updateCustomer = async (data) => {
    await this.openResponseDialog(customerService.updateCustomer(data));
    this.setState({formProps:{...this.state.formProps, show: false}});
  }

  openCreateCustomerForm = () => {
    this.setState({
      formProps: {
        show: true,
        handleOk: this.createCustomer,
        handleClose: () => this.setState({formProps:{show: false}}),
      },
    })
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
  openDeleteCustomerDialog = (id) => {
    this.setState({
      dialogProps: {
        show: true,
        handleClose: () => this.setState({dialogProps:{...this.state.dialogProps, show: false}}),
        handleOk: () => this.deleteCustomer(id),
        variant: "danger",
        message: "Dữ liệu các đơn hàng liên quan đến khách hàng này có thể sẽ bị ảnh hưởng. Bạn có chắc chắn muốn xóa khách hàng này?"
      }
    })
  }

  render() {
    const {entities, isLoading, dialogProps, formProps} = this.state;
    const columns = customerColumns(this);
    const options = getPaginationOptions(entities.length);
    return (
      <CustomTable
        title="Danh sách khách hàng"
        loading={isLoading}
        options={options}
        entities={entities}
        columns={columns}
        Search={SearchInput}
        Toolbar={OrderToolbar(this.openCreateCustomerForm)}
        expandRow={expandRow}
        defaultSorted={defaultSorted}
        rowStyle={{ cursor: "pointer" }}
      >
        <CustomerForm { ...formProps } />
        <GeneralDialog { ...dialogProps } />
      </CustomTable>
    );
  }
}

export default CustomerContent;
