import axios from 'axios';
import authHeader from './auth-header';

const BASE_URL = process.env.REACT_APP_BASE_URL_API;

class CustomerService {

  getCustomerBoard() {
    return axios({
      method: "post",
      url: BASE_URL + "/customer/get",
      headers: {
        Authorization: authHeader(),
      },
    });
  }

  createCustomer(data) {
    return axios({
      method: "post",
      url: BASE_URL + "/customer/create",
      headers: {
        Authorization: authHeader(),
      },
      data: data
    });
  }

  updateCustomer(data) {
    return axios({
      method: "post",
      url: BASE_URL + "/customer/update/" + data.id,
      headers: {
        Authorization: authHeader(),
      },
      data: data
    });
  }

  deleteCustomer(id) {
    return axios({
      method: "post",
      url: BASE_URL + "/customer/delete/" + id,
      headers: {
        Authorization: authHeader(),
      },
    })
  }

}

export default new CustomerService();