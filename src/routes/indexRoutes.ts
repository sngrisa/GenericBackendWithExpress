import { Response, Router } from 'express';
import { UsersRouter } from './paths/users.routes';


const BrowserRouter: any = Router();

BrowserRouter.use('/users', UsersRouter);

BrowserRouter.get('/ping', (_req: Request, res: Response): void => {
    res.status(200).json({
        ok: true,
        msg: 'pong',
    })
})


export default BrowserRouter;