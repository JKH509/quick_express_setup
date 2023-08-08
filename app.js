const express = require('express')
const app = express()
const port = 5001
// const jwt = require('jsonwebtoken');


// imported middleware 
const cors = require('cors');

const errorMiddleware = require('./src/middleware/errorMiddleware');
// const authenticate = require('./src/middleware/authenticateMiddleware');
// const authorized = require('./src/middleware/authorizeMiddleware');

// imported routes 
const firstRoutes = require('./src/routes/firstRoutes')();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api', firstRoutes)




app.use(errorMiddleware)

// app.get('/', (req, res) => {
//   res.send({message: 'hello world'});
// });
// process.on('uncaughtException', (err) => {
//   console.error('Uncaught exception', err);
//   // Do any cleanup you need to do here
//   process.exit(1); // It's important to exit the process here
// });




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})