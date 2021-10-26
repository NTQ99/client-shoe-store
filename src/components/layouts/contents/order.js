import React, { Component } from "react";
import { Card, Table, ButtonGroup, Dropdown } from "react-bootstrap";
import moment from "moment";
import DateRangePicker from "react-bootstrap-daterangepicker";

import { getPaginationOptions, orderColumns } from "../../../config/configTable";
import orderService from "../../../service/order.service";

import CustomTable from "../table/CustomTable";

import SVG from 'react-inlinesvg';

import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

import {getTimeFormat, Timer} from '../../../service/helper';
import GeneralDialog from "../modal/GeneralDialog";
import SendOrderForm from "../modal/SendOrderForm";

const orderStatus = {
  wait_confirm: "Chờ xác nhận",
  not_responded: "Không phản hồi",
  canceled: "Đã hủy",
  success: "Giao thành công",
  await_trans: "Chờ vận chuyển",
  fail: "Giao thất bại"
};

const SearchInput = (props) => {
  const {onFilter, reloadTime, reloadData, isTableLoading} = props;
  return (props) => {
    const {onSearch} = props;
    const handleSearchChange = (e) => {
      onSearch(e.target.value);
    };
    const handleFilterChange = (e) => {
      onFilter.onStatusFilter(e.target.value);
    };
    const dateRange = {
      start: moment().startOf("month"),
      end: moment().endOf("date"),
    };
    const handleDateRangeChange = (start, end) => {
      onFilter.onDateRangeFilter({
        start: start.valueOf(),
        end: end.valueOf()
      })
    }
    return (
      <div className="row align-items-center">
        <div className="col-md-3 my-2 my-md-0">
          <div className="input-group">
            <div className="input-group-append">
              <span className="input-group-text" style={{borderRadius: '.42rem 0 0 .42rem'}}>
                <i className="la la-calendar-check-o"></i>
              </span>
            </div>
            {/* begin::DateRangePicker */}
            <DateRangePicker
              initialSettings={{
                autoApply: true,
                startDate: dateRange.start,
                endDate: dateRange.end,
                locale: {
                  direction: "ltr",
                  format: "DD/MM/YYYY",
                  separator: " - ",
                  applyLabel: "Đồng ý",
                  cancelLabel: "Hủy bỏ",
                  customRangeLabel: "Tùy chọn",
                },
                ranges: {
                  "Tháng này": [
                    moment().startOf("month"),
                    moment().endOf("date"),
                  ],
                  "Năm nay": [
                    moment().startOf("year"),
                    moment().endOf("date"),
                  ],
                  "Tháng trước": [
                    moment().subtract(1, "month").startOf("month"),
                    moment().subtract(1, "month").endOf("month"),
                  ],
                  "Nửa năm trước": [
                    moment().subtract(6, "month").startOf("month"),
                    moment().subtract(1, "month").endOf("month"),
                  ],
                },
              }}
              onCallback={handleDateRangeChange}
            >
              <input
                type="text"
                className="form-control"
                readonly
                placeholder="Chọn khoảng ngày"
              />
            </DateRangePicker>
            {/* end::DateRangePicker */}
          </div>
          <small className="form-text text-muted">
            Tìm theo <b>Thời gian tạo</b>
          </small>
        </div>
        <div className="col-md-3 my-2 my-md-0">
          <div className="input-icon">
            <input
              type="text"
              className="form-control"
              placeholder="Nhập họ tên, SĐT,..."
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
        <div className="col-md-2 my-2 my-md-0">
          <div className="d-flex align-items-center">
            <select className="form-control" onChange={handleFilterChange}>
              <option value={""}>Tất cả</option>
              {Object.keys(orderStatus).map((status) => (
                <option value={status}>{orderStatus[status]}</option>
              ))}
            </select>
          </div>
          <small className="form-text text-muted">
            Tìm theo <b>Trạng thái</b>
          </small>
        </div>
        <div className="col-md-4 my-2 my-md-0 d-flex align-items-center justify-content-end">
          <span className="text-muted font-italic" style={{fontSize: '11.7px'}}>Đã cập nhật {getTimeFormat(reloadTime, "dd/mm HH:MM")}</span>
          <span className="btn btn-sm btn-clean btn-icon ml-2 mb-1" style={{width: '20px', height: '20px'}} onClick={reloadData}>
            <i className={`bi bi-arrow-repeat${isTableLoading? " fa-spin": ""}`}></i>
          </span>
        </div>
      </div>
    );
  }
};

