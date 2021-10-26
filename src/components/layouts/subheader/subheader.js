import { Component } from "react";

class SubHeader extends Component {
  render() {
    return (
      <div
        className="subheader py-2 py-lg-6 subheader-transparent"
        style={{ marginTop: "-2rem" }}
      >
        <div className="container-fluid d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
          {/*begin::Info*/}
          <div className="d-flex align-items-center flex-wrap mr-1">
            {/*begin::Page Heading*/}
            <div className="d-flex align-items-baseline flex-wrap mr-5">
              {/*begin::Page Title*/}
              <h3 className="text-dark font-weight-bold my-1 mr-5">
                {this.props.subHeaderTitle}
              </h3>
              {/*end::Page Title*/}
            </div>
            {/*end::Page Heading*/}
          </div>
          {/*end::Info*/}
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default SubHeader;
