# assignment-3 course-review_server

Server Live Link

### https://course-review-server.vercel.app

## Run the server application locally

If you want to run the server on your computer, run the command `tsc -w` in another terminal to convert the TypeScript code to JavaScript code. And start the server with `npm start` command.

## Server Documentation

- This server is created to manage Course,Courses category and their Review.

## Server API

### 1. Create a Course

Endpoint: POST `/api/course`

### 2. Get Paginated and Filtered Courses

Endpoint: GET `/api/courses`

### 3. Create a Category

Endpoint: POST `/api/categories`

### 4. Get All Categories

Endpoint: GET `/api/categories`

### 5. Create a Review

Endpoint: POST `/api/reviews`

### 6. Update a Course

Endpoint: PUT `/api/courses/:courseId`

### 7. Get Course by ID with Reviews

Endpoint: GET `/api/courses/:courseId/reviews`

### 8. Get the Best Course Based on Average Review (Rating)

Endpoint: GET `/api/course/best`
