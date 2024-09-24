export interface IUser extends Document{
    _id: string | number;
    username: string;
    email: string;
    password: string;
    confirmPassword: boolean;
    status: boolean;
    token: String;
}
