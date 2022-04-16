import { Router } from 'express';

const homeRouter = Router();

homeRouter.get('/', (req, res) => {
    res.status(403).json({ success: false, message: "Access Denied!" });
});

export default homeRouter;
