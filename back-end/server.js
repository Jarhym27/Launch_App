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
const { getAll,insertRow,deleteRow } = require("./controllers");
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

//launch_requests joined payloads, launch_vehicles, launch_pads
app.get('/join/launch_requests', (req, res) => {
  knex('launch_requests')
  .join('payloads', 'payloads.id', 'launch_requests.payload_id')
  .join('launch_vehicles', 'launch_vehicles.id', 'launch_requests.launch_vehicle_id')
  .join('launch_pads', 'launch_pads.id', 'launch_requests.launch_pad_id')
  .select('*')
  .then(data => res.status(200).json(data))
  .catch(err =>
      res.status(404).json({
          message:
              'The data you are looking for could not be found. Please try again'
      })
  );
})

//users joined launch_vehicles
app.get('/join/users-launch_vehicles',(req,res)=> {
  knex('users')
    .join('launch_vehicles','users.id','launch_vehicles.lsp_user_id')
    .then(data => res.status(200).json(data))
    .catch(err =>
      res.status(404).json({
          message:
              'The data you are looking for could not be found. Please try again'
      })
    );
})

//users joined payloads
app.get('/join/users-payloads',(req,res)=> {
  knex('users')
    .join('payloads','users.id','payloads.payload_user_id')
    .then(data => res.status(200).json(data))
    .catch(err =>
      res.status(404).json({
          message:
              'The data you are looking for could not be found. Please try again'
      })
    );
})

//users joined launch_pads
app.get('/join/users-launch_pads',(req,res)=> {
  knex('users')
    .join('launch_pads','launch_pads.lsp_user_id','users.id')
    .then(data => res.status(200).json(data))
    .catch(err =>
      res.status(404).json({
          message:
              'The data you are looking for could not be found. Please try again'
      })
    );
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

//delete row of data from table by id
app.delete('/table/:table',(req,res) => {
  const {table} = req.params;
  const id = req.body.id
  //if the table is payloads, launch_vehicles, or launch_pads, check to make sure there isn't an active launch request with that id
  //if exists, return 401 error
  //if not, return status 200 and delete
  if(table ==='payloads' || table === 'launch_vehicles' || table === 'launch_pads'){
    let idParam = table.slice(0,table.length-1).concat('_id')
    getAll('launch_requests')
      .then(data => data.map(request=>request[idParam]))
      .then(idsArray => {
        if(idsArray.includes(id)){
          console.log(`Cannot delete ${table.slice(0,table.length-1)} id ${id} because there is an active launch request with this item.`)
          res.status(401).send({error: `Cannot delete ${table.slice(0,table.length-1)} id ${id} because there is an active launch request with this item.`})
        } else {
            deleteRow(id,table)
            .then(response => {
              res.status(200).send({message:`Deleted id ${id} from table ${table}`})
            })
            .catch(err => {
              console.error(err)
              res.status(401).send(err)
            })
        }})
  //if table is launch_requests, delete launch request
  } else if (table ==='launch_requests'){
      deleteRow(id,table)
      .then(response => {
        res.status(200).send({message:`Deleted id ${id} from table ${table}`})
      })
      .catch(err => {
        console.error(err)
        res.status(401).send(err)
      })
    }
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
        if(result){
          let {password:_ , ...scrubbed} = data[0]
          // let cookieVal = ''
          // res.cookie('userInfo', scrubbed, {maxAge: 3600000})
          res.send(scrubbed)
        }
        else{
          res.status(401).send({message: 'INVALID LOGIN'})
        }
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