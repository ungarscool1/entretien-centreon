import parser, {arguments} from "./argParser";
import { io } from "socket.io-client";


class Main {

    parsedArgs: arguments;

    /**
     * Run the application
     * @param args program arguments
     */
    run(args: string[]) {
        this.parsedArgs = parser.parse(args);
        const socket = io("http://localhost:3000");
        socket.on("connect", () => {
            console.log(socket.connected); // true
        });
        socket.emit("message", "Hello World");
    }
}

let main = new Main();

export default main