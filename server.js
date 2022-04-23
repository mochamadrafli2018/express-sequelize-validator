const express = require('express')
const app = express()
const morgan = require('morgan');
const cors = require('cors');

// enable env variable
require('dotenv').config()

// cors
app.use(cors());
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// route
require("./Routes")(app);

// mysql connection synchronously
require("./Models").sequelize.sync({ alter: true}).then(() => {
  console.log("Connected to database")
})

// server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
