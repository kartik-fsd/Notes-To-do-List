
var jwt = require("jsonwebtoken");
const JWT_SECTRETKEY = "Kartik@123.io";

const fetchUser = (req,res,next)=>{
const token = req.header('auth-token');
if(!token){
    res.status(401).send({'error':"Please authenticate using a vaild token"})
}
try {
    const data = jwt.verify(token,JWT_SECTRETKEY);
req.user =data.user;
next();
} catch (error) {
    res.status(401).send({'error':"Please authenticate using a vaild token"})
}
}

module.exports=fetchUser;