const OrderToolbar = (props) => {
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
      note: "Ghi chú"
    }
    
    jsonData = jsonData.map((el, index) => {
      let newJson = new Object();
      Object.keys(headers).forEach((header) => {
        switch(header) {
          case "recordId":
            newJson[header] = index + 1;
            break;
          case "priceType":
            newJson[header] = (el[header] === 1)? "Đơn lẻ": "Đơn sỉ";
            break;
          case "status":
            newJson[header] = orderStatus[el[header]];
            break;
          case "deliveryTo":
            newJson[header] = `${el.deliveryTo.detail}; ${el.deliveryTo.ward}, ${el.deliveryTo.district}, ${el.deliveryTo.province}`;
            break;
          case "createdAt":
            newJson[header] = new Date(el[header]);
            break;
          default:
            newJson[header] = el[header]
            break;
        }
      });
      return newJson;
    });

    jsonData.unshift(headers);
    
    const ws = XLSX.utils.json_to_sheet(jsonData, {skipHeader: true});
    
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, "DS_Đơn_hàng" + fileExtension);
  };
  return (<>
    <Dropdown as={ButtonGroup} className="mr-2">
      <Dropdown.Toggle variant="light" className="font-weight-bolder">
        <span className="svg-icon svg-icon-md">
          <SVG src="assets/media/svg/icons/Devices/Printer.svg" />
        </span>
        In
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.ItemText className="font-weight-bolder text-uppercase font-size-sm text-primary pb-2">
          Tùy chọn:
        </Dropdown.ItemText>
        <Dropdown.Item>
          <div className="symbol symbol-20 mr-5">
            <i className="la la-print" />
            <i className="symbol-badge bg-success" style={{width: '10px', height: '10px', top: '-5px', right: '-5px'}}></i>
          </div>
          Toàn bộ
        </Dropdown.Item>
        <Dropdown.Item>
          <div className="symbol symbol-20 mr-5">
            <i className="la la-print" />
            <i className="symbol-badge bg-danger" style={{width: '10px', height: '10px', top: '-5px', right: '-5px'}}></i>
          </div>
          Đơn mới
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
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
    <a
    href="/create-order"
    className="btn btn-primary font-weight-bolder"
  >
    <span className="svg-icon svg-icon-md">
      <SVG src="assets/media/svg/icons/Design/Flatten.svg" />
    </span>
    Tạo mới
  </a>
  {/*end::Button*/}</>
  );
}

