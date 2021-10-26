import React, { Component } from "react";

import Container from "../containers/container";
import DeliveryContent from "../layouts/contents/delivery";
import SubHeader from "../layouts/subheader/subheader";

class DeliveryPage extends Component {
  render() {
    return (
      <Container>
        <SubHeader subHeaderTitle="Kết nối đơn vị vận chuyển" />
        <DeliveryContent />
      </Container>
    );
  }
}

export default DeliveryPage;
