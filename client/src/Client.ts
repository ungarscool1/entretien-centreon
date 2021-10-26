import { io, Socket } from "socket.io-client";
import { arguments } from "./argParser"
import prompter from "./prompter";
import ololog from "ololog";

class Client {
    socket: Socket;
    username: string;
    validUsername: boolean | null = null;
    log: ololog;

    constructor(args: arguments) {
        this.log = ololog.configure({
            locate: false,
            time: true,
        });
        this.socket = io(`http://${args.ip}:${args.port}`);
    }

    async run() {
        let message;
        await this.promptUsername()

        this.socket.on('message', (data: { from: string, message: string }) => {
            process.stdout.write('\r')
            this.log(`${data.from}: ${data.message}`);
            process.stdout.write('> ');
        })
        while (true) {
            message = await prompter.prompt("> ")
            this.socket.emit('message', { 'from': this.username, 'message': message })
        }
    }

    async promptUsername() {
        this.username = await prompter.prompt("Username: ")
        if (this.username.length > 20 || this.username.length < 3) {
            console.error("Username must be between 3 and 20 characters long")
            this.promptUsername()
            return
        }
        this.socket.emit('register', this.username)
        this.socket.on('register', (status: boolean) => {
            this.validUsername = status
        })
        while (this.validUsername === null) {
            await prompter.sleep(100)
        }
        if (this.validUsername)
            return
        else
            this.promptUsername()
    }
}

export default Client;