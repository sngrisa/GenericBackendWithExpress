import express from 'express';
import { check } from "express-validator";
import { validateFields } from '../../helpers/ValidateFields';
import { getUsers, createUsers, updateUsers, deleteUsers, getUsersById, getUsersByEmail, getUsersByStatus, getUsersByUsername, validateToken } from '../../controllers/user.controller';
import { validateJWT } from '../../helpers/ValidateJWT';


const UsersRouter = express.Router();

UsersRouter.get('/', [validateFields], getUsers);

UsersRouter.get('/:id', [check('id', 'The id of username is required and must be validated').isLength({ min: 1 }), validateFields], getUsersById);

UsersRouter.get('/email/:email', [check('email', 'The email of user is required and must be validated').isEmail(), validateFields], getUsersByEmail);

UsersRouter.get('/status/:status', [check('status', 'The email of user is required and must be validated').isLength({ min: 1 }), validateFields], getUsersByStatus);

UsersRouter.get('/username/:username', [check('username', 'The username of user is required and must be validated').isLength({ min: 3 }), validateFields], getUsersByUsername);

UsersRouter.post('/', [validateFields, check('email', 'The email of user is required and must be validated').isEmail(), check('username', 'The username is required').isLength({ min: 3 }), check('password', 'The password is required and must be than 3 characters').isLength({ min: 3 })], createUsers);

UsersRouter.put('/:id', [validateFields, check('email', 'The email of user is required and must be validated').isEmail(), check('username', 'The username is required').isLength({ min: 3 }), check('password', 'The password is required and must be than 3 characters').isLength({ min: 3 })], updateUsers);

UsersRouter.get("/token", validateJWT, validateToken);

UsersRouter.delete('/:id', [check('id', 'The id of username is required and must be validated').isLength({ min: 1 }), validateFields], deleteUsers);

export { UsersRouter };

