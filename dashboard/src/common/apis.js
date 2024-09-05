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
    publicQuiz : async(params) =>{
      const queryParams = params ? new URLSearchParams(params).toString() : "";
      return await axios.get(`${API_BASE_URL}/api/v1/public?${queryParams}`, getHeadersWithToken())
    }, 
   
    topTenQuiz : async () =>{
      return await axios.get(`${API_BASE_URL}/api/v1/latesQuiz`, getHeadersWithToken()); 
    }, 
    getPrivateQuizLink : async(quizId) =>{
      return await axios.get(`${API_BASE_URL}/api/v1/privateQiz/${quizId}`, getHeadersWithToken()); 
    }, 
    getQuizDetails : async(quizId) => { 
      return await axios.get(`${API_BASE_URL}/api/v1/quiz/${quizId}`, getHeadersWithToken())
    }, 
    getSaveQuizes : async(params) =>{
      const queryParams = params ? new URLSearchParams(params).toString() : "";
      return await axios.get(`${API_BASE_URL}/api/v1/save-quizes?${queryParams}`, getHeadersWithToken())
    }, 
    saveQuizToLibrary : async(payload) => {
      let data = payload; 
      console.log("Data", data.quizId)
      return await axios.post(`${API_BASE_URL}/api/v1/save`, data, getHeadersWithToken())
    }, 
    getQuizParticipationRating : async(payload) =>{
      let filter = payload; 
      return await axios.get(`${API_BASE_URL}/api/v1/quiz-feedback?timestamp=${filter}`, getHeadersWithToken())
    },
    getQuizCompletionData : async(payload) => {
      let filter = payload; 
      return await axios.get(`${API_BASE_URL}/api/v1/quiz-completion?timestamp=${filter}`, getHeadersWithToken())
    }, 
    getQuizCount : async(payload) => {
      let filter = payload; 
      return await axios.get(`${API_BASE_URL}/api/v1/quiz-count?timestamp=${filter}`, getHeadersWithToken())
    }, 
    getParticipantCount : async(payload) =>{
      let filter = payload; 
      return await axios.get(`${API_BASE_URL}/api/v1/quiz-participant?timestamp=${filter}`, getHeadersWithToken())
    }, 
    getQuizByScope : async(payload) =>{
      let filter = payload; 
      return await axios.get(`${API_BASE_URL}/api/v1/quiz-scope?timestamp=${filter}`, getHeadersWithToken())
    },
    getQuizAttendeeCount : async(payload) => {
      let quizId = payload
      return await axios.get(`${API_BASE_URL}/api/v1/quiz-attendee-count?quizId=${quizId}`, getHeadersWithToken());
    }, 
    getAttendeesQuizRating : async(payload) => {
      let quizId = payload
      return await axios.get(`${API_BASE_URL}/api/v1/quiz-attendee-rating?quizId=${quizId}`, getHeadersWithToken());
    }, 
    getQuizCompletionRatio : async(payload) => {
      let quizId = payload
      return await axios.get(`${API_BASE_URL}/api/v1/quizs-play-status?quizId=${quizId}`, getHeadersWithToken());
    }, 
    updateQuiz : async(quizId, payload) =>{
      return await axios.put(`${API_BASE_URL}/api/v1/quiz/${quizId}`, payload, getHeadersWithToken());
    }, 
    deleteQuiz: async(quizId, data) => {
      return await axios.put(`${API_BASE_URL}/api/v1/delete-quiz/${quizId}`, data, getHeadersWithToken()); 
    }
  };
export default API; 
