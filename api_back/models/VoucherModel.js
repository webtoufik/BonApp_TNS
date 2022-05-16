
module.exports = (_db)=>{
    db = _db;
    return VoucherModel;
}

class VoucherModel {

	static async addOneVoucher(req){

	    return db.query('INSERT INTO VOUCHERS (number, date, place_start, place_end, time_start, time_end, comments, img_url, users_id, drivers_id, trucks_id, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())', [req.body.number, req.body.date, req.body.place_start, req.body.place_end, req.body.time_start, req.body.time_end, req.body.comments, req.body.img_url, req.body.users_id, req.body.drivers_id, req.body.trucks_id])
				.then((result)=>{
					return result
				})
				.catch((err)=>{
					return err
				})
	}
	
	static async getAllVoucher(){
	    return db.query('SELECT * FROM VOUCHERS')
				.then((result)=>{
					return result
				})
				.catch((err)=>{
					return err
				})
	}
	
	static async getVoucherById(id){
	    return db.query('SELECT * FROM VOUCHERS WHERE id = ?', [id])
				.then((result)=>{
					return result
				})
				.catch((err)=>{
					return err
				})
	}
	
	static async updateVoucher(req, id){

	    return db.query('UPDATE VOUCHERS SET number = ?, date = ?, place_start = ?, place_end = ?, time_start = ?, time_end = ?, comments = ?, img_url = ?, users_id = ?, drivers_id = ?, trucks_id = ?, customers_id = ? WHERE id = ?', [req.body.number, req.body.date, req.body.place_start, req.body.place_end, req.body.time_start, req.body.time_end, req.body.comments, req.body.img_url, req.body.users_id, req.body.drivers_id, req.body.trucks_id, req.body.customers_id, id])
				.then((result)=>{
					return result
				})
				.catch((err)=>{
					return err
				})
	}
	
}