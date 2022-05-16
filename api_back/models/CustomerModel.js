module.exports = (_db)=>{
    db = _db;
    return CustomerModel;
}

class CustomerModel {

	static async addOneCustomer(req){
	    return db.query('INSERT INTO CUSTOMERS (name, address, zipcode, city, country, phone, email, contact, comments, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())', [req.body.name, req.body.address, req.body.zipcode, req.body.city, req.body.country, req.body.phone, req.body.email, req.body.contact, req.body.comments])
				.then((result)=>{
					return result
				})
				.catch((err)=>{
					return err
				})
	}
	
	static async getAllCustomer(){
	    return db.query('SELECT * FROM CUSTOMERS')
				.then((result)=>{
					return result
				})
				.catch((err)=>{
					return err
				})
	}
	
	static async getCustomerById(id){
	    return db.query('SELECT * FROM CUSTOMERS WHERE id = ?', [id])
				.then((result)=>{
					return result
				})
				.catch((err)=>{
					return err
				})
	}
	
	static async updateCustomer(req, id){
	    return db.query('UPDATE CUSTOMERS SET name = ?, address = ?, zipcode = ?, city = ?, country = ?, phone = ?, email = ?, contact = ?, comments = ? WHERE id = ?', [req.body.name, req.body.address, req.body.zipcode, req.body.city, req.body.country, req.body.phone, req.body.email, req.body.contact, req.body.comments, id])
				.then((result)=>{
					return result
				})
				.catch((err)=>{
					return err
				})
	}
	
}