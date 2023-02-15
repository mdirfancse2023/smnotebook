const jwt = require("jsonwebtoken");
const JWT = "inotebook";
const fetchuser = (req,res,next)=>{
    //Get the user from JWT Token
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send("Acess Denied");
    }
    try {
        const data = jwt.verify(token,JWT);
        req.user = data.user;
        next(); 
    } catch (error) {
        res.status(401).send("Acess Denied");
    }
}
module.exports = fetchuser;