import axios from "axios";
import Cookies from 'universal-cookie';
 
const cookies = new Cookies();
const BASE_URL = process.env.REACT_APP_BASE_URL_API;

class AuthService {
  login(username, password) {
    return axios
      .post(BASE_URL + "/auth/login", {
        username,
        password
      })
      .then(async res => {
        let body = res.data;
        if (body && body.error.statusCode === 200) {
          var now = new Date();
          now.setTime(now.getTime() + 86400000);
          cookies.set('jwt', 'Bearer ' + body.data.accessToken, {path: '/', expires: now})
          await axios({
            method: "post",
            url: BASE_URL + "/user/get/info",
            headers: {
              Authorization: 'Bearer ' + body.data.accessToken,
            }
          }).then(res => {
            localStorage.setItem("user", JSON.stringify(res.data.data));
          });
          await axios({
            method: "post",
            url: BASE_URL + "/cart/get",
            headers: {
              Authorization: 'Bearer ' + body.data.accessToken,
            }
          }).then(async res => {
            if (res.data.data != null) {
              cookies.set('cart', res.data.data.items || [], {path:'/'})
            } else {
              let currentCart = cookies.get('cart') || [];
              if (currentCart.length > 0) {
                axios({
                  method: "post",
                  url: BASE_URL + "/cart/updateall",
                  headers: {
                    Authorization: 'Bearer ' + body.data.accessToken,
                  },
                  data: currentCart
                })
              }
            }
          });
        }

        return body;
      });
  }

  logout(cb) {
    cookies.remove('jwt');
    cookies.remove('cart');
    localStorage.clear();
    setTimeout(cb, 100);
  }

  register(username, password, firstName, lastName, phone, email) {
    return axios.post(BASE_URL + "/auth/register", {
      username,
      password, firstName, lastName, phone, email
    }).then(res => res.data);
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  getRoles() {
    if (this.getCurrentUser() != null) return this.getCurrentUser().roles[0].name;
    else return null;
  }
}

export default new AuthService();