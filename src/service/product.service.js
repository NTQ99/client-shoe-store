import axios from 'axios';
import authHeader from './auth-header';

const BASE_URL = process.env.REACT_APP_BASE_URL_API;

class ProductService {

  getProductBoard() {
    return axios({
      method: "post",
      url: BASE_URL + "/product/get",
      headers: {
        Authorization: authHeader(),
      },
    });
  }

  createProduct(data) {
    return axios({
      method: "post",
      url: BASE_URL + "/product/create",
      headers: {
        Authorization: authHeader(),
      },
      data: data
    });
  }

  updateProduct(data) {
    return axios({
      method: "post",
      url: BASE_URL + "/product/update/" + data.id,
      headers: {
        Authorization: authHeader(),
      },
      data: data
    });
  }

  deleteProduct(id) {
    return axios({
      method: "post",
      url: BASE_URL + "/product/delete/" + id,
      headers: {
        Authorization: authHeader(),
      },
    })
  }

}

export default new ProductService();