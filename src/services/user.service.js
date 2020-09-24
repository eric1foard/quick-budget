import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3001/api/test/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getUserIncome() {
    return axios
      .get(API_URL + 'user/income', { headers: authHeader() });
  }

  getUserExpense() {
    return axios
      .get(API_URL + 'user/expense', { headers: authHeader() });
  }

  saveUserBudget(income, expense) {
    return axios
      .put(API_URL + 'user/save', {income, expense}, { headers: authHeader() });
  }

}

export default new UserService();