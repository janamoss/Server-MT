const express = require("express");
const app = express();
const mongoose = require('mongoose')
const cors = require("cors");
const PORT = 8080;

const test = "JOhnyy tEst"

const dbUrl = "mongodb+srv://Backend:1234@mentordiamond.ualfcpy.mongodb.net/?retryWrites=true&w=majority"
app.use(cors());
mongoose.Promise = global.Promise

mongoose.connect(dbUrl,{ useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log("Connect to MongoDB"))
        .catch((err) => console.error("Error connecting to MongoDB:", err))

const userRouter = require('./routes/users')
const productRouter = require('./routes/products')
const orderRouter = require('./routes/orders')

app.use('/product',productRouter)
app.use('/user',userRouter)
app.use('/order',orderRouter)

app.get("/api/home",(req,res) => {
    res.json({ message: "hello"});
});

app.listen(PORT, () =>{
    console.log(`Server started on port ${PORT}`);
});