const expandRow = {
  renderer: (row) => (
    <Card>
      <Card.Body>
      <Table className="mb-0" style={{borderBottom: '1px solid #ebedf3'}}>
      <tbody>
    <tr>
      <td className="title-style">Phân loại</td>
      <td>{(row.priceType === 1)? "Đơn lẻ": "Đơn sỉ"}</td>
      <td colSpan="2">
        <span className="title-style" style={{display: 'inline-block', width: '120px'}}>Tiền COD</span>
        <span>{row.codAmount.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</span>
      </td>
    </tr>
    {row.products.map((product, index) => (
      <tr>
        <td className="title-style">{(index===0)? "Sản phẩm": ""}</td>
        <td>{product.productName}</td>
        <td colSpan="2">{`Số lượng: ${product.quantity}`}</td>
    </tr>
    ))}
    <tr>
      <td className="title-style">Địa chỉ</td>
      <td colSpan="3">{`${row.deliveryTo.detail}; ${row.deliveryTo.ward}, ${row.deliveryTo.district}, ${row.deliveryTo.province}`}</td>
    </tr>
    {row.note && row.note !== "" && (
      <tr>
        <td className="title-style">Ghi chú</td>
        <td colSpan="3">{row.note}</td>
      </tr>
    )}
    {row.deliveryUnitName && row.deliveryUnitName !== "" && (
      <tr>
        <td className="title-style">Vận chuyển</td>
        <td colSpan="3">
          <a
          href={`https://tracking.ghn.dev/?order_code=${row.deliveryCode}`}
          target="_blank"
          rel="noreferrer"
          className="text-primary">
            {row.deliveryUnitName}
          </a>
        </td>
      </tr>
    )}
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

const defaultSorted = [{
  dataField: 'createdAt',
  order: 'desc'
}];

class OrderContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reloadTime: new Date().toUTCString(),
      isLoading: false,
      action: {
        id: null,
        type: null,
      },
      showModal: false,
      dialogProps: {
        show: false,
      },
      formProps: {
        show: false,
      },
      entities: [],
    };
  }
  
  onStatusFilter = null;
  onDateRangeFilter = null;

  async componentDidMount() {
    await this.fetchData();
    this.onDateRangeFilter({
      start: moment().startOf("month").valueOf(),
      end: moment().endOf("date").valueOf()
    });
    this.timer = new Timer(async () => {
      this.setState({isLoading: true});
      await orderService.getOrderBoard()
      .then((res) => {
        if (res.data.error && res.data.error.statusCode === 100) {
          this.setState({ 
            entities: [...res.data.data],
            reloadTime: new Date().toUTCString()
          });
        }
      })
      .catch((error) => console.log(error));
      this.setState({isLoading: false});
    }, 600000);
  }

  async fetchData() {
    this.setState({isLoading: true});
    await orderService.getOrderBoard()
      .then((res) => {
        if (res.data.error && res.data.error.statusCode === 100) {
          this.setState({ entities: [...res.data.data] });
        }
      })
      .catch((error) => console.log(error));
    this.setState({isLoading: false});
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
      });
    }).catch(error => this.setState({
      dialogProps: {
        show: true,
        handleOk: () => this.setState({dialogProps:{...this.state.dialogProps, show: false}}),
        variant: "error",
        message: error.message
      }
    })) 
  }

  printOrder = async (id) => {
    await orderService.printOrder(id).then(async res => {
      await this.fetchData();
      window.open(res.data.data, '_blank');
      this.setState({
        dialogProps: {
          show: true,
          handleOk: () => this.setState({dialogProps:{...this.state.dialogProps, show: false}}),
          variant: "success",
          message: res.data.error.message
        }
      });
    }).catch(error => this.setState({
      dialogProps: {
        show: true,
        handleOk: () => this.setState({dialogProps:{...this.state.dialogProps, show: false}}),
        variant: "error",
        message: error.message
      }
    })) 
  }
  printAllOrder = async (type) => {
    await orderService.printOrder(type).then(async res => {
      await this.fetchData();
      window.open(res.data.data, '_blank');
      this.setState({
        dialogProps: {
          show: true,
          handleOk: () => this.setState({dialogProps:{...this.state.dialogProps, show: false}}),
          variant: "success",
          message: res.data.error.message
        }
      });
    }).catch(error => this.setState({
      dialogProps: {
        show: true,
        handleOk: () => this.setState({dialogProps:{...this.state.dialogProps, show: false}}),
        variant: "error",
        message: error.message
      }
    }))
  }
  sendOrder = async (data, id) => {
    await this.openResponseDialog(orderService.sendOrder(data, id));
  }
  deleteOrder = async (id) => {
    await this.openResponseDialog(orderService.deleteOrder(id));
  }
  updateOrder = async (data) => {
    await this.openResponseDialog(orderService.updateOrder(data));
    this.setState({formProps:{...this.state.formProps, show: false}});
  }

  openSendOrderForm = (id) => {
    this.setState({
      formProps: {
        show: true,
        orderId: id,
        handleOk: this.sendOrder,
        handleClose: () => this.setState({formProps:{show: false}}),
      },
    })
  }
  openEditOrderForm = (data) => {
    this.setState({
      formProps: {
        show: true,
        formData: data,
        handleOk: this.updateOrder,
        handleClose: () => this.setState({formProps:{show: false}}),
      },
    })
  }
  openDeleteOrderDialog = (id) => {
    this.setState({
      dialogProps: {
        show: true,
        handleClose: () => this.setState({dialogProps:{...this.state.dialogProps, show: false}}),
        handleOk: () => this.deleteOrder(id),
        variant: "danger",
        message: "Bạn có chắc chắn muốn xóa dữ liệu đơn hàng này?"
      }
    })
  }

  handleReload = () => {
    this.timer.reset();
  }
    
  handleOkModal = () => {
    this.state.entities.find(
      (entity) => entity.id === this.state.action.id
    ).status = this.state.action.type;
    // UserService.updateUserStatus(
    //   this.state.action.id,
    //   this.state.action.type
    // ).then(() => this.handleCloseModal());
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  getModalVariant = () => {
    switch (this.state.action.type) {
      case "banned":
        return "danger";
      case "locked":
        return "warning";
      default:
        return "primary";
    }
  };

  getModalMessage = () => {
    switch (this.state.action.type) {
      case "banned":
        return "Bạn có chắc chắn muốn chặn vĩnh viễn tài khoản này?";
      case "locked":
        return "Bạn có chắc chắn muốn khóa tài khoản này?";
      default:
        return "Bạn có chắc chắn muốn mở khóa tài khoản này?";
    }
  };

  render() {
    const {entities, isLoading, reloadTime, dialogProps, formProps} = this.state;
    const columns = orderColumns(this);
    const options = getPaginationOptions(entities.length);

    return (
      <CustomTable
        title="Quản lý đơn hàng"
        loading={isLoading}
        options={options}
        entities={entities}
        columns={columns}
        Search={SearchInput({
          onFilter: {
            onStatusFilter: this.onStatusFilter,
            onDateRangeFilter: this.onDateRangeFilter
          },
          reloadTime: reloadTime,
          reloadData: this.handleReload,
          isTableLoading: isLoading
        })}
        Toolbar={OrderToolbar}
        expandRow={expandRow}
        defaultSorted={defaultSorted}
        rowStyle={{ cursor: "pointer" }}
      >
        <GeneralDialog { ...dialogProps } />
        <SendOrderForm { ...formProps } />
      </CustomTable>
    );
  }
}

export default OrderContent;
