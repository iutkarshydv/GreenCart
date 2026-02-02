import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {

    const { token } = req.headers;

    if (!token) {
        return res.json({ success: false, message: 'Not Authorized Login Again' })
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        
        // Set user ID on both req.body.userId (for backward compatibility) 
        // and req.user (for proper RESTful practices)
        req.body.userId = token_decode.id
        req.user = { id: token_decode.id }
        
        next()

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

export default authUser