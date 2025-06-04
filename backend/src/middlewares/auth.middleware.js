import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { ERR } from '../libs/errorCode.js';

export const protectRoute = async (req, res, next) => {
    try {
        //Get token from cookies
        const token = req.cookies.jwt;
        if (!token) return res.status(401).json(ERR.UNAUTHORIZED_NO_TOKEN_PROVIDED);

        //Decode token
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodeToken) return res.status(401).json(ERR.UNAUTHORIZED_TOKEN_INVALID);
        const user = await User.findById(decodeToken.userId).select("-password");
        if (!user) return res.status(404).json(ERR.USER_NOT_FOUND);
        //Attach user to request
        req.user = user;
        next();
    } catch (error) {
        console.log(`Interal Server Error Auth MiddleWare:\n${error}`);
        res.status(500).json(ERR.INTERNAL_SERVER_ERROR);
    }
}