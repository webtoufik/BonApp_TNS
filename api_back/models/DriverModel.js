module.exports = (_db)=>{
    db = _db;
    return DriverModel;
}

class DriverModel {

	static async addOneDriver(req){
	    return db.query('INSERT INTO DRIVERS (first_name, last_name, date_of_birth, phone, created_at) VALUES (?, ?, ?, ?, NOW())', [req.body.first_name, req.body.last_name, req.body.date_of_birth, req.body.phone])
				.then((result)=>{
					return result
				})
				.catch((err)=>{
					return err
				})
	}
	
	static async getAllDriver(){
	    return db.query('SELECT * FROM DRIVERS')
				.then((result)=>{
					return result
				})
				.catch((err)=>{
					return err
				})
	}
	
	static async getDriverById(id){
	    return db.query('SELECT * FROM DRIVERS WHERE id = ?', [id])
				.then((result)=>{
					return result
				})
				.catch((err)=>{
					return err
				})
	}
	
	static async updateDriver(req, id){
	    return db.query('UPDATE DRIVERS SET first_name = ?, last_name = ?, date_of_birth = ?, phone = ? WHERE id = ?', [req.body.first_name, req.body.last_name, req.body.date_of_birth, req.body.phone, id])
				.then((result)=>{
					return result
				})
				.catch((err)=>{
					return err
				})
	}
	
}