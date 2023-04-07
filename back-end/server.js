const express = require('express')
const app = express()
const port = 8081

app.get('/', (req,res) =>{
    res.send('You\'re using our app? SWEET DAWG!')
})

app.listen(port, () => console.log(`Server is running on  port:${port}`))