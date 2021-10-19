import Cookies from 'universal-cookie';
 
const cookies = new Cookies();

export default function authHeader() {
    return cookies.get('jwt');
  }