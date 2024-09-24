import { Request, Response } from "express";
import Users from "./../models/user.model";
import bcrypt from "bcrypt";
import { generateJWT } from "../helpers/GenerateJWT";


const createUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    const existingUserByEmail = await Users.findOne({ email });
    const existingUserByUsername = await Users.findOne({ username });

    if (existingUserByUsername) {
      return res.status(400).json({
        ok: false,
        msg: "Username exists in database!!!!",
      });
    }

    if (existingUserByEmail) {
      return res.status(400).json({
        ok: false,
        msg: "Email exists!!!!",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Password not found!!!!",
      });
    }

    const dbUser = new Users(req.body);
    const bcryptSalts = bcrypt.genSaltSync(10);
    dbUser.status = true;
    dbUser.password = bcrypt.hashSync(password, bcryptSalts);
    const token = generateJWT(dbUser.id, dbUser.email);

    await dbUser.save();

    return res.status(200).json({
      ok: true,
      msg: "The User exists in database or system",
      _idUser: dbUser.id,
      email: dbUser.email,
      token,
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      msg: "Error to create a new user!!!!",
    });
  }
};


const loginUsers = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;

  try {
    const dbUser = await Users.findOne({ email });

    if (!dbUser) {
      return res.status(400).json({
        ok: false,
        msg: "User not registred in database",
      });
    }

    const validPassword = bcrypt.compareSync(password, dbUser.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Password Wrong",
      });
    }

    const token = await generateJWT(dbUser.id, dbUser.email);

    return res.status(200).json({
      ok: true,
      msg: "Welcome User to the System",
      _idUser: dbUser.id,
      email: dbUser.email,
      token,
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      msg: "Error to Login to System",
    });
  }
};


const getUsersById = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  try {
    const resp = await Users.findById(id);
    if (!resp) {
      return res.status(404).json({ ok: false, msg: "User not found!!!" });
    }
    return res.status(200).json({ msg: resp });
  } catch (err) {
    return res.status(500).json({ ok: false, msg: err.message });
  }
};


const getUsersByEmail = async (req: Request, res: Response): Promise<Response> => {
  const { email } = req.params;
  try {
    const resp = await Users.find({ email });
    return res.status(200).json({ msg: resp });
  } catch (err) {
    return res.status(500).json({ ok: false, msg: err.message });
  }
};


const getUsersByStatus = async (req: Request, res: Response): Promise<Response> => {
  const { status } = req.params;
  try {
    const resp = await Users.find({ status });
    return res.status(200).json({ msg: resp });
  } catch (err) {
    return res.status(500).json({ ok: false, msg: err.message });
  }
};


const getUsersByUsername = async (req: Request, res: Response): Promise<Response> => {
  const { username } = req.params;
  try {
    const resp = await Users.find({ username });
    return res.status(200).json({ msg: resp });
  } catch (err) {
    return res.status(500).json({ ok: false, msg: err.message });
  }
};


const getUsers = async (_req: Request, res: Response): Promise<Response> => {
  try {    
    const users = await Users.find({});
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ ok: false, msg: err.message });
  }
};


const validateToken = async (req: Request, res: Response): Promise<Response> => {
  const { _idUser, email } = req.body;

  const token = generateJWT(_idUser, email);

  return res.status(200).json({
    ok: true,
    msg: "Token generated successfull",
    _idUser,
    email,
    token,
  });
};


const updateUsers = async (req: Request, res: Response): Promise<Response> => {
  const { email, username, password } = req.body;

  try {
    const dbUser = await Users.findById(req.params.id);

    if (!dbUser) {
      return res.status(404).json({
        ok: false,
        msg: "User not found!!!",
      });
    }

    const existingUserByEmail = await Users.findOne({ email });
    const existingUserByUsername = await Users.findOne({ username });

    if (existingUserByUsername) {
      return res.status(400).json({
        ok: false,
        msg: "User exists in Database!!!!",
      });
    }

    if (existingUserByEmail) {
      return res.status(400).json({
        ok: false,
        msg: "Email registred in database!!!!",
      });
    }

    const bcryptSalts = bcrypt.genSaltSync(10);
    dbUser.username = username;
    dbUser.email = email;
    dbUser.password = bcrypt.hashSync(password, bcryptSalts);

    const token = generateJWT(dbUser.id, dbUser.email);

    await dbUser.save();

    return res.status(200).json({
      ok: true,
      msg: "User updated!!!",
      dbUser,
      token,
    });
  } catch (err) {
    return res.status(400).json({
      ok: false,
      msg: "User not updated",
    });
  }
};


const deleteUsers = async (req: Request, res: Response): Promise<Response> => {
  const { idUser } = req.body;

  try {
    const dbUser = await Users.findById(idUser);
    if (!dbUser) {
      return res.status(404).json({
        ok: false,
        msg: "User not found!!!",
      });
    }

    dbUser.status = false;
    await dbUser.save();

    return res.status(200).json({
      ok: true,
      msg: "User deleted!!!!",
    });
  } catch (err) {
    return res.status(400).json({
      ok: false,
      msg: "User not deleted!!!",
    });
  }
};

export {
  createUsers,
  loginUsers,
  getUsers,
  validateToken,
  updateUsers,
  deleteUsers,
  getUsersById,
  getUsersByEmail,
  getUsersByUsername,
  getUsersByStatus,
};
