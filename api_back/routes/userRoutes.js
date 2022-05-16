if(!process.env.HOST_DB) {
    var config = require('../config')
}else {
    var config = require('../config-exemple')
}
let secret = process.env.TOKEN_SECRET || config.token.secret;
const withAuth = require('../withAuth');

//penser à ajouter les withAuth une fois le token codé comme suit:
// app.put('/api/v1/truck/update/:id', withAuth, async (req,  res, next)=>{...

module.exports = (app, db)=>{
    const UserModel = require('../models/UserModel')(db);

    //route de récuperation de tous les Users (utilisateurs)
    app.get('/api/v1/user/all', async (req,  res, next)=>{

    	let user = await UserModel.getAllUser();

    	if(user.code) {
    		res.json({status: 500, err: user});
    	}

    	res.json({status: 200, user: user});
    })

    //route de récuperation d'un user par son id
    app.get('/api/v1/user/:id', async (req,  res, next)=>{
    	
        let id = req.params.id;
        let user = await UserModel.getUserById(id);

    	if(user.code) {
    		res.json({status: 500, err: user});
    	}

    	res.json({status: 200, user: user[0]});
    })

     //route d'ajout d'un user 
     app.post('/api/v1/user/add', async (req,  res, next)=>{
    	
        let user = await UserModel.addOneUser(req);

    	if(user.code) {
    		res.json({status: 500, err: user});
    	}

		if(user.status === 501 ) {
            res.json({status: 501, user: user})        
        }

    	res.json({status: 200, msg: 'utilisateur enregistré'});
    })

     //route de modification d'un user
     app.put('/api/v1/user/update/:id', async (req,  res, next)=>{
    		
    	let id = req.params.id;

    	let user = await UserModel.updateUser(req, id);

    	if(user.code) {
    		res.json({status: 500, err: user});
    	}

		if(user.status === 501 ) {
            res.json({status: 501, user: user})        
        }

    	res.json({status: 200, msg: 'données de l\'utilisateur modifiées !'});
    })
    
}