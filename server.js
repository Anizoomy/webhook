require('dotenv').config()
const express = require('express')
const PORT = process.env.PORT || 7070
const mongoose = require('mongoose')
const userRouter = require('./routes/userRouter')
const productRouter = require('./routes/productRouter')
const addCart = require('./routes/addCartRouter')

const app = express()
app.use(express.json()); 


app.use("/api/v1", userRouter)
app.use("/api/v1", productRouter)
app.use('/api/v1', addCart)

const db = process.env.DATABASE_URI

mongoose
.connect(db)
.then(() => {
  console.log('Connection to database has been established successfully.');
  app.listen(PORT, () => {
  console.log(`Server running on http://localhost: ${PORT}`);
})
})
.catch((error) => {
  console.log('Error connecting to database', error.message)
})

