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
    const CustomerModel = require('../models/CustomerModel')(db);

    //route de récuperation de tous les customers (clients)
    app.get('/api/v1/customer/all', async (req,  res, next)=>{

    	let customer = await CustomerModel.getAllCustomer();

    	if(customer.code) {
    		res.json({status: 500, err: customer});
    	}

    	res.json({status: 200, customer: customer});
    })

    //route de récuperation d'un customer par son id
    app.get('/api/v1/customer/:id', async (req,  res, next)=>{
    	
        let id = req.params.id;
        let customer = await CustomerModel.getCustomerById(id);

    	if(customer.code) {
    		res.json({status: 500, err: customer});
    	}

    	res.json({status: 200, customer: customer[0]});
    })

     //route d'ajout d'un customer 
     app.post('/api/v1/customer/add', async (req,  res, next)=>{
    	let customer = await CustomerModel.addOneCustomer(req);

    	if(customer.code) {
    		res.json({status: 500, err: customer});
    	}

    	res.json({status: 200, msg: 'client enregistré'});
    })

     //route de modification d'un customer
     app.put('/api/v1/customer/update/:id', async (req,  res, next)=>{
    		
    	let id = req.params.id;

    	let customer = await CustomerModel.updateCustomer(req, id);

    	if(customer.code) {
    		res.json({status: 500, err: customer});
    	}

    	res.json({status: 200, msg: 'données du client modifiées !'});
    })
    
}