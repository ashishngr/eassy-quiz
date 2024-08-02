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
      return  axios.patch(`${API_BASE_URL}/api/v1/quiz/${quizId}/questions`, data, getHeadersWithToken());
    }, 
    getSingleQuiz : (id) =>{
      return  axios.get(`${API_BASE_URL}/api/v1/quiz/${id}`, getHeadersWithToken()); 
    }, 
    getUserProfile :  async () =>{
      return  await axios.get(`${API_BASE_URL}/api/v1/profileInfo`, getHeadersWithToken());
    }, 
    updateUserProfileInfo : (payload) =>{
      return axios.put(`${API_BASE_URL}/api/v1/updateProfile`, payload, getHeadersWithToken())
    },
    updatePassword : (payload) =>{
      return axios.put(`${API_BASE_URL}/api/v1/updatePassword` , payload, getHeadersWithToken());
    }, 
    quizStat : async() =>{
      return await axios.get(`${API_BASE_URL}/api/v1/stats`, getHeadersWithToken())
    }, 
    publicQuiz : async() =>{
      return await axios.get(`${API_BASE_URL}/api/v1/public`, getHeadersWithToken())
    }, 
    getSavedQuizzes : async() =>{
      return await axios.get(`${API_BASE_URL}/api/v1/saved`, getHeadersWithToken())
    },
    topTenQuiz : async () =>{
      return await axios.get(`${API_BASE_URL}/api/v1/latesQuiz`, getHeadersWithToken()); 
    }, 
    getPrivateQuizLink : async(quizId) =>{
      return await axios.get(`${API_BASE_URL}/api/v1/privateQiz/${quizId}`, getHeadersWithToken()); 
    }, 
    getQuizDetails : async(quizId) => { 
      return await axios.get(`${API_BASE_URL}/api/v1/quiz/${quizId}`, getHeadersWithToken())
    }
  };
export default API; 
