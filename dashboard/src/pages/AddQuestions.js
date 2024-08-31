import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import DeleteIcon from "@mui/icons-material/Delete";
import API from "../common/apis";

const AddQuestions = () => {
  const { id } = useParams(); // Get quiz ID from URL params
  console.log("id------", id)
  const [questions, setQuestions] = useState([
    { text: "", options: ["", "", "", ""] },
  ]);
  const navigate = useNavigate(); 

  const handleAddQuestion = () => {
    setQuestions([...questions, { text: "", options: ["", "", "", ""] }]);
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const handleQuestionChange = (event, index, field, value) => {
    const updatedQuestions = [...questions];
    if (field.startsWith("option")) {
      const optionIndex = parseInt(field.replace("option", ""), 10);
      updatedQuestions[index].options[optionIndex] = value;
    } else {
      updatedQuestions[index][field] = value;
    }
    setQuestions(updatedQuestions);
    console.log("Updated Questions: ", updatedQuestions); // Log the updated questions
  };

  const handleSaveQuiz = async () => {
    try {
        const payload = {
            questions: questions,
        };  
      const response = await API.addQuestions(payload, id);
      console.log("API Response: ", response); // Log the API response
      if (response.status === 201) {
        navigate(`/admin/dashboard/quiz/${id}/details`); // Redirect to quiz details page
      } else {
        alert("Failed to add questions. Please try again.");
      }
    } catch (error) {
      console.error("Error adding questions: ", error);
      alert("An error occurred while adding questions. Please try again.");
    }
  };

  const isSaveDisabled = questions.length < 3;

  return (
    <Box sx={{ width: "100%" }}>
      <React.Fragment>
        <Typography sx={{ mt: 2, mb: 1 }}>
          <div className="flex flex-row-reverse gap-4 items-center p-10 justify-content-flex-end">
            <Button
              variant="contained"
              size="medium"
              disabled={isSaveDisabled}
              onClick={handleSaveQuiz}
            >
              Save
            </Button>
            <Button
              variant="contained"
              size="medium"
              onClick={handleAddQuestion}
            >
              Add Question
            </Button>
          </div>
          {questions.map((question, index) => (
            <form key={index}>
              <div className="max-w-2xl mx-auto mb-2">
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ArrowDownwardIcon />}
                    aria-controls={`panel${index + 1}-content`}
                    id={`panel${index + 1}-header`}
                  >
                    <div>
                      <Typography>Q{index + 1}: Add Question</Typography>
                      <Typography>A: Add Answer</Typography>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="flex flex-row justify-between p-2">
                      <Typography variant="h6" gutterBottom>
                        Edit
                      </Typography>
                      <Button disabled={questions.length === 1}>
                        <DeleteIcon
                          onClick={() => handleDeleteQuestion(index)}
                          aria-label="delete"
                        />
                      </Button>
                    </div>
                    <div>
                      <label
                        htmlFor="questionText"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Question Text
                      </label>
                      <input
                        type="text"
                        id="questionText"
                        name="text"
                        className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder=" "
                        required
                        value={question.text}
                        onChange={(e) =>
                          handleQuestionChange(e, index, "text", e.target.value)
                        }
                      />
                    </div>
                    {question.options.map((option, optionIndex) => {
                      const isLastOption =
                        optionIndex === question.options.length - 1;
                      return (
                        <div key={optionIndex}>
                          <label
                            htmlFor={`option-${optionIndex}`}
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            {isLastOption
                              ? `Right Option`
                              : `Wrong (Option) ${optionIndex + 1}`}
                          </label>
                          <input
                            type="text"
                            id={`option-${optionIndex}`}
                            name={`option-${optionIndex}`}
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=" "
                            required
                            value={option}
                            onChange={(e) =>
                              handleQuestionChange(
                                e,
                                index,
                                `option${optionIndex}`,
                                e.target.value
                              )
                            }
                          />
                        </div>
                      );
                    })}
                  </AccordionDetails>
                </Accordion>
              </div>
            </form>
          ))}
        </Typography>
      </React.Fragment>
    </Box>
  );
};
export default AddQuestions;
