const jwt = require('jsonwebtoken');
if(!process.env.HOST_DB) {
  config = require('./config');
} else {
  config = require('./config_exemple');
}
const secret = process.env.SECRET || config.token.secret;

const withAuth = (req, res, next)=> {
    
    const token = req.headers['x-access-token'];
    if ( token === undefined) {
        res.json({
          status: 404,
          msg: "token not found"
        })
    } else {
        jwt.verify(token, secret, (err, decoded)=>{
            if(err) {
                res.json({
                  status: 401,
                  msg: "error, your token is invalid"
                })

            } else {
                req.id = decoded.id;
                next();
            }
        })
    }
}

module.exports = withAuth;