import { io, Socket } from "socket.io-client";
import { arguments } from "./argParser"
import prompter from "./prompter";

class Client {
    socket: Socket;
    username: string;

    constructor(args: arguments) {
        this.socket = io(`http://${args.ip}:${args.port}`);
    }

    async run() {
        await this.promptUsername()
    }

    async promptUsername() {
        this.username = await prompter.prompt("Username: ")
        console.log(`Choosen username: ${this.username}`);
        this.socket.emit('register', this.username)
    }
}

export default Client;