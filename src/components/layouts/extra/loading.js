import React, { Component } from "react";

class Loading extends Component {
  render() {
    return (
      <div className="page-loader page-loader-logo">
        <img
          alt="Logo"
          className="max-h-75px"
          src="assets/media/logos/logo-letter-4.png"
        />
        <div className="spinner spinner-primary" />
      </div>
    );
  }
}

export default Loading;
