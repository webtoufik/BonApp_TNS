module.exports = (_db)=>{
    db = _db;
    return TruckModel;
}

class TruckModel {

	static async addOneTruck(req){
	    return db.query('INSERT INTO TRUCKS (name, immat, trailer, created_at) VALUES (?, ?, ?, NOW())', [req.body.name, req.body.immat, req.body.trailer])
				.then((result)=>{
					return result
				})
				.catch((err)=>{
					return err
				})
	}
	
	static async getAllTruck(){
	    return db.query('SELECT * FROM TRUCKS')
				.then((result)=>{
					return result
				})
				.catch((err)=>{
					return err
				})
	}
	
	static async getTruckById(id){
	    return db.query('SELECT * FROM TRUCKS WHERE id = ?', [id])
				.then((result)=>{
					return result
				})
				.catch((err)=>{
					return err
				})
	}
	
	static async updateTruck(req, id){
	    return db.query('UPDATE TRUCKS SET name = ?, immat = ?, trailer = ? WHERE id = ?', [req.body.name, req.body.immat, req.body.trailer, id])
				.then((result)=>{
					return result
				})
				.catch((err)=>{
					return err
				})
	}
	
}