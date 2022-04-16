import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import { registerValidation, loginValidation } from '../validations';
import { UserModel } from '../models';

const authRoute = Router();

authRoute.post('/register', async (req, res) => {
    let result = {
        success: false,
        message: null,
        data: null
    }

    try {
        const {error} = registerValidation(req.body);
        if(error) throw new Error( error.message);

        const emailExists = await UserModel.findOne({ email: req.body.email });
        if(emailExists) throw new Error ('Email address already exists');

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);
        
        const user = await UserModel.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });

        res.json({
            success: true,
            message: "Registration Success. You can now login to your account.",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        result.message = error;

        if(error instanceof Error) {
            result.message = error.message;
        }
        
        res.status(400).json(result)
    }
})

authRoute.post('/login', async (req, res) => {
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).json({ success: false, message: error.details[0].message});

    const user = await UserModel.findOne({email: req.body.email});
    if(!user) return res.status(400).json({ success: false, message: "User with this email does not exist"});

    const passwordMatch = bcrypt.compareSync(req.body.password, user.password);
    if(!passwordMatch) return res.status(400).json({ success: false, message: 'Password do not match' });

    const token = jsonwebtoken.sign({_id: user._id}, process.env.JWT_SECRET);
    res.header('auth-token', token).json({
        success: true,
        accessToken: token,
        userData: {
            name: user.name,
            email: user.email
        }
    });
})

authRoute.get('/verify-token', async (req, res) => {
    const token = req.header('auth-token');
    if(!token) return res.status(401).json({ success: false, message: "Access denied! Token not found!"})

    try {
        const verified = jsonwebtoken.verify(token, process.env.JWT_SECRET)
        const user = await UserModel.findOne({_id: verified._id});
        if(!user) return res.status(400).json({ success: false, message: "User not found!"});

        res.json({
            success: true,
            accessToken: token,
            userData: {
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: error
        })
    }
})

export default authRoute;
