const withAuth = require('../withAuth');
const jwt = require('jsonwebtoken');
if(!process.env.HOST_DB) {
	config = require('../config');
} else {
	config = require('../config_exemple');
}
const secret = process.env.SECRET || config.token.secret;
const secret_user = process.env.SECRET_USER || config.token.secret_user;

// routes permettant la gestion de la connexion par token
module.exports = function (app, connection) {
	const UserModel = require('../models/userModel')(db);
	// test des tokens
	
	app.get('/api/v1/user/checkToken',withAuthUser , async (req, res, next)=>{
		let user = await UserModel.getOneUser(req.id);
	    if(user.code){
	    	res.json({status: 500, error: user})
	    }
	    res.json({ status: 200, user: user[0] })
	})
}