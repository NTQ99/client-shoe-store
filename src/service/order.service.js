import axios from 'axios';
import authHeader from './auth-header';

const BASE_URL = process.env.REACT_APP_BASE_URL_API;

class OrderService {

  getOrderBoard() {
    return axios({
      method: "post",
      url: BASE_URL + "/order/get",
      headers: {
        Authorization: authHeader(),
      },
    });
  }

  getOrderHistoryOfCustomer(id) {
    return axios({
      method: "post",
      url: BASE_URL + "/order/get/customer/" + id,
      headers: {
        Authorization: authHeader(),
      },
    });
  }

  
  createOrder(data) {
    return axios({
      method: "post",
      url: BASE_URL + "/order/create",
      headers: {
        Authorization: authHeader(),
      },
      data: data
    });
  }

  printOrder(id) {
    return axios({
      method: "post",
      url: BASE_URL + "/order/delivery/print/" + id,
      headers: {
        Authorization: authHeader(),
      },
    });
  }

  printAllOrder(type) {
    return axios({
      method: "post",
      url: BASE_URL + "/order/delivery/print",
      headers: {
        Authorization: authHeader(),
      },
      data: {
        type: type
      }
    });
  }

  sendOrder(data, id) {
    return axios({
      method: "post",
      url: BASE_URL + "/order/delivery/" + id,
      headers: {
        Authorization: authHeader(),
      },
      data: data
    });
  }

  updateOrder(data) {
    return axios({
      method: "post",
      url: BASE_URL + "/order/update/" + data.id,
      headers: {
        Authorization: authHeader(),
      },
      data: data
    });
  }

  deleteOrder(id) {
    return axios({
      method: "post",
      url: BASE_URL + "/order/delete/" + id,
      headers: {
        Authorization: authHeader(),
      },
    })
  }

}

export default new OrderService();