// import HeaderMobile from "./general/header-mobile.js";
import AdminAside from "./general/admin-aside.js";
import Header from "./general/header.js";
// import SubHeader from "./subheader/subheader.js";
import Footer from "./general/footer.js";
import { Component } from "react";

class AdminLayout extends Component {
  render() {
  return (
      <div className="d-flex flex-column flex-root">
        {/*begin::Page*/}
        <div className="d-flex flex-row flex-column-fluid page">
          {/*[html-partial:include:{"file":"partials/_aside.html"}]/*/}
          < AdminAside />
          {/*begin::Wrapper*/}
          <div className="d-flex flex-column flex-row-fluid wrapper" id="kt_wrapper" style={{marginLeft: '25px', marginRight: '25px', overflow: 'hidden'}}>
            {/*[html-partial:include:{"file":"partials/_header.html"}]/*/}
            < Header title="Admin" />
            {/*begin::Content*/}
            <div className="content d-flex flex-column flex-column-fluid" id="kt_content">
              {/*[html-partial:include:{"file":"partials/_subheader/subheader-v1.html"}]/*/}
              {/* < SubHeader /> */}
              {this.props.children}
              {/*Content area here*/}
            </div>
            {/*end::Content*/}
            {/*[html-partial:include:{"file":"partials/_footer.html"}]/*/}
            < Footer />
          </div>
          {/*end::Wrapper*/}
        </div>
        {/*end::Page*/}
      </div>
  );
}
}

export default AdminLayout;
