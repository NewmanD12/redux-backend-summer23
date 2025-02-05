const jwt = require('jsonwebtoken')

const verifyToken = async (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization
        if (bearerToken) {
            console.log(bearerToken)
            const token = bearerToken.split(' ')[1]
            let decoded = jwt.verify(token, process.env.SUPER_SECRET_KEY)
            req.decoded = decoded
            next()  
        } else {
            throw {
                status: 401,
                message: 'Missing Token'
            }
        }
    } catch (error) {
       res.status(error.status || 401).json(error.message) 
    }
    
   
  
}

module.exports = { verifyToken }