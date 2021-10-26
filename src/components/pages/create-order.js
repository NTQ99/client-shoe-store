import React, { Component } from "react";

import Container from "../containers/container";
import CreateOrderContent from "../layouts/contents/create-order";
import SubHeader from "../layouts/subheader/subheader";

class CreateOrderPage extends Component {
  render() {
    return (
      <Container>
        <SubHeader subHeaderTitle="Tạo đơn hàng" />
        <CreateOrderContent />
      </Container>
    );
  }
}

export default CreateOrderPage;
