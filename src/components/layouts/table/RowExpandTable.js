import React, { Component } from "react";
import { getPaginationOptions, orderHistoryColumns } from "../../../config/configTable";
import orderService from "../../../service/order.service";

import CustomTable from "./CustomTable";

class RowExpandTable extends Component {
  constructor(props) {
    super(props);
    this.state={
      isLoading: false,
      entities: []
    }
  }

  componentDidMount() {
    this.fetchData()
  }
  
  fetchData = async () => {
    this.setState({ isLoading: true });
    await orderService.getOrderHistoryOfCustomer(this.props.id).then(async (res) => {
      this.setState({ entities: res.data.data });
    });
    this.setState({ isLoading: false });
  }
  
  render() {
    const {entities, isLoading} = this.state;
    const options = getPaginationOptions(entities.length);
    return (
        <CustomTable
          loading={isLoading}
          customStyle={{
            container: {marginBottom: 0},
            header: {paddingTop: '.5rem'},
            body: {paddingTop: '.5rem'}
          }}
          title={<span style={{color: '#b5b5c3'}}>Lịch sử mua hàng</span>}
          options={options}
          entities={entities}
          columns={orderHistoryColumns}
          defaultSorted={[
            {
              dataField: "createdAt",
              order: "desc",
            },
          ]}
        />
    );
  }
}

export default RowExpandTable;
