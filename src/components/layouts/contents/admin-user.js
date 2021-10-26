import React, { Component } from "react";


import { adminUserColumns, getPaginationOptions } from "../../../config/configTable";
import { CSVExport } from "react-bootstrap-table2-toolkit";
import SVG from 'react-inlinesvg';

import UserDialog from "../modal/UserDialog";
import UserService from "../../../service/user.service";
import CustomTable from "../table/CustomTable";

const { ExportCSVButton } = CSVExport;

const SearchInput = (props) => {
  const handleChange = (e) => {
    props.onSearch(e.target.value);
  };
  return (
    <div className="row align-items-center">
      <div className="col-md-3 my-2 my-md-0">
        <div className="input-icon">
          <input
            type="text"
            className="form-control"
            placeholder="Nhập tên tài khoản, email, SĐT,..."
            autoComplete="nope"
            onChange={handleChange}
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
          <select className="form-control" onChange={handleChange}>
            <option value={""}>Tất cả</option>
            <option value={"active"}>Hoạt động</option>
            <option value={"locked"}>Khóa</option>
            <option value={"banned"}>Chặn</option>
          </select>
        </div>
        <small className="form-text text-muted">
          Tìm theo <b>Trạng thái</b>
        </small>
      </div>
    </div>
  );
};

const UserToolbar = (props) => (
  <ExportCSVButton
    className="btn btn-light-primary font-weight-bolder"
    {...props.csvProps}
  >
    <span class="svg-icon svg-icon-md">
      <SVG src="assets/media/svg/icons/Files/ExportFile.svg" />
    </span>
    Xuất file
  </ExportCSVButton>
)

class AdminUserContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      action: {
        id: null,
        type: null,
      },
      showModal: false,
      entities: [],
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    await UserService.getUserBoard()
      .then((res) => {
        if (res.data.error && res.data.error.statusCode === 100) {
          this.setState({ entities: [...res.data.data] });
        }
      })
      .catch((error) => console.log(error));
    this.setState({ isLoading: false });
  }

  handleOkModal = () => {
    this.state.entities.find(
      (entity) => entity.id === this.state.action.id
    ).status = this.state.action.type;
    UserService.updateUserStatus(
      this.state.action.id,
      this.state.action.type
    ).then(() => this.handleCloseModal());
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
    const entities = this.state.entities;
    const columns = adminUserColumns(this);
    const options = getPaginationOptions(this.state.entities.length);

    return (
      <CustomTable
        title="Quản lý tài khoản"
        loading={this.state.isLoading}
        options={options}
        entities={entities}
        columns={columns}
        Search={SearchInput}
        Toolbar={UserToolbar}
      >
        <UserDialog
          show={this.state.showModal}
          handleOk={this.handleOkModal}
          handleClose={this.handleCloseModal}
          variant={this.getModalVariant()}
          message={this.getModalMessage()}
        />
        
      </CustomTable>
    );
  }
}

export default AdminUserContent;
