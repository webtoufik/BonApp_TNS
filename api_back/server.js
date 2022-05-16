const express = require('express');
const app = express();
app.use(express.static(__dirname + '/public'));
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
const cors = require('cors');
app.use(cors());

if(!process.env.HOST_DB) {
	var config = require('./config-exemple')
} else {
	var config = require('./config')
}

const mysql = require('promise-mysql');

//ici nos routes à récupérer
//const userRoutes = require('./routes/userRoutes');
//const authRoutes = require('./routes/authRoutes');
const truckRoutes = require('./routes/truckRoutes');
const customerRoutes = require('./routes/customerRoutes');
const driverRoutes = require('./routes/driverRoutes');
const userRoutes = require('./routes/userRoutes');
const voucherRoutes = require('./routes/voucherRoutes');


const host = process.env.HOST_DB || config.db.host;
const database = process.env.DATABASE_DB || config.db.database;
const user = process.env.USER_DB || config.db.user;
const password = process.env.PASSWORD_DB || config.db.password;
const port = process.env.PORT || config.db.port;



mysql.createConnection({
	host: host,
	database: database,
	user: user,
	password: password
}).then((db) => {
    console.log('connecté bdd');
	setInterval(async function () {
		let res = await db.query('SELECT 1');
	}, 10000);
	
	app.get('/', (req, res, next)=>{
		res.json({msg: 'Welcome to your api TRANSPORT TNS !!', status: 200})
	})
	
	
    //utilisation de nos routes
	//userRoutes(app, db)
	//authRoutes(app, db)
	truckRoutes(app, db)
	customerRoutes(app, db)
	driverRoutes(app, db)
	userRoutes(app, db)
	voucherRoutes(app, db)
	
})

const PORT = process.env.PORT || 9500;

app.listen(PORT, ()=>{
	console.log('listening port: '+PORT);
	
}) 