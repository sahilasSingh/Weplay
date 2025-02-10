const mongoose = require('mongoose');
const conn = process.env.DB_URL;


mongoose.connect(conn)
.then(() =>{
  console.log("Database connected");
}).catch((err) =>{
  console.log("Database not connected");
});

