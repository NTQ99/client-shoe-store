import axios from "axios";
import Cookies from 'universal-cookie';
import { firebaseApp } from '../config/firebase';
import { sendEmailVerification, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, applyActionCode, verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
 
const cookies = new Cookies();
const BASE_URL = process.env.REACT_APP_BASE_URL_API;
const auth = getAuth(firebaseApp);

class AuthService {
  async login(username, password) {
    return axios
      .post(BASE_URL + "/auth/login", {
        username,
        password
      })
      .then(async res => {
        let body = res.data;
        if (body && body.error.statusCode === 200) {
          var now = new Date();
          await now.setTime(now.getTime() + 86400000);
          await cookies.set('jwt', 'Bearer ' + body.data.accessToken, {path: '/', expires: now})
          await axios({
            method: "post",
            url: BASE_URL + "/user/get/info",
            headers: {
              Authorization: 'Bearer ' + body.data.accessToken,
            }
          }).then(async res => {
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

  async register(data) {
    return axios.post(BASE_URL + "/auth/register", data).then(async res => {
      if (res.data && res.data.error)
      if (res.data.error.statusCode === 206 && data.email) {
        await createUserWithEmailAndPassword(auth, data.email, data.password)
        .then(async (userCredential) => {
            const user = userCredential.user;
            if (!user.emailVerified) {
              await sendEmailVerification(user).then(() => {
                res.data.error.message = "Đăng ký tài khoản thành công! Hãy kiểm tra email xác nhận."
              }).catch(() => {
                res.data.error.statusCode = 400
                res.data.error.message = "Đã có lỗi xảy ra!"
              });
            }
          })
          .catch((error) => {
            res.data.error.statusCode = 400
            res.data.error.message = "Đã có lỗi xảy ra!"
          });
        }
      return res;
    }).then(res => res.data);
  }

  updatePassword(data) {
    return axios.post(BASE_URL + "/auth/updatepass", {
      username: this.getCurrentUser().username,
      password: data.oldPassword,
      newPassword: data.newPassword
    });
  }

  validatePassword(username, email) {
    return axios.post(BASE_URL + "/auth/validate", {
      username, email
    });
  }

  async resetPassword(email, password) {
    return axios.post(BASE_URL + "/auth/resetpass", {
      email, password
    });
  }

  async handleFirebaseSendPasswordResetEmail(email) {
    return sendPasswordResetEmail(auth, email);
  }

  async handleFirebaseVerifyEmail(actionCode) {
    return applyActionCode(auth, actionCode);
  }

  async handleFirebaseVerifyResetPassword(actionCode) {
    return verifyPasswordResetCode(auth, actionCode);
  }

  async handleFirebaseconfirmPasswordReset(actionCode, newPassword) {
    return confirmPasswordReset(auth, actionCode, newPassword);
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
}

export default new AuthService();