import axios from 'axios';
import authHeader from './auth-header';

const BASE_URL = process.env.REACT_APP_BASE_URL_API;

class UserService {

  getUserBoard() {
    return axios({
      method: "post",
      url: BASE_URL + "/user/get",
      headers: {
        Authorization: authHeader(),
      },
    });
  }

  updateUserStatus(id, status) {
    return axios({
      url: `${BASE_URL}/user/update/status/${id}`,
      method: 'post',
      data: {
        status: status
      },
      headers: {
        Authorization: authHeader(),
      },
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  getRoles() {
    if (this.getCurrentUser() != null) return this.getCurrentUser().roles[0].name;
    else return null;
  }

  getCustomerCode() {
    if (this.getCurrentUser() != null) return this.getCurrentUser().customerCode;
    else return null;
  }

  updateUserInfo(data) {
    let user = this.getCurrentUser();
    user.firstName = data.customerFirstName;
    user.lastName = data.customerLastName;
    user.phone = data.customerPhone;
    localStorage.setItem("user", JSON.stringify(user));
  }

}

export default new UserService();