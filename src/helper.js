import jsonwebtoken from "jsonwebtoken";
import { UserModel } from "./models";

export async function authenticateUser (req, res, next) {
    const token = req.header('auth-token');
    if(!token) return res.status(401).json({ success: false, message: "Access Denied! No Access Token!"})

    try {
        const tokenVerified = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.findOne({ _id: tokenVerified._id }).exec();
        if(!user) throw new Error("User with this Access Token is not registered!");
        req.userId = tokenVerified._id;
    } catch (error) {
        if(error instanceof Error) {
            res.status(401).send({ success: false, message: error.message })

            return;
        }

        console.error(error);
    
        return;
    }

    next();
}
