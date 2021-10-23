import parser, {arguments} from "./argParser";
import { createServer } from "http";
import { Server } from "socket.io";


class Main {

    parsedArgs: arguments;

    /**
     * Run the application
     * @param args program arguments
     */
    run(args: string[]) {
        this.parsedArgs = parser.parse(args);
        const httpServer = createServer();
        const io = new Server(httpServer, {});

        io.on("connection", (socket) => {
            console.log("New client connected");
            
            socket.on("message", (message: string) => {
                console.log(message);
            });
        })
    httpServer.listen(this.parsedArgs.port);
    }
}

let main = new Main();

export default main