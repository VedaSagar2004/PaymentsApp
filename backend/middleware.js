const { JWT_SECRET } = require("./config")
const jwt = require("jsonwebtoken")

function authMiddleware(req, res, next){
    let tokenHeader = req.headers.authorization
    let tokenArr = tokenHeader.split(' ')
    if (tokenArr && (tokenArr[0] == "Bearer")){
        const token = tokenArr[1]
        const decoded = jwt.verify(token, JWT_SECRET)
        req.userId = decoded.userId
        return next()
    }
    res.send({
        message: "please sign in"
    })
}
module.exports = {authMiddleware}