const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');


const db = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'postgres',
        password : 'main',
        database : 'fair-weather'
    }
});

const app = express();
app.use(cors())
app.use(bodyParser.json());

const rooter = {root: __dirname} 



 app.get('/', (req, res)=> {
	res.sendFile();
})
 
	app.post('/signin', signin.handleSignin(db, bcrypt))
	app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
	app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})

app.get('/credits', (req, res) => {
	const credits = 'credits/credits.html'
	 res.sendFile(credits, rooter)
})
 
app.listen(process.env.port || 3200, ()=> {
  console.log('app is running on port 3200');
})
