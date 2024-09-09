# Introduction
This project is a dynamic quiz application built using the MERN (MongoDB, Express, React, Node.js) stack. It allows users to create, manage, and participate in quizzes, with features such as Share the quiz participation link with any user, real-time leaderboards, feedback submission, and a secure quiz environment.

# Features
- **User Authentication**: Secure login and registration system.
- **Dynamic Quiz Generation**: Quizzes are generated dynamically based on the input data.
- **Adding Questions To Quiz**: Multiple questions can be added to a single quiz. 
- **Real-time Leaderboard**: Users can see real-time updates on the leaderboard as they progress through the quiz.
- **Timer-based Questions**: Each question has a timer that limits how long users can take to answer.
- **Summary Page**: At the end of the quiz, users receive a summary of their performance, including scores and correct/incorrect answers.
- **Feedback System**: Users can submit feedback and rate the quiz (Good, Bad, Excellent, Average).
- **Admin Dashboard**: Admins can create, update, and manage quizzes, including adding questions, setting time limits, and defining quiz visibility (Public, Private, IsShared). Can also analyze the quiz analytics along with the users who participate in the quiz.
- **API Integration**: The application communicates with a backend API for data retrieval and updates.
  
# Quiz Application - Pages Overview

## Dashboard Pages

| Page                | Description                                                                                                                                                  |
|---------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Home Page**       | On the Home page, you can view different information about the various types of quizzes you've created. These are displayed in different tables like the Public Quiz table and the Saved Quiz table. |
| **Quiz Page**       | The Quiz page contains a table with several filters where you can find all the quizzes you have created as a user.                                            |
| **Edit Quiz Page**  | The Edit Quiz page allows you to edit the information for your quizzes.                                                                                       |
| **Quiz Details Page** | On the Quiz Details page, users can find detailed information about their quizzes and generate links for participation directly from this page.                |
| **Analytics Page**  | The Analytics page displays information in the form of graphs, providing insights into quiz performance.                                                      |
| **Profile Page**    | The Profile page contains your profile information.                                                                                                           |
| **Add Quiz Page**   | The Add Quiz page allows you to add q quiz basic details.                                                                                                        | **Add Questions Page**| The Add questions page allow you to add || edit questions to any quiz                                                                                                       |   

## Quiz Participation Pages

| Page                        | Description                                                                                                                                           |
|-----------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Landing Page**            | When a participant user pastes the quiz link in their browser, they land on this page.                                                                 |
| **Participation Info Page** | On this page, participants enter their information before starting the quiz.                                                                           |
| **Quiz Participation Page** | Participants can take part in the quiz and submit their responses on this page.                                                                        |
| **Quiz Summary Page**       | After completing the quiz, participants can view a summary of their performance on this page.                                                          |
| **Feedback Page**           | Participants can submit their feedback on this page.                                                                                                   |

## Actual Screen Shots
**Home Page**
<img width="1458" alt="Screenshot 2024-09-09 at 10 59 29 PM" src="https://github.com/user-attachments/assets/12b50e3b-e1d3-4cbf-9ed0-20608761b4d2">
<img width="1457" alt="Screenshot 2024-09-09 at 11 05 03 PM" src="https://github.com/user-attachments/assets/b47cf34e-baae-4ec0-a034-a232b3e1d7b5">
**Quiz Page**
<img width="1457" alt="Screenshot 2024-09-09 at 11 08 25 PM" src="https://github.com/user-attachments/assets/0f842394-a7aa-4de8-8bb2-329ad9eebd11">
**Add Quiz Page**
<img width="1468" alt="Screenshot 2024-09-09 at 11 10 03 PM" src="https://github.com/user-attachments/assets/1902f017-600b-4f48-85e4-f9cbb111a09f">
**Add Questions**
<img width="1467" alt="Screenshot 2024-09-09 at 11 11 31 PM" src="https://github.com/user-attachments/assets/edabbce8-32f8-45e8-b9e3-d5530678cbd1">
**Analytics Page**
<img width="1466" alt="Screenshot 2024-09-09 at 11 12 26 PM" src="https://github.com/user-attachments/assets/8cac69ee-005a-41aa-b257-e4b44c520692">
**Profile Page**
<img width="1470" alt="Screenshot 2024-09-09 at 11 13 06 PM" src="https://github.com/user-attachments/assets/9438d45d-e7ee-4e1e-8fdf-52a0344aede8"> 
**Edit Quiz Page**
<img width="1470" alt="Screenshot 2024-09-09 at 11 13 49 PM" src="https://github.com/user-attachments/assets/bed86dc1-2ee3-4ca9-aa8a-9f7520a06893">
**Quiz Detail Page**
<img width="1453" alt="Screenshot 2024-09-09 at 11 22 25 PM" src="https://github.com/user-attachments/assets/8644a94e-3ffd-4f5a-b432-e33e1e02bd58">
<img width="1457" alt="Screenshot 2024-09-09 at 11 22 37 PM" src="https://github.com/user-attachments/assets/7c198d2f-bff4-428f-91f6-37e3533696e1">


**Quiz Participation Pages** 
<img width="1470" alt="Screenshot 2024-09-09 at 11 23 15 PM" src="https://github.com/user-attachments/assets/99085242-2bdc-4f1f-a2c0-fbee9a5b58bd">

**Landing Page**
<img width="1465" alt="Screenshot 2024-09-09 at 11 23 23 PM" src="https://github.com/user-attachments/assets/3de863c2-715b-4654-bc8c-67d488b60318">

**Participation Info Page**
<img width="1466" alt="Screenshot 2024-09-09 at 11 23 51 PM" src="https://github.com/user-attachments/assets/8e6e23b5-0d49-4f64-9a16-a127c7263868">

**Quiz Summary Page** 
<img width="1470" alt="Screenshot 2024-09-09 at 11 24 11 PM" src="https://github.com/user-attachments/assets/9b4e7e88-5620-4320-bf06-e77ccd3b24f5">

**Feedback Page** 
<img width="1467" alt="Screenshot 2024-09-09 at 11 24 20 PM" src="https://github.com/user-attachments/assets/e4ad11b0-9a1c-45ed-ab9a-04701e808237">



## Installation
To install the project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   https://github.com/ashishngr/eassy-quiz.git
2. **Navigate to the project directory**:
   ```bash
   cd quiz-application
3. **Install the dependencies**:
   ```bash
   npm start
## Backend
The backend is built using Node.js and Express. It connects to a MongoDB database to store and retrieve quiz data.
## Frontend 
The frontend is built using React and Material-UI, providing a responsive and interactive user interface.
## Acknowledgement 
- **React**: A JavaScript library for building user interfaces.
- **Material-Ui**: A popular React UI framework for designing responsive applications.
- **Node.Js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express**:A fast, unopinionated, minimalist web framework for Node.js.
  
