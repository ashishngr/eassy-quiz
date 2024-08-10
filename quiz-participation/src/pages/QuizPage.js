import React, { useState, useEffect } from "react"; 
import axios from "axios";
import { useParams } from "react-router-dom"; 

const QuizPage = () => {
  const { quizId } = useParams(); 
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(()=>{
   
    fetchQuizData();
  },[quizId])
    const fetchQuizData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/quiz-information/${quizId}`)
      console.log("Quiz response", response.data.data)
      const { questions } = response.data.data; 
      setQuestions(questions);
      setLoading(false);
      
    } catch (error) {
      setError("Failed to load quiz data");
      setLoading(false);
    }
  }
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleQuestionClick = (index) => {
    setCurrentQuestionIndex(index);
  }; 
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (questions.length === 0) return <p>No questions available.</p>;

  return (
    <div className="container mx-auto p-4">
      <header className="bg-gray-100 text-black p-4 rounded mb-4 flex justify-center items-center">
        <h1 className="text-xl font-bold">
          {`${currentQuestionIndex + 1}/${questions.length} Questions`}
        </h1>
      </header>

     <div className="flex">
        <div className="flex-1 mr-4">
          <div className="bg-white shadow p-4 rounded mb-4">
            <div className="flex justify-center items-center h-54 m-10">
              <div className="bg-gray-100 border border-gray-100 shadow-md p-6 rounded-lg max-w-md">
                <h2 className="text-lg font-semibold text-center">
                  {questions[currentQuestionIndex]?.text}
                </h2>
              </div>
            </div>

            <div className="flex flex-col flex-wrap gap-5 mb-4 ">
              {questions[currentQuestionIndex]?.options.map((option, index) => (
                <button
                  key={index}
                  className="bg-gray-100 border border-gray-100 shadow-md p-6 rounded-lg flex-1"
                >
                  {option}
                </button>
              ))}
            </div>
            <div className="text-center  flex justify-center items-center gap-4">
              <button
                onClick={handlePreviousQuestion}
                className="bg-gray-200 text-black p-2 rounded"
                disabled={currentQuestionIndex === 0} // Disable if on the first question
              >
                Previous
              </button>
              <button
                onClick={handleNextQuestion}
                className="bg-blue-500 text-white p-2 rounded"
                disabled={currentQuestionIndex >= questions.length - 1}
              >
                Next
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="bg-white shadow p-4 rounded">
            <div className="text-center mb-4">
              <h1 className="text-xl font-bold">Leaderboard</h1>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Answered Questions:</span> 2
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Left Questions:</span> 3
              </p>
            </div>
            <div className="flex flex-row flex-wrap items-center">
              {questions.map((_, index) => (
                <button
                  key={index}
                  className={`m-1 p-3 w-16 rounded ${
                    index === currentQuestionIndex
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => handleQuestionClick(index)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
              Skip To End
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
