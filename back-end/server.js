const express = require('express')
const app = express()
const port = 8080;
const cors = require('cors')
const cookieParser = require("cookie-parser")
const cookieSession = require('express-session')
const bcrypt = require('bcryptjs')
const knex = require("knex")(
    require("./knexfile.js")[process.env.NODE_ENV || "development"]
  );
const { getAll,insertRow } = require("./controllers");
const morgan = require('morgan')

//middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser())
app.use(morgan('short'))

app.get('/', (req,res) =>{
    res.status(200).send('You\'re using our app? SWEET DAWG!')
})

//get all data from specific table
app.get('/table/:table',(req,res) => {
    const {table} = req.params
    getAll(table)
      .then((data)=> {
        res.status(200).send(data)
      })
      .catch((err) => {
        console.error(err)
        res.status(401).send(err)
      })
})

//insert row of data into specific table
app.post('/table/:table',(req,res) => {
  const {table} = req.params
  const data = req.body
  insertRow(data,table)
    .then((response)=> {
      res.status(200).send(data)
    })
    .catch((err) => {
      console.error(err)
      res.status(401).send(err)
    })
})

app.post('/signup', (req, res) =>{
        let {username, password,organization} = req.body
    
        knex
        .insert({
          username,
          password,
          organization
        })
        .into("users")
        .then(() => {
      res.status(201).send("Sent request successfully!");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error inserting data!");
    });
})
    

app.post('/login', (req, res) =>{
  console.log(req.body)
  knex
    .select("*")
    .from("users")
    .where('username', req.body.username)
    .then((data) => {
      // console.log(data[0].password)
      
      bcrypt.compare(req.body.password, data[0].password,  (err, result)=>{
        console.log(result)
      })
      
    })
    .catch((err) =>
      res.status(404).json({
        message:
        "User doesnt exist",
      })
    )
})




app.listen(port, () => console.log(`Server is running on  port:${port}`))