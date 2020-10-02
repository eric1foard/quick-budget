import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3001/api/';

class UserService {

  getUserIncome() {
    return axios
      .get(API_URL + 'user/income', { headers: authHeader() });
  }

  getUserExpense() {
    return axios
      .get(API_URL + 'user/expense', { headers: authHeader() });
  }

  saveIncomeNew(income) {
    return axios
      .post(API_URL + 'user/save/income/new', {income}, { headers: authHeader() });
  }

  saveExpenseNew(expense) {
    return axios
      .post(API_URL + 'user/save/expense/new', {expense}, { headers: authHeader() });
  }

  saveIncome(income) {
    return axios
      .put(API_URL + 'user/save/income', {income}, { headers: authHeader() });
  }

  saveExpense(expense) {
    return axios
      .put(API_URL + 'user/save/expense', {expense}, { headers: authHeader() });
  }

}

export default new UserService();