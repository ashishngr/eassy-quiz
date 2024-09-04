## Introduction
This project is a dynamic quiz application built using the MERN (MongoDB, Express, React, Node.js) stack. It allows users to create, manage, and participate in quizzes, with features such as Share the quiz participation link with any user, real-time leaderboards, feedback submission, and a secure quiz environment.

## Features
- **User Authentication**: Secure login and registration system.
- **Dynamic Quiz Generation**: Quizzes are generated dynamically based on the input data.
- **Adding Questions To Quiz**: Multiple questions can be added to a single quiz. 
- **Real-time Leaderboard**: Users can see real-time updates on the leaderboard as they progress through the quiz.
- **Timer-based Questions**: Each question has a timer that limits how long users can take to answer.
- **Summary Page**: At the end of the quiz, users receive a summary of their performance, including scores and correct/incorrect answers.
- **Feedback System**: Users can submit feedback and rate the quiz (Good, Bad, Excellent, Average).
- **Admin Dashboard**: Admins can create, update, and manage quizzes, including adding questions, setting time limits, and defining quiz visibility (Public, Private, IsShared). Can also analyze the quiz analytics along with the users who participate in the quiz.
- **API Integration**: The application communicates with a backend API for data retrieval and updates.

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
  
