const express = require("express");
const bodyParser = require("body-parser");
const port = 3000;
const app = express();

// middleware to parse the JSON DATA
app.use(express.json());
//  create some students list
const students = [
  { id: 1, name: "Alis", grade: "A", age: 16 },
  { id: 2, name: "David", grade: "B", age: 15 },
  { id: 3, name: "John", grade: "C", age: 14 }
];

// create middleware to get the data(all the studets) from servers
app.get("/students", (req, res, next) => {
  res.json(students);
});

//GET student by id
app.get("/students/:id", (req, res, next) => {
  const student = students.find(
    (student) => student.id === parseInt(req.params.id)
  );
  if (!student) {
    return res.status(404).json("student not found.");
  }
  res.status(200).json(student);
});

//POST a new student (add new documents to the collection)
app.post("/students/student", (req, res, next) => {
  console.log("req.body to POST METHOD", req.body);
  const newStudent = {
    id: req.body.id + 1,
    name: req.body.name,
    grade: req.body.grade,
    age: req.body.age
  };
  students.push(newStudent);
  res.status(201).json({ message: "document added.", newStudent });
});

//update student by Id
app.put("/students/:id", (req, res, next) => {
  // const newData = {
  // 	name:req.body.name,
  // 	age:req.body.age,
  // 	grade:req.body.age
  // } // which is used to create a new student not for update the existing data of student
  console.log(
    "params. TO UPDATE(put)",
    req.params,
    typeof parseInt(req.params),
    typeof req.params
  );

  const student = students.find((s) => s.id === parseInt(req.params.id));
  if (!student) {
    return res.status(404).json({ message: "Student  was not found." });
  }
  student.name = req.body.name;
  student.grade = req.body.grade;
  student.age = req.body.age;

  res.status(200).json({ message: "document updated successfully.", student });
});

//Delete student by id;

app.delete("/students/:id", (req, res, next) => {
  console.log("to Delete", req.params);
  const studentIndex = students.findIndex(
    (s) => s.id === parseInt(req.params.id)
  );
  if (!studentIndex) return res.status(404).json("student was not found.");
  students.splice(studentIndex, 1);

  res.status(204).send();
  res.status(204).json({ message: "Document deleted successfully." });
});

console.log(">>", students);

app.listen(port, () => {
  console.log(`School API running on http://localhost:${port} `);
});

// run the api in the terminal using node filName.js
// you will get the output as
// School API running on http://localhost:3000

// Test the api
// to get all studentS URL IS
// http://localhost:3000/students

// you will get below data in the browser
[
  { id: 1, name: "Alis", grade: "A", age: 16 },
  { id: 2, name: "David", grade: "B", age: 15 },
  { id: 3, name: "John", grade: "C", age: 14 }
];

// to get student by id url is
// http://localhost:3000/students/:id
// http://localhost:3000/students/:1>>>>> {"error":"student not found."}
//"student not found."
//correct url is
// http://localhost:3000/students/1
// {"id":1,"name":"Alis","grade":"A","age":16}
// http://localhost:3000/students/3
// {"id":3,"name":"John","grade":"C","age":14}

//Post a new student
//
// 200 used for successful requests that retrieve or update a resource
// 201 used for successful requests that crete a new resourse on the server

// 400 used when input is invalid or malformed
// 401 used when authorization fails
// 404 used when resource not DOES NOT EXIST.

/*

if I want to give some other persons my collection of data, then which url I have to give? 
how can i make a general api to create 

ChatGPT said:
ChatGPT

If you want to give access to your API and make it publicly accessible, you'll need to deploy it to a web 
server or cloud service so that others can use a public URL instead of localhost. When the API is deployed 
online, it will have a public URL that others can use to access your collection of data.

Here’s a step-by-step guide to make your API publicly accessible and provide others with a URL to use:

1. Deploy Your API to a Cloud Service
There are several ways to deploy your API. Here are some of the most common services:

Heroku (Free and easy to set up for Node.js)
Vercel (Simple and easy for deploying small apps)
Render
AWS, Google Cloud, or Azure (if you need more control over hosting)
For simplicity, let’s walk through the process of deploying your API on Heroku, which is commonly used for
 small Node.js applications.

Deploying Your API on Heroku

Step 1: Install the Heroku CLI
First, you'll need to install the Heroku CLI (Command Line Interface) so you can interact with Heroku from the terminal.

Install the Heroku CLI from here.
Step 2: Log In to Heroku
Once installed, open the terminal and log in to your Heroku account:

bash
Copy code
heroku login
Step 3: Prepare Your Project for Deployment
Make sure your project (containing the server.js file) has the following:

Procfile: This file tells Heroku how to run your server.

In your project folder, create a Procfile:

bash
Copy code
touch Procfile
In Procfile, add this content:

bash
Copy code
web: node server.js
Update package.json: Make sure your package.json file has the correct start script.

In your package.json, make sure this part is present:

json
Copy code
"scripts": {
  "start": "node server.js"
}
Step 4: Create a Git Repository
Heroku uses Git for deployment, so initialize a git repository in your project folder if you haven't already:

bash
Copy code
git init
git add .
git commit -m "Initial commit"
Step 5: Create a New Heroku App
Now, create a new Heroku app using the Heroku CLI:

bash
Copy code
heroku create
This command will create a new app with a random name (or you can specify your own app name). 
It will also give you the URL for your app (e.g., https://my-app-name.herokuapp.com).

Step 6: Deploy to Heroku
Push your code to Heroku using git:

bash
Copy code
git push heroku master
Heroku will build and deploy your app. Once it's done, you'll see a URL like https://my-app-name.herokuapp.com. This is the public URL where your API is now accessible.

Step 7: Open the Deployed App
You can open your API by running:

bash
Copy code
heroku open
Now, you can access your API via a public URL like:

https://my-app-name.herokuapp.com/students to get the list of students.
https://my-app-name.herokuapp.com/students/1 to get a specific student by id.

2. Give the URL to Others
Once your API is deployed, you can give the public URL to anyone, and they can access the data from their 
browser or using tools like Postman.

For example, after deployment on Heroku:

Your base API URL could be something like: https://my-student-api.herokuapp.com

To access your data, people can use URLs like:
GET all students: https://my-student-api.herokuapp.com/students
GET student by ID: https://my-student-api.herokuapp.com/students/1
Others can now access your API over the internet, and you don't have to run it locally.

3. Deploying to Other Platforms
You can follow similar steps for other platforms, like Vercel, Render, or even set up your own VPS on DigitalOcean or AWS. Each platform will give you a public URL once your app is deployed.

Recap
Deploying to Heroku (or any other platform) will give you a public URL where your API is hosted.
You can share this public URL with others to access your API and the JSON data (students list in your case).
The public URL will look like https://your-app-name.herokuapp.com/students.
This is how you can create a general API, deploy it, and share it with others for accessing your collection of documents.

Let me know if you need help with deployment steps or configuring other cloud platforms!






*/
