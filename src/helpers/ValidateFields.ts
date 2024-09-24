import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const validateFields = (_req: Request, _res: Response, next: NextFunction) => {
    const errors = validationResult(_req);
    if(!errors.isEmpty()){_res.status(400).json({ok: false, msg: errors.mapped()})}
    next();
} 