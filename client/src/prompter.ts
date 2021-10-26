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

    /**
     * Sleep for a given amount of time in milliseconds
     * @param ms Milliseconds to sleep
     * @returns Nothing
     */
    public async sleep(ms: number): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, ms);
        });
    }
}

let prompter = new Prompter();

export default prompter;