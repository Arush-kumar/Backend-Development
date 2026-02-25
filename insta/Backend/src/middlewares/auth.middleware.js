import jwt from "jsonwebtoken"

async function identifyUser(req, res, next) {

    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message: "Token not found, user unauthorized"
        })
    }

    let decoded = null 

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
        return res.status(401).json({
            message: "user not authorized"
        })
    }

    req.user = decoded

    next()
}

/* req.user */
export default identifyUser