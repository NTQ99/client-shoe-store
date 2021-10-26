import { Component } from "react";

class ErrorPage extends Component {
  render() {
    return (
      <div className="d-flex flex-column flex-root" style={{height: '100vh'}}>
        {/*begin::Error*/}
        <div
          className="error error-3 d-flex flex-row-fluid bgi-size-cover bgi-position-center"
          style={{ backgroundImage: "url(assets/media/error/bg3.jpg)" }}
        >
          {/*begin::Content*/}
          <div className="px-10 px-md-30 py-10 py-md-0 d-flex flex-column justify-content-md-center">
            <h1 className="error-title text-stroke text-transparent">404</h1>
            <p className="display-4 font-weight-boldest text-white mb-12">
              How did you get here
            </p>
            <p className="font-size-h1 font-weight-boldest text-dark-75">
              Sorry we can't seem to find the page you're looking for.
            </p>
            <p className="font-size-h4 line-height-md">
              There may be a misspelling in the URL entered,or the page you are
              looking for may no longer exist.
            </p>
          </div>
          {/*end::Content*/}
        </div>
        {/*end::Error*/}
      </div>
    );
  }
}

export default ErrorPage;
