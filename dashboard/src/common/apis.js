import axios from 'axios'; 

import CONSTANTS from './constants';

const HEADERS = {headers : {"content-type": "application/json"}}; 

const StorageUtils = require("../utils/storage_utils"); 

//Use for ADMIN login experience
const getHeadersWithToken = () => {
    HEADERS.headers['x-auth-token'] = StorageUtils.getAPIToken();
    return HEADERS;
}

const API = module.exports;
//ADMIN 

API.loginAdmin = (payload) => {
    return axios.post(`${CONSTANTS.API_BASE_URL}/api/v1/login`, payload); 
}
API.signUpAdmin = (payload) => {
    return axios.post(`${CONSTANTS.API_BASE_URL}/api/v1/signup`, payload);
}