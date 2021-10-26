import parser, { arguments } from "./argParser";
import Client from "./Client";

class Main {

    parsedArgs: arguments;
    client: Client;

    /**
     * Run the application
     * @param args program arguments
     */
    run(args: string[]) {
        this.parsedArgs = parser.parse(args);
        this.client = new Client(this.parsedArgs);
        this.client.run()
    }
}

let main = new Main();

export default main