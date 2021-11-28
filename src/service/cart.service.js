import axios from 'axios';
import Cookies from 'universal-cookie';
import authHeader from './auth-header';
 
const cookies = new Cookies();
const BASE_URL = process.env.REACT_APP_BASE_URL_API;

class CartService {
    addToCart(id, qnt) {
        qnt = Number(qnt);
        let currentCart = []
        currentCart = cookies.get('cart', {path:'/'});
        if (currentCart == null) {
            currentCart=[{productId: id, quantity: qnt}];
        } else {
            let check = 0;
            currentCart.forEach(product => {
                if (product.productId === id) {
                    product.quantity += qnt;
                    check = 1;
                }
            });
            if (!check) currentCart.push({productId: id, quantity: qnt});
        }
        cookies.set('cart', currentCart, {path:'/'});
        let token = authHeader();
        if (token) {
            axios({
                method: "post",
                url: BASE_URL + "/cart/updateall",
                headers: {
                  Authorization: token,
                },
                data: currentCart
              })
        }
    }
    
    updateItemCart(index, qnt) {
        qnt = Number(qnt)
        let currentCart = []
        currentCart = cookies.get('cart', {path:'/'});
        if (currentCart != null) {
            if (qnt === 0) {
                currentCart.splice(index, 1);
            } else {
                currentCart[index].quantity = qnt;
            }
            cookies.set('cart', currentCart, {path:'/'});
            let token = authHeader();
            if (token) {
                axios({
                    method: "post",
                    url: BASE_URL + "/cart/update/" + index,
                    headers: {
                    Authorization: token,
                    },
                    data: currentCart[index]
                })
            }
        }
    }

    getTotalNum() {
        let currentCart = []
        currentCart = cookies.get('cart', {path:'/'});
        if (currentCart == null) return 0;
        else {
            let total = 0;
            currentCart.forEach(product => {
                total += product.quantity;
            });
            return total;
        }
    }

    async getCart() {
        let currentCart = cookies.get('cart')
        if (currentCart == null) {
            let token = authHeader();
            if (token === null) return [];
            else return axios({
                method: "post",
                url: BASE_URL + "/cart/get",
                headers: {
                  Authorization: token,
                }
              }).then(res => {
                  if (res.data.data) {
                      cookies.set('cart', res.data.data.items || [], {path:'/'})
                      return res.data.data.items;
                  }
                  return [];
              });
        }
        else return currentCart;
    }

    clearCart() {
        cookies.remove('cart');
    }
}

export default new CartService();