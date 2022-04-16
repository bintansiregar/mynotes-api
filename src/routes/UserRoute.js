import { Router } from 'express';
import * as User from '../controllers/UserController';
import { authenticateUser } from '../helper';

const userRoute = Router();

userRoute.get('/', authenticateUser, async (req, res) => {
    const result = await User.getAll();

    res.json(result);
});

export default userRoute;
