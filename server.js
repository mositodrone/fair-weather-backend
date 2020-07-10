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
        connectionString: process.env.DATABASE_URL,
        ssl: true 
    }
})
 
const app = express();
app.use(cors())
app.use(bodyParser.json());

const rooter = {root: __dirname} 



 app.get('/', (req, res)=> {
	res.send();
})

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
}); 
 
	app.post('/signin', signin.handleSignin(db, bcrypt))
	app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
	app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})

app.get('/credits', (req, res) => {
	const credits = 'credits/credits.html'
	 res.sendFile(credits, rooter)
})
 
app.listen(process.env.PORT || 3200, ()=> {
  console.log(`app is running on ${process.env.PORT}`);
})
