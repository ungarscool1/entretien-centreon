import parser, {arguments} from "./argParser";
import { createServer } from "http";
import { Server } from "socket.io";
import { Imessage, IUser } from "./interfaces";
import ololog from "ololog";


class Main {

    parsedArgs: arguments;
    users: IUser[] = [];
    log: ololog;

    constructor() {
        this.log = ololog.configure({
            time: true,
            locate: false
        });
    }

    /**
     * Run the application
     * @param args program arguments
     */
    run(args: string[]) {
        this.parsedArgs = parser.parse(args);
        const httpServer = createServer();
        const io = new Server(httpServer, {});

        io.on("connection", (socket) => {
            this.log(`New client #${socket.id} (${socket.handshake.address}) connected`);

            socket.on("message", (message: Imessage) => {
                let user: IUser = this.users.find(u => u.socketId === socket.id);
                if (user === undefined) {
                    this.log.red(`User ${message.from} not found`);
                    return
                } else if (user.username !== message.from) {
                    this.log.info(`User ${user.username} tried to publish content with another name (${message.from})`);
                    message.from = user.username;
                }
                this.log(`${message.from} says: ${message.message}`);
                socket.broadcast.emit("message", message);
            });
            socket.on("register", (message: string) => {
                if (this.users.find(user => user.username === message)) {
                    socket.emit("register", false);
                } else {
                    if (message.length > 20 || message.length < 3) {
                        socket.emit("register", false);
                        return;
                    }
                    this.users.push({
                        username: message,
                        ip: socket.handshake.address,
                        socketId: socket.id
                    });
                    this.log(`User ${message} registered`);
                    socket.broadcast.emit("message", {from: "Server", message: `${message} has joined the chat`});
                    socket.emit("register", true);
                }
            });
            socket.on("disconnect", () => {
                let user: IUser = this.users.find(user => user.socketId === socket.id);
                this.users.filter(user => user.socketId !== socket.id);
                
                socket.broadcast.emit("message", {from: "Server", message: `${user.username} left the chat`});
            });
        })
        httpServer.listen(this.parsedArgs.port);
    }
}

let main = new Main();

export default main