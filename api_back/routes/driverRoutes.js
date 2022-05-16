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
    const DriverModel = require('../models/DriverModel')(db);

    //route de récuperation de tous les drivers (condcteurs)
    app.get('/api/v1/driver/all', async (req,  res, next)=>{

    	let driver = await DriverModel.getAllDriver();

    	if(driver.code) {
    		res.json({status: 500, err: driver});
    	}

    	res.json({status: 200, driver: driver});
    })

    //route de récuperation d'un driver par son id
    app.get('/api/v1/driver/:id', async (req,  res, next)=>{
    	
        let id = req.params.id;
        let driver = await DriverModel.getDriverById(id);

    	if(driver.code) {
    		res.json({status: 500, err: driver});
    	}

    	res.json({status: 200, driver: driver[0]});
    })

     //route d'ajout d'un driver 
     app.post('/api/v1/driver/add', async (req,  res, next)=>{
    	
        let driver = await DriverModel.addOneDriver(req);

    	if(driver.code) {
    		res.json({status: 500, err: driver});
    	}

    	res.json({status: 200, msg: 'conducteur enregistré'});
    })

     //route de modification d'un driver
     app.put('/api/v1/driver/update/:id', async (req,  res, next)=>{
    		
    	let id = req.params.id;

    	let driver = await DriverModel.updateDriver(req, id);

    	if(driver.code) {
    		res.json({status: 500, err: driver});
    	}

    	res.json({status: 200, msg: 'données du conducteur modifiées !'});
    })
    
}