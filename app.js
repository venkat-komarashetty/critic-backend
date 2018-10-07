const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();


app.get('/', (req, res) =>{
    res.json({
        message: 'Welcome to web API.'
    });
})

app.post('/adminLogin', (req, res) => {
    console.log('Params :', req.query.email);
    const email = req.query.email;
    const password = req.query.password;
    if(email === 'kvnageshrao@rediffmail.com' && password === '123456'){
        const loggedUserDetails = {
            id: 1,
            email: 'kvnageshrao@rediffmail.com',
            name: 'Venkat Nageshrao'
        };
        jwt.sign({user: loggedUserDetails}, 'Thgf236RDws#$@', { expiresIn: '30s'},  (err, token) => {
            if(err){
                res.json({
                    error: 'Something went wrong.......'
                })
            } else {
                res.json({
                    token: token
                })
            };
            
        });
    } else {
        res.sendStatus(403);
    }
    
});

app.get('/home', getTokenFromRequest, (req, res) => {
    jwt.verify(req.token, 'Thgf236RDws#$@', (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Logged in successfully....',
                authData
            });
        };
    });

});

function getTokenFromRequest(req, res, next) {
    // Get Authorization header value
    const authBearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof authBearerHeader !=='undefined'){
        // Split at the space
        const bearer = authBearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next Middleware
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }
}

app.listen(5000, () => {
    console.log('Listenging at port 5000');
});