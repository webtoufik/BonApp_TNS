const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = (_db)=>{
    db = _db;
    return UserModel;
}

class UserModel {

	static async addOneUser(req){
        //requête sql pour vérifier le mail
	    let user = await db.query('SELECT * FROM USERS WHERE email = ?', [req.body.email]);

        //gestion d'erreur si l'email est déjà utilisé
		if(user.length > 0) {
			return {status: 501, msg: "email déjà utilisé"}
		}

        //on crypte le password
	    let hash = await bcrypt.hash(req.body.password, saltRounds);

	    return db.query('INSERT INTO USERS (first_name, last_name, email, password, created_at) VALUES (?, ?, ?, ?, NOW())', [req.body.first_name, req.body.last_name, req.body.email, hash])
				.then((result)=>{
					return result
				})
				.catch((err)=>{
					return err
				})
	}
	
	static async getAllUser(){
	    return db.query('SELECT * FROM USERS')
				.then((result)=>{
					return result
				})
				.catch((err)=>{
					return err
				})
	}
	
	static async getUserById(id){
	    return db.query('SELECT * FROM USERS WHERE id = ?', [id])
				.then((result)=>{
					return result
				})
				.catch((err)=>{
					return err
				})
	}
	
	static async updateUser(req, id){

        //requête sql pour vérifier le mail
	    let user = await db.query('SELECT * FROM USERS WHERE email = ?', [req.body.email]);

        //gestion d'erreur si l'email est déjà utilisé
		if(user.length > 0) {
			return {status: 501, msg: "email déjà utilisé"}
		}

        //on crypte le password
	    let hash = await bcrypt.hash(req.body.password, saltRounds);

	    return db.query('UPDATE USERS SET first_name = ?, last_name = ?, email = ?, password = ? WHERE id = ?', [req.body.first_name, req.body.last_name, req.body.email, hash, id])
				.then((result)=>{
					return result
				})
				.catch((err)=>{
					return err
				})
	}
	
}