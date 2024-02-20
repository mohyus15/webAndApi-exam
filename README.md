1: npm install first in root of the project
2: npm run dev, make sure to use 3000 port in frontend 
3: npm run deploy , make use http://localhost:8080/ as localhost in the browser, the reason when run npm run deploy the backend is building first and frotend.


This project is consist of several dependencies and they all listet here both frontend and backend here:
backend:
    bcryptjs
    body-parser
    cookie-parser
    cors
    dotenv
    express
    jsonwebtoken
    mongoose
    morgan
    socket.io

frontend:
    bootstrap
    react
    react-bootstrap
    react-dom
    react-icons
    react-input-emoji
    react-router-dom
    socket.io-client
    timeago.js
    react-contex-api

 there is many wyas to start for this application:
 1: cd backend/src/ 
     node server.js.
 2: cd frontend/
     npm start.
3:  in the root of the project you can write, npm run dev
    to start the whole application in one command. npm run dev. 

4:  npm run deploy with 8080 port 

admin users you can lgon as adminstrator are listed here.
the admin can see admin dashbord i can create prod , can also see all users, delete and update users.
if you want see i have some of the users is admin just go to backend src/seedData/users.

1:
  email: admin@hotmail.com
  password: 123456
 
2: 
  email: sensur@hotmail.com
  password: 123456
3:
  email: Bogdan@hotmail.com
  password: 123456


How is my website works:





docker:

AWS:
 I have decided to deploy this application to an AWS EC2 instance.
 i am using docker to deploy this application AWS.


