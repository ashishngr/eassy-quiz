import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const QuizPage = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();

  // State to manage quiz data and user interactions
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [correctOptions, setCorrectOptions] = useState([]);
  const [timer, setTimer] = useState(40);
  const [disabledOptions, setDisabledOptions] = useState([]);

  // Fetch quiz data on initial load
  useEffect(() => {
    fetchQuizData();
  }, [quizId]);

  // Timer functionality
  useEffect(() => {
    if (timer === 0) {
      handleOptionDisable(currentQuestionIndex); // Disable options when time is up
      
      // Capture as 'Unanswered' if no option was selected when time ran out
      if (!selectedOptions[currentQuestionIndex]) {
        const unansweredResult = {
          text: questions[currentQuestionIndex]?.text,
          userSubmittedOption: "Unanswered",
          correctOption: correctOptions[currentQuestionIndex],
          points: 0,
        };
        const newSelectedOptions = [...selectedOptions];
        newSelectedOptions[currentQuestionIndex] = unansweredResult;
        setSelectedOptions(newSelectedOptions);
      }
  
      return;
    }
  
    if (
      selectedOptions[currentQuestionIndex] ||
      disabledOptions.includes(currentQuestionIndex)
    ) {
      return;
    }
  
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);
  
    return () => clearInterval(interval);
  }, [timer, currentQuestionIndex]);

  // Fetch quiz data function
  const fetchQuizData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/quiz-information/${quizId}`
      );
      const { questions } = response.data.data;

      // Capture correct options before randomization
      const correctOptionsTemp = questions.map(
        (question) => question.options[question.correctOptionIndex]
      );
      setCorrectOptions(correctOptionsTemp);

      // Randomize options
      const randomizedQuestions = questions.map((question) => {
        return {
          ...question,
          options: question.options.sort(() => Math.random() - 0.5),
        };
      });

      setQuestions(randomizedQuestions);
      setLoading(false);
    } catch (error) {
      setError("Failed to load quiz data");
      setLoading(false);
    }
  };

  // Handle answer submission
  const handleOptionClick = (selectedOption) => {
    if (timer === 0 || disabledOptions.includes(currentQuestionIndex)) {
      return; // Prevent submission if time is up or options are disabled
    }

    const correctOption = correctOptions[currentQuestionIndex];
    const points = selectedOption === correctOption ? 1 : 0;

    const newResult = {
      text: questions[currentQuestionIndex].text,
      userSubmittedOption: selectedOption,
      correctOption: correctOption,
      points: points,
    };

    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[currentQuestionIndex] = newResult;
    setSelectedOptions(newSelectedOptions);

    handleOptionDisable(currentQuestionIndex); // Disable options after submission
  };

  // Disable options for the current question
  const handleOptionDisable = (questionIndex) => {
    if (!disabledOptions.includes(questionIndex)) {
      setDisabledOptions((prev) => [...prev, questionIndex]);
    }
  };

  // Navigate to previous question
const handlePreviousQuestion = () => {
  if (currentQuestionIndex > 0) {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  }
};

  // Navigate to next question
  const handleNextQuestion = () => {
    // Add check for unanswered questions
    if (!selectedOptions[currentQuestionIndex]) {
      const unansweredResult = {
        text: questions[currentQuestionIndex].text,
        userSubmittedOption: "Unanswered",
        correctOption: correctOptions[currentQuestionIndex],
        points: 0,
      };
      const newSelectedOptions = [...selectedOptions];
      newSelectedOptions[currentQuestionIndex] = unansweredResult;
      setSelectedOptions(newSelectedOptions);
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimer(40);
    } else {
      navigateToSummary();
    }
  };

  // Handle skip to end functionality
  const handleSkipToEnd = async() => {
    const remainingQuestions = questions.slice(currentQuestionIndex);
    console.log("Skip to end: ", remainingQuestions);


    // Capture results for remaining questions as unanswered
    const skippedResults = remainingQuestions.map((question, index) => ({
      text: question.text,
      userSubmittedOption: "Skipped",
      correctOption: correctOptions[currentQuestionIndex + index],
      points: 0,
    }));

    // setSelectedOptions((prev) => [...prev, ...skippedResults]);
    // navigateToSummary(); 
    const finalResults = [...selectedOptions, ...skippedResults];
    setSelectedOptions(finalResults); 

     // Determine if the quiz is complete
     const isComplete = finalResults.length === questions.length;

    try {
      // API call to save quiz participation data to the database
      await axios.post(`http://localhost:8080/api/v1/quiz-participation`, {
        quizId,                       // Quiz ID
        isComplete: false,            // Quiz not fully completed by user
        participationTime: new Date(),// Time when the user ends participation
        questions: finalResults       // Final results including skipped questions
      });
  
      // Navigate to the summary page after successful save
      navigateToSummary();
    } catch (error) {
      console.error("Error saving quiz participation data:", error);
      // Optionally handle errors, e.g., show an error message to the user
    }

  };

  // Navigate to summary page
  const navigateToSummary = () => {
    // Added logic to handle unanswered last question
    if (!selectedOptions[currentQuestionIndex]) {
      const unansweredResult = {
        text: questions[currentQuestionIndex].text,
        userSubmittedOption: "Unanswered",
        correctOption: correctOptions[currentQuestionIndex],
        points: 0,
      };
      const newSelectedOptions = [...selectedOptions];
      newSelectedOptions[currentQuestionIndex] = unansweredResult;
      setSelectedOptions(newSelectedOptions);
    }
    console.log("Final Results:", selectedOptions);
    navigate("/quiz/summary", { state: { results: selectedOptions } });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (questions.length === 0) return <p>No questions available.</p>;

  return (
    <div className="container mx-auto p-4">
      <header className="bg-gray-100 text-black p-4 rounded mb-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">
          {`${currentQuestionIndex + 1}/${questions.length} Questions`}
        </h1>
        <p className="text-xl font-bold">{`Time left: ${timer}s`}</p>
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

            <div className="flex flex-col flex-wrap gap-5 mb-4">
              {questions[currentQuestionIndex]?.options.map(
                (option, index) => (
                  <button
                    key={index}
                    className={`bg-gray-100 border border-gray-100 shadow-md p-6 rounded-lg flex-1 
                      ${selectedOptions[currentQuestionIndex]?.userSubmittedOption === option ? "bg-green-200" : ""} 
                    `}
                    onClick={() => handleOptionClick(option)}
                    disabled={
                      timer === 0 ||
                      disabledOptions.includes(currentQuestionIndex) ||
                      selectedOptions[currentQuestionIndex]
                    }
                  >
                    {option}
                  </button>
                )
              )}
            </div>
            <div className="text-center flex justify-center items-center gap-4">
              <button
                onClick={handlePreviousQuestion}
                className="bg-gray-200 text-black p-2 rounded"
                disabled={currentQuestionIndex === 0}
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
                <span className="font-semibold">Answered Questions:</span>{" "}
                {selectedOptions.filter((opt) => opt).length}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Left Questions:</span>{" "}
                {questions.length - selectedOptions.filter((opt) => opt).length}
              </p>
            </div>
            <div className="flex flex-row flex-wrap items-center">
              {questions.map((_, index) => (
                <button
                  key={index}
                  className={`m-1 p-3 w-16 rounded ${
                    index === currentQuestionIndex
                      ? "bg-blue-500 text-white"
                      : selectedOptions[index]
                      ? "bg-green-500 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => setCurrentQuestionIndex(index)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={handleSkipToEnd}
            >
              Skip To End
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
