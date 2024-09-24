import { model, Schema, Document } from "mongoose";
import { IUser } from "../interfaces/user.interface";


const UsersSchema = new Schema<IUser>({
    _id: {
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    status:{
        type: Boolean,
        required: true
    },
    confirmPassword:{
        type: Boolean,
        required: true
    },
    token:{
        type: String,
        required: false
    }
});

const UsersModel = model<IUser>('Users', UsersSchema);

export default UsersModel;
