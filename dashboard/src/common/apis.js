import axios from 'axios'; 

import CONSTANTS from './constants';

 

const StorageUtils = require("../utils/storage_utils"); 

const HEADERS = {headers: {"Content-Type": "application/json"}}; 
let API_BASE_URL = process.env.API_BASE_URL || "http://localhost:8080" ; 

let PRIMARY_CUSTOMER_CODE = process.env.PRIMARY_CUSTOMER_CODE || "111"; 
//Use for ADMIN login experience
const getHeadersWithToken = () => {
  let token = StorageUtils.getAPIToken();
  console.log("Token from storage", token); // Ensure this logs the correct token
  return {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token // Ensure the header is 'x-auth-token'
    }
  };
}
const API = {
    loginAdmin: (payload) => {
      return axios.post(`${API_BASE_URL}/api/v1/login`, payload); 
    },
    signUpAdmin: (payload) => {
      return axios.post(`${API_BASE_URL}/api/v1/signup`, payload);
    }, 
    createQuixMetaData: (payload) => {
      let newToken = StorageUtils.getAPIToken();
      console.log("payload", payload)
      console.log("token--->", newToken )
      return axios.post(`${API_BASE_URL}/api/v1/quiz`, payload, getHeadersWithToken())
    }, 
    getAllQuizes: (params) =>{
      let newToken = StorageUtils.getAPIToken();
      console.log("token--->", newToken )
      const queryParams = params ? new URLSearchParams(params).toString() : "";
      return  axios.get(`${API_BASE_URL}/api/v1/quiz?${queryParams}`, getHeadersWithToken() )
    }, 
    addQuestions :  (payload, quizId) =>{
      // const quizId = payload.quizId; 
      const data = payload; 
      console.log("Payload in API", payload)

      // const queryParams = quizId ? new URLSearchParams(quizId).toString() : "";
      return  axios.patch(`${API_BASE_URL}/api/v1/quiz/${quizId}/questions`, data, getHeadersWithToken());
    }
  };
export default API; 
