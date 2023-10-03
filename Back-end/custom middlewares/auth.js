const jwt = require('jsonwebtoken');

function auth(req,res,next){
  try{
    const token = req.cookies.token;

    if(!token) res.startus(401).send({errorMessage: "unauthorized"});

    const verified = jwt.verify(token,process.env.JWT_SECRET_KEY);
    next()

  }catch(err){
    res.startus(401).send({errorMessage: "unauthorized"});
  }
}

module.exports = auth;