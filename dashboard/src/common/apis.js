import axios from 'axios'; 

import CONSTANTS from './constants';

const HEADERS = {headers : {"content-type": "application/json"}}; 

const StorageUtils = require("../utils/storage_utils"); 

let API_BASE_URL = process.env.API_BASE_URL || "http://localhost:8080" ; 
let PRIMARY_CUSTOMER_CODE = process.env.PRIMARY_CUSTOMER_CODE || "111"; 
//Use for ADMIN login experience
const getHeadersWithToken = () => {
    HEADERS.headers['x-auth-token'] = StorageUtils.getAPIToken();
    return HEADERS;
}

// const API = module.exports;
// //ADMIN 

// API.loginAdmin = (payload) => {
//     return axios.post(`${API_BASE_URL}/api/v1/login`, payload); 
// }
// API.signUpAdmin = (payload) => {
//     return axios.post(`${API_BASE_URL}/api/v1/signup`, payload);
// }

const API = {
    loginAdmin: (payload) => {
      return axios.post(`${API_BASE_URL}/api/v1/login`, payload); 
    },
    signUpAdmin: (payload) => {
      return axios.post(`${API_BASE_URL}/api/v1/signup`, payload);
    }
  };
  
  // Export the API object
export default API; 