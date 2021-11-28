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
import authHeader from "./service/auth-header";
import AuthService from './service/auth.service';

import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

const AdminRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    (authHeader() && AuthService.getRoles().includes("ROLE_ADMIN"))? <Component {...props} />
      : <Redirect to='/not-found' />
  )} />
)

function App() {
  return (
    <Router>
        <Suspense>
          <Switch>
            <AdminRoute exact path="/order" component={OrderPage} />
            <AdminRoute exact path="/create-order" component={CreateOrderPage} />
            <AdminRoute exact path="/customer" component={CustomerPage} />
            <AdminRoute exact path="/product" component={ProductPage} />
            <AdminRoute exact path="/delivery" component={DeliveryPage} />
            <AdminRoute exact path="/chart" component={ChartPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/home" component={HomePage} />
            <Route exact path="/category" component={CategoryPage} />
            <Route exact path="/cart" component={CartPage} />
            <Route exact path="/checkout" component={CheckoutPage} />
            <Route strict path="/product-detail/:productCode" component={ProductDetailPage} />
            <Route exact path="/" render={() => <Redirect to='/home' />} />
          </Switch>
        </Suspense>
      </Router>
  );
}

export default App;
