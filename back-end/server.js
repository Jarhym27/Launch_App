const express = require('express')
const app = express()
const port = 8080;
const cors = require('cors')
const cookieParser = require("cookie-parser")
const cookieSession = require('express-session')
const knex = require("knex")(
    require("./knexfile.js")[process.env.NODE_ENV || "development"]
  );

//MiddleWare
app.use(express.json());
app.use(cors());
app.use(cookieParser())

app.get('/', (req,res) =>{
    res.send('You\'re using our app? SWEET DAWG!')
})


app.post('/login', (req, res) =>{
        let {username, password} = req.body
    
        knex
        .insert({
          username,
          password
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
    

    app.get('/login', (req, res) =>{
        
        knex
              .select("*")
              .from("users")
        
        .then((data) => res.status(200).json(data))
        .catch((err) =>
          res.status(404).json({
            message:
            "User doesnt exist",
          })
     ) })




app.listen(port, () => console.log(`Server is running on  port:${port}`))