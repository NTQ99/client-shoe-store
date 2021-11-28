import { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import LoginPage from "./components/pages/login";
import HomePage from "./components/pages/home";
import OrderPage from "./components/pages/order";
import CreateOrderPage from "./components/pages/create-order";
import CustomerPage from "./components/pages/customer";
import ProductPage from "./components/pages/product";
import DeliveryPage from "./components/pages/delivery";
import CategoryPage from "./components/pages/category";
import CartPage from "./components/pages/cart";
import ChartPage from "./components/pages/chart";
import CheckoutPage from "./components/pages/checkout";
import ProductDetailPage from "./components/pages/product-detail";

import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

function App() {
  return (
    <Router>
        <Suspense>
          <Switch>
            <Route exact path="/order" component={OrderPage} />
            <Route exact path="/create-order" component={CreateOrderPage} />
            <Route exact path="/customer" component={CustomerPage} />
            <Route exact path="/product" component={ProductPage} />
            <Route exact path="/delivery" component={DeliveryPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/home" component={HomePage} />
            <Route exact path="/category" component={CategoryPage} />
            <Route exact path="/cart" component={CartPage} />
            <Route exact path="/chart" component={ChartPage} />
            <Route exact path="/checkout" component={CheckoutPage} />
            <Route strict path="/product-detail/:productCode" component={ProductDetailPage} />
            <Route exact path="/" render={() => <Redirect to='/home' />} />
          </Switch>
        </Suspense>
      </Router>
  );
}

export default App;
