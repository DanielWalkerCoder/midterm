const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const allyRouter = require('./routes/allies/allyRouter')
const expRouter = require('./routes/exp/expRouter')
const foeRouter = require('./routes/foes/foeRouter')
const recipeRouter = require('./routes/recipes/recipeRouter')
const treasureRouter = require('./routes/treasures/treasureRouter')
const weaponRouter = require('./routes/weapons/weaponRouter')

mongoose
    .connect("mongodb://127.0.0.1:27017/Chef-Hero")//This creates a database named Chef-Hero that we can see in Studio 3T. 127:0.0.1 is the same as localhost, but sometimes programs won't use the latter.
    .then(()=>{
        console.log('MONGO DB CONNECTED')
    }).catch((e)=>{
        console.log(e)
    })

const app = express()
app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use('/api/allies', allyRouter)
app.use('/api/exp', expRouter)
app.use('/api/foes', foeRouter)
app.use('/api/recipes', recipeRouter)
app.use('/api/treasures', treasureRouter)
app.use('/api/weapons', weaponRouter)

app.listen(3000, ()=>{
    console.log('Server started on port 3000.')
})