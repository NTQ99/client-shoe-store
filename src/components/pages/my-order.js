import React, { Component } from "react";

import Header from "../layouts/shoe-store/header";
import Footer from "../layouts/shoe-store/footer";

import CustomTable from "../layouts/table/CustomTable";
import { getPaginationOptions, orderHistoryColumns } from "../../config/configTable";
import orderService from "../../service/order.service";
import authService from "../../service/auth.service";
import customerService from "../../service/customer.service";
import userService from "../../service/user.service";

class MyOrderPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      entities: [],
    };
  }

  componentDidMount() {
    this.fetchData()
  }
  
  fetchData = async () => {
    this.setState({ isLoading: true });
    let customerId;
    await customerService.getCustomerInfo(userService.getCustomerCode()).then(res => customerId = res.data.data.id);
    await orderService.getOrderHistoryOfCustomer(customerId).then(async (res) => {
      this.setState({ entities: res.data.data });
    });
    this.setState({ isLoading: false });
  }

  render() {
    const {entities, isLoading} = this.state;
    const columns = orderHistoryColumns;
    const options = getPaginationOptions(entities.length);
    const rowEvents = { onClick: (e, row, rowIndex) => window.location.href = `/order-detail?orderid=${row.orderCode}&phone=${row.customerPhone}`}
    return (
      <div>
        {/* Start Header Area */}
        <Header />
        {/* End Header Area */}
        {/* Start Banner Area */}
        <section className="banner-area organic-breadcrumb">
          <div className="container">
            <div className="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
              <div className="col-first">
                <h1>Tài khoản</h1>
                <nav className="d-flex align-items-center">
                  <a href="/home">
                    Trang chủ
                    <span className="lnr lnr-arrow-right" />
                  </a>
                  <a href="/my-order">Đơn hàng của tôi</a>
                </nav>
              </div>
            </div>
          </div>
        </section>
        {/* End Banner Area */}
        {/*================Info Box Area =================*/}
        <section className="info_box_area section_gap">
          <div className="container">
            <p style={{textAlign: "center"}}>Mọi thắc mắc xin liên hệ tới hotline (+84) 387 608 526</p>
            <CustomTable
              title="Đơn hàng của tôi"
              loading={isLoading}
              options={options}
              entities={entities}
              columns={columns}
              rowEvents={rowEvents}
              rowStyle={{ cursor: "pointer" }}
              defaultSorted={[
                {
                  dataField: "createdAt",
                  order: "desc",
                },
              ]}
            />
          </div>
        </section>
        {/*================End Info Box Area =================*/}
        {/* start footer Area */}
        <Footer />
        {/* End footer Area */}
      </div>
    );
  }
}

export default MyOrderPage;
