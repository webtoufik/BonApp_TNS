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
    const VoucherModel = require('../models/VoucherModel')(db);

    //route de récuperation de tous les Vouchers (Bons de transport)
    app.get('/api/v1/voucher/all', async (req,  res, next)=>{

    	let voucher = await VoucherModel.getAllVoucher();

    	if(voucher.code) {
    		res.json({status: 500, err: voucher});
    	}

    	res.json({status: 200, voucher: voucher});
    })

    //route de récuperation d'un voucher par son id
    app.get('/api/v1/voucher/:id', async (req,  res, next)=>{
    	
        let id = req.params.id;
        let voucher = await VoucherModel.getVoucherById(id);

    	if(voucher.code) {
    		res.json({status: 500, err: voucher});
    	}

    	res.json({status: 200, voucher: voucher[0]});
    })

     //route d'ajout d'un voucher 
     app.post('/api/v1/voucher/add', async (req,  res, next)=>{
    	
        let voucher = await VoucherModel.addOneVoucher(req);

    	if(voucher.code) {
    		res.json({status: 500, err: voucher});
    	}

    	res.json({status: 200, msg: 'Bon journalier enregistré'});
    })

     //route de modification d'un voucher
     app.put('/api/v1/voucher/update/:id', async (req,  res, next)=>{
    		
    	let id = req.params.id;

    	let voucher = await VoucherModel.updateVoucher(req, id);

    	if(voucher.code) {
    		res.json({status: 500, err: voucher});
    	}

    	res.json({status: 200, msg: 'données du bon journalier modifiées !'});
    })
    
}