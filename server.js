const express = require("express");
const app = express();
const mongoose = require('mongoose');
const cors = require("cors");
const cookieparser = require("cookie-parser");
const PORT = 8080;

const test = "JOhnyy edok"

const dbUrl = "mongodb+srv://Backend:1234@mentordiamond.ualfcpy.mongodb.net/mentordiamond?retryWrites=true&w=majority"
app.use(cookieparser())
app.use(cors({
    credentials : true,
    origin:['http://localhost:8080','http://localhost:3000']
}));
mongoose.Promise = global.Promise

mongoose.connect(dbUrl,{ useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log("Connect to MongoDB"))
        .catch((err) => console.error("Error connecting to MongoDB:", err))

const userRouter = require('./routes/users')
const productRouter = require('./routes/products')
const orderRouter = require('./routes/orders')
const addressRouter = require('./routes/address')
const skusRouter = require('./routes/skus')
const picRouter = require('./routes/pictures')
const cartRouter = require('./routes/cart')
const orderdeRouter = require('./routes/orderdetail')




app.use('/address',addressRouter)
app.use('/product',productRouter)
app.use('/sku',skusRouter)
app.use('/user',userRouter)
app.use('/order',orderRouter)
app.use('/pic',picRouter)
app.use('/cart',cartRouter)
app.use('/orderdetail',orderdeRouter)





app.get("/api/home",(req,res) => {
    res.json({ message: "hello"});
});

app.listen(PORT, () =>{
    console.log(`Server started on port ${PORT}`);
});
