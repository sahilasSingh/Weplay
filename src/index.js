const dotenv = require('dotenv');
const {app} = require("./app");
const PORT = process.env.PORT || 3000;
require("dotenv").config({ path: `./env/dev.env`});
require('./config/database');



// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});