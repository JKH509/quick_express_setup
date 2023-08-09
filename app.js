const express = require('express')
const app = express()
const port = 5001
// const jwt = require('jsonwebtoken');
require('dotenv').config()
// need sequelize imported here even though it's not used
const { sequelize } = require('./src/models');
const cookieParser = require('cookie-parser');

// imported middleware 
const cors = require('cors');

const errorMiddleware = require('./src/middleware/errorMiddleware'); 
const corsOptions = require('./config/corsOptions');
const verifyJWT = require('./src/middleware/verifyJWT');
// const authorizeMiddleware = require('./src/middleware/authorizeMiddleware');
// const authenticateMiddleware = require('./src/middleware/authenticateMiddleware');
// const authenticate = require('./src/middleware/authenticateMiddleware');
// const authorized = require('./src/middleware/authorizeMiddleware');
 


app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));




// imported route functions 
const registerRoutes = require('./src/routes/register')();
const firstRoutes = require('./src/routes/firstRoutes')();
const logoutRoutes = require('./src/routes/logout')();
const usersRoutes = require('./src/routes/api/users')();
const authRoutes = require('./src/routes/auth')();


// setting the routes
app.use('/api', registerRoutes)
app.use('/api', firstRoutes)
app.use('/', logoutRoutes)

app.use('/', authRoutes)

app.use(verifyJWT);
app.use('/api', usersRoutes)
// routes

// app.use('/register', require('./src/routes/register'));
// app.use('/auth', require('./src/routes/auth')());
// app.use('/employees', require('./src/routes/api/employees'));


app.use('/employees', require('./src/routes/api/employees'));


app.use(errorMiddleware)



// process.on('uncaughtException', (err) => {
//   console.error('Uncaught exception', err);
//   // Do any cleanup you need to do here
//   process.exit(1); // It's important to exit the process here
// });


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})