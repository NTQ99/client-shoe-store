import Cookies from 'universal-cookie';
 
const cookies = new Cookies();

class CartService {
    addToCart(id) {

        let currentCart = []
        currentCart = cookies.get('cart', {path:'/'});
        if (currentCart == null) {
            cookies.set('cart', [{id: id, number: 1}], {path:'/'});
        } else {
            let check = 0;
            currentCart.forEach(product => {
                if (product.id === id) {
                    product.number += 1;
                    check = 1;
                }
            });
            if (!check) currentCart.push({id: id, number: 1});
            cookies.set('cart', currentCart, {path:'/'});
        }
    }
    
    updateCart(id, number) {
        let currentCart = []
        currentCart = cookies.get('cart', {path:'/'});
        if (currentCart != null) {
            currentCart.forEach(product => {
                if (product.id === id) {
                    product.number = Number(number);
                }
            });
            cookies.set('cart', currentCart, {path:'/'});
        }
    }

    getTotalNum() {
        let currentCart = []
        currentCart = cookies.get('cart', {path:'/'});
        if (currentCart == null) return 0;
        else {
            let total = 0;
            currentCart.forEach(product => {
                total += product.number;
            });
            return total;
        }
    }

    getCart() {
        let currentCart = cookies.get('cart')
        if (currentCart == null) return [];
        else return currentCart;
    }
}

export default new CartService();