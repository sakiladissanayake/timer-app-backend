const express = require('express');
const jwt = require('jsonwebtoken');
var cors = require('cors')

const app = express();

app.use(cors());

app.get('/api', (req, res) => {
    res.json({
        message: 'Welsome to the API'
    });
});

app.post('/api/login', verifyToken, (req, res) => { 
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        setTimeout(()=>{
            if(err) {
                res.sendStatus(403);
            } else {
                res.json({
                    message: 'Verified User....',
                    status: true,
                    authData
                });
            }
        },3000)
    })
});

app.post('/api/requestToken', (req, res) => {
    //Sample User
    const user = {
        id: 1,
        username: 'sakila',
        email: 'sakiladissanayake@gmail.com'
    }
    jwt.sign({user: user}, 'secretkey', (err, token) => {
        res.json({
            token
        });
    });
});

//format token
//Authorization: Bearer <token>

function verifyToken(req, res, next) {
    //get auth header value
    const bearerHeader = req.headers['authorization'];
    //check if bearer is undifined
    if(typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

app.listen(5000, () => console.log('Server started on port 5000'));