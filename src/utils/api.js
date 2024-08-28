import axios from "axios";
const baseURL = 'https://todolist-api.hexschool.io/';
//basic
const baseRequest = axios.create({
  baseURL: baseURL,
});
//bearer
// const bearerRequest = axios.create({
//   baseURL: baseURL,
//   headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
// });
//註冊
export const signUp = data => baseRequest.post(`${baseURL}users/sign_up`, data);
//登入
export const signIn = data => baseRequest.post(`${baseURL}users/sign_in`, data);