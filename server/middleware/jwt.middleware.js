// Route -> Middlware -> Controller
const jwt = require("jsonwebtoken");

const authenticateJwt = async(req, res, next) =>{  
    let decodedJwt; 
    try{
        decodedJwt = await jwt.verify(
            req.cookies.usertoken, 
            process.env.SECRET_KEY
        );
        req.body.user_id = decodedJwt.id;
        console.log("Success! Decoded JWT: ", decodedJwt);
        next();
    } catch(error) {
        console.log("Token Error!", error);
        res.status(400).json({error: "You must be logged in to add a new shoe."});
        return;
    }
}

module.exports = {
    authenticateJwt
};