import React, { Component } from "react";
import { withRouter } from 'react-router-dom';

import AuthService from '../../../service/auth.service';

class QuickUser extends Component {

  render() {
    return (
      <div id="kt_quick_user" className="offcanvas offcanvas-right p-10">
        {/*begin::Header*/}
        <div className="offcanvas-header d-flex align-items-center justify-content-between pb-5">
          <h3 className="font-weight-bold m-0">
            Đăng xuất
          </h3>
          <a
            href="/"
            className="btn btn-xs btn-icon btn-light btn-hover-primary"
            id="kt_quick_user_close"
          >
            <i className="ki ki-close icon-xs text-muted" />
          </a>
        </div>
        {/*end::Header*/}
        {/*begin::Content*/}
        <div className="offcanvas-content pr-5 mr-n5">
          {/*begin::Header*/}
          <div className="d-flex align-items-center mt-5">
            <div className="symbol symbol-100 mr-5">
              <div
                className="symbol-label"
                style={{
                  backgroundImage: 'url("/assets/media/users/300_21.jpg")',
                }}
              />
              <i className="symbol-badge bg-success" />
            </div>
            <div className="d-flex flex-column">
              <a
                href="/"
                className="font-weight-bold font-size-h5 text-dark-75 text-hover-primary"
              >
                {JSON.parse(localStorage.getItem("user")).lastName + " " + JSON.parse(localStorage.getItem("user")).firstName}
              </a>
              <div className="navi mt-2">
                <div
                  onClick={() => AuthService.logout(() => window.location.href = '/login')}
                  className="btn btn-sm btn-light-primary font-weight-bolder py-2 px-5"
                >
                  Đăng xuất
                </div>
              </div>
            </div>
          </div>
          {/*end::Header*/}
        </div>
        {/*end::Content*/}
      </div>
    );
  }
}

export default withRouter(QuickUser);
