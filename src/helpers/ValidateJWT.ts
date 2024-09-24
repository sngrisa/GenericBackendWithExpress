import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const validateJWT = (req: Request, res: Response, _next: NextFunction): Response | void => {
    const token = req.header("x-token");
    const secretJwt: string = "User";

    if (!token) {
        return res.status(403).json({
            ok: false,
            msg: "Token not validated",
        });
    }

    try {
        const { email, _idUser } = jwt.verify(token, secretJwt) as { email: string; _idUser: string };

        req.body._idUser = _idUser;
        req.body.email = email;

        return res.status(201).json({
            ok: true,
            msg: "Token validated",
            _idUser,
            email,
            token,
        });
    } catch (err) {
        res.status(401).json({
            ok: false,
            msg: "Token not validated",
        });
    }

    _next();
};

export { validateJWT };
