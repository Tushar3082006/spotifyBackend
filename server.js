const app = require('./src/app');
require('dotenv').config();
const connectDb = require('./src/db/db')

app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
})