import axios from 'axios';
import authHeader from './auth-header';
 
const BASE_URL = process.env.REACT_APP_BASE_URL_API;

class ChartService {
    async getTopProduct() {
        return axios({
            method: "post",
            url: BASE_URL + "/product/get-top/5",
            headers: {
                Authorization: authHeader(),
            },
        })
    }
    
    async getOrderReport() {
        return axios({
            method: "post",
            url: BASE_URL + "/order/get-report",
            headers: {
                Authorization: authHeader(),
            },
        })
    }
}

export default new ChartService();