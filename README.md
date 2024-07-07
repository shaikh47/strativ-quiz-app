# Strativ Quiz App

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)

## Live Site link: https://stirring-malabi-f286a6.netlify.app/

## Demo Credentials 

  [password is hashed and then stored in the application]

  ### Admin
  ```
  email: admin1@gmail.com
  password: 1234
  ```

  ### General User

  ```
  email: user1@gmail.com
  password: 1234
  ```

## Introduction

This is a Quiz App built using React, TypeScript, Redux, and Tailwind CSS. The app has two types of users: Admin and General User. Admins can add, edit, and delete questions, while general users can log in and answer those questions. Users can also edit their answers, with a history of previous answers being displayed.

## Features

- **Admin Features:**
  - Log in (hardcoded admin)
  - Add, edit, and delete questions
  - View answers for the questions
  - View past histories on individual questions if any
- **User Features:**
  - Self sign-in and registration
  - participate in the quiz
  - Edit answers (with history of previous answers)
- **General:**
  - Data persisted locally using browser's local storage
  - Protected routes for admin pages

## Technologies Used

- React
- TypeScript
- Redux
- Tailwind CSS
- Local Storage for data persistence

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone <ssh link>
   ```
2. Install dependencies and run the app
    ```
    cd strativ-quiz-app
    npm i
    npm run dev
    ```
