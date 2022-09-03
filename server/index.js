let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
// let database = require('./database/db');s


// const userRoute = require('../server/routes/user.routes')
const loginRoute = require('../server/routes/login.routes')
const registerRoute = require('../server/routes/register.routes')
const productsRoute = require('../server/routes/products.routes')

mongoose.Promise = global.Promise;
mongoose.connect(('mongodb://127.0.0.1:27017/mydatabase'), {
    useNewUrlParser: true
}).then(() => {
        console.log('Database connected sucessfully !')
    },
    error => {
        console.log('Database could not be connected : ' + error)
    }
)

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors());
// app.use('/users', userRoute)
app.use('/login', loginRoute)
app.use('/register', registerRoute)
app.use('/products', productsRoute)


const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log('Connected to port ' + port)
})

// Error Handling
app.use((req, res, next) => {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});