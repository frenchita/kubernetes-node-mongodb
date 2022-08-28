const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose');
const cors = require('cors');

app.use(express.json())

app.use(cors())

mongoose.connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`, {useNewUrlParser: true});
mongoose.connection.once('open', function() {
  console.log("Mongo Connection Successful!");
});

mongoose.connection.on('error', err => {
  console.log(err);
  process.exit()
});

const CardsSchema = mongoose.Schema({
  text: String
});

const Card = mongoose.model('Card', CardsSchema, 'Cardstore');

app.get('/api/cards', async function (req, res) {
  res.json(await Card.find())
}) 

app.post('/api/cards', async function (req, res) {
  try {

    const data = {text: req.body.text}
    await new Card(data).save();

    console.log("Card added: " + data.text)
    res.status(200).json(await Card.find())

  } catch (error) {
    res.status(500).json({"message": "unexpected error"})
  }
  
})

app.listen(process.env.PORT, function(){
  console.log(`Server Cards is listening ${process.env.PORT}`);
})