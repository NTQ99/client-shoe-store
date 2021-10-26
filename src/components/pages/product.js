import React, { Component } from 'react';

import Container from "../containers/container";
import ProductContent from "../layouts/contents/product";

class ProductPage extends Component {
    render() {
        return (
            <Container>
                <ProductContent />
            </Container>
        );
    }
}

export default ProductPage;