import React, { Component } from "react";

import Container from "../containers/container";
import ChartContent from "../layouts/contents/chart";
import SubHeader from "../layouts/subheader/subheader";

import SVG from 'react-inlinesvg';

class ChartPage extends Component {
  render() {
    return (
      <Container>
        <SubHeader subHeaderTitle="Thống kê">
          {/*begin::Toolbar*/}
      {/*begin::Dropdown*/}
      <div className="dropdown dropdown-inline mr-2">
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span className="svg-icon svg-icon-md">
                  <SVG src="assets/media/svg/icons/Shopping/Download.svg" />
                </span>
                Xuất file
              </button>
              {/*begin::Dropdown Menu*/}
              <div className="dropdown-menu dropdown-menu-sm dropdown-menu-right">
                {/*begin::Navigation*/}
                <ul className="navi flex-column navi-hover py-2">
                  <li className="navi-header font-weight-bolder text-uppercase font-size-sm text-primary pb-2">
                    Choose an option:
                  </li>
                  <li className="navi-item">
                    <a href="/" className="navi-link">
                      <span className="navi-icon">
                        <i className="la la-print" />
                      </span>
                      <span className="navi-text">Print</span>
                    </a>
                  </li>
                  <li className="navi-item">
                    <a href="/" className="navi-link">
                      <span className="navi-icon">
                        <i className="la la-copy" />
                      </span>
                      <span className="navi-text">Copy</span>
                    </a>
                  </li>
                  <li className="navi-item">
                    <a href="/" className="navi-link">
                      <span className="navi-icon">
                        <i className="la la-file-excel-o" />
                      </span>
                      <span className="navi-text">Excel</span>
                    </a>
                  </li>
                  <li className="navi-item">
                    <a href="/" className="navi-link">
                      <span className="navi-icon">
                        <i className="la la-file-text-o" />
                      </span>
                      <span className="navi-text">CSV</span>
                    </a>
                  </li>
                  <li className="navi-item">
                    <a href="/" className="navi-link">
                      <span className="navi-icon">
                        <i className="la la-file-pdf-o" />
                      </span>
                      <span className="navi-text">PDF</span>
                    </a>
                  </li>
                </ul>
                {/*end::Navigation*/}
              </div>
              {/*end::Dropdown Menu*/}
            </div>
            {/*end::Dropdown*/}
      {/*end::Toolbar*/}
        </SubHeader>
        <ChartContent />
      </Container>
    );
  }
}

export default ChartPage;
