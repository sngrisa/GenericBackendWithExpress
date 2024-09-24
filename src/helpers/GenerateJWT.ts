import jwt, { SignOptions } from 'jsonwebtoken';

const generateJWT = (_idUser: string, email: string): Promise<string> => {
    const secretJwt: string = "User";
    
    const payload = {
        _idUser,
        email,
    };

    const signOptions: SignOptions = { expiresIn: "12h" };

    return new Promise((resolve, reject) => {
        jwt.sign(payload, secretJwt, signOptions, (err, token) => {
            if (err) {
                return reject(err);
            }
            resolve(token as string);
        });
    });
};

export { generateJWT };