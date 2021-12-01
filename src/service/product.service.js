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

  getProductCategory(data) {
    return axios({
      method: "post",
      url: BASE_URL + "/product/get/group",
      headers: {
        Authorization: authHeader(),
      },
      data: data
    });
  }

  getProductById(id) {
    return axios({
      method: "post",
      url: BASE_URL + "/product/get/"+id,
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

  async getColorCode(id) {
    return axios({
      method: "post",
      url: BASE_URL + "/product/color/" + id,
      headers: {
        Authorization: authHeader(),
      },
    })
  }

  getCategoryNum() {
    return axios({
      method: "post",
      url: BASE_URL + "/product/category/count",
      headers: {
        Authorization: authHeader(),
      },
    })
  }
  getBrandNum() {
    return axios({
      method: "post",
      url: BASE_URL + "/product/brand/count",
      headers: {
        Authorization: authHeader(),
      },
    })
  }
  getColorNum() {
    return axios({
      method: "post",
      url: BASE_URL + "/product/color/count",
      headers: {
        Authorization: authHeader(),
      },
    })
  }

}

export default new ProductService();