require("dotenv").config()
const express = require('express');
const apiRoutes = require('./routes');
const {sequelize,connectToDb} = require('./db');
const body_parser = require('body-parser');
const cors = require('cors');
const path = require('path');
var router = express.Router();


const app = express();
const PORT = 3000;
app.use(cors());

app.use(express.json());
app.use('/api',apiRoutes);

// Serving static files from 'uploads' directory
router.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use((request,response)=>{
    response.status(404);
    response.json({message:"Resource not found"});
})

app.use((request,response)=>{
    response.status(500);
    response.json({message:"Oops... Something went wrong"});
})

app.get('/',(request,response)=>{
    response.status(200).json({message:"Hello World"})
})

app.listen(PORT , async ()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
    await connectToDb();
})