import express from 'express'
import mongoose from 'mongoose'
import Cards from './dbCards.js'
import Cors from 'cors'

//App Config
const app = express();
const port = process.env.PORT || 8001


//Middlewares
app.use(express.json())
app.use(Cors())

//Db Config
mongoose.connect("mongodb://localhost:27017/tinder-clone",{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
//API Endpoints
app.get('/',(req,res)=>res.status(200).send('Helllloo'))

app.post('/tinder/card',(req,res)=>{
    const dbCard = req.body

    Cards.create(dbCard, (err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
})

app.get('/tinder/cards',(req,res)=>{
    Cards.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
})
//Listener
app.listen(port,()=> console.log(`Listening on localhost: ${port}`))