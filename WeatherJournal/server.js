/* Empty JS object to act as endpoint for all routes */
projectData = {};

/* Express to run server and routes */
const express = require('express');

/* Start up an instance of app */
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')
/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

/* Initialize the main project folder*/
app.use(express.static('website'));

const port = 3000;
/* Spin up the server*/
const server = app.listen(port, listening);
 function listening(){
    // console.log(server);
    console.log(`running on localhost: ${port}`);
  };

// GET route

app.get('/all', getData)
function getData(req, res){
  res.send(projectData)


}

// POST route
app.post('/projectData', addData);

function addData (req,res){

  projectData = req.body
  //console.log(newEntry, 'newEntry');
  //console.log(projectData, 'projectData');
  res.send(projectData);
 

};





