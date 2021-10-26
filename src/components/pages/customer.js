import React, { Component } from 'react';

import Container from "../containers/container";
import CustomerContent from "../layouts/contents/customer";

class CustomerPage extends Component {
    render() {
        return (
            <Container>
                <CustomerContent />
            </Container>
        );
    }
}

export default CustomerPage;