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
    const TruckModel = require('../models/TruckModel')(db);

    //route de récuperation de tous les trucks (camions)
    app.get('/api/v1/truck/all', async (req,  res, next)=>{

    	let truck = await TruckModel.getAllTruck();

    	if(truck.code) {
    		res.json({status: 500, err: truck});
    	}

    	res.json({status: 200, truck: truck});
    })

    //route de récuperation d'un truck par son id
    app.get('/api/v1/truck/:id', async (req,  res, next)=>{
    	
        let id = req.params.id;
        let truck = await TruckModel.getTruckById(id);

    	if(truck.code) {
    		res.json({status: 500, err: truck});
    	}

    	res.json({status: 200, truck: truck[0]});
    })

     //route d'ajout d'un truck 
     app.post('/api/v1/truck/add', async (req,  res, next)=>{
    	let truck = await TruckModel.addOneTruck(req);

    	if(truck.code) {
    		res.json({status: 500, err: truck});
    	}

    	res.json({status: 200, msg: 'camion enregistré'});
    })

     //route de modification d'un truck
     app.put('/api/v1/truck/update/:id', async (req,  res, next)=>{
    		
    	let id = req.params.id;

    	let truck = await TruckModel.updateTruck(req, id);

    	if(truck.code) {
    		res.json({status: 500, err: truck});
    	}

    	res.json({status: 200, msg: 'données du camion modifiées !'});
    })
    
}