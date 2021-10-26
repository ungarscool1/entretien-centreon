import readline from "readline";

class Prompter {
    private readonly rl: readline.Interface;

    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    }

    /**
     * Request user input
     * @param question Prompt to display to the user
     * @returns 
     */
    public async prompt(question: string): Promise<string> {
        return new Promise((resolve) => {
            this.rl.question(question, (answer) => {
                resolve(answer);
            });
        });
    }
}

let prompter = new Prompter();

export default prompter;