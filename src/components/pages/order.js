import React, { Component } from 'react';

import Container from "../containers/container";
import OrderContent from "../layouts/contents/order";

class OrderPage extends Component {
    render() {
        return (
            <Container>
                <OrderContent />
            </Container>
        );
    }
}

export default OrderPage;