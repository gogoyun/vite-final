import axios from "axios";
const baseURL = 'https://todolist-api.hexschool.io/';
//basic
const baseRequest = axios.create({
  baseURL: baseURL,
});
//bearer
const bearerRequest = token => axios.create({
  baseURL: baseURL,
  headers: { 'Authorization': token }
});
//註冊
export const signUp = data => baseRequest.post(`${baseURL}users/sign_up`, data);
//登入
export const signIn = data => baseRequest.post(`${baseURL}users/sign_in`, data);
//登出
export const signOut = token => bearerRequest(token).post(`${baseURL}users/sign_out`);
//檢查token是否有效
export const checkToken = token => bearerRequest(token).get(`${baseURL}users/checkout`);
//取得所有todo
export const getTodos = token => bearerRequest(token).get(`${baseURL}todos`);
//新增todo
export const postTodo = (token, data) => bearerRequest(token).post(`${baseURL}todos`, data);
//刪除Todo
export const delTodo = (token, id) => bearerRequest(token).delete(`${baseURL}todos/${id}`);