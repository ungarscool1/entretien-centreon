export interface IUser {
    username: string;
    ip: string;
    socketId: string;
}

export interface Imessage {
    from: string;
    message: string;
}

export interface IRegisterMessage {
    status: boolean;
    message: string;
}