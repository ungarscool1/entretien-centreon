export interface arguments {
    port: number;
}

class ArgumentsParser{

    /**
     * Prints help message
     */
    help() {
        console.log(`
        Usage:
        $ server <port>
        Options:
        -h, --help\t\t\tPrint this help
        `);
    }

    /**
     * Parse arguments
     * @param args Process arguments
     * @returns Interface with parsed arguments
     */
    parse(args: string[]): arguments | undefined {
        if (args[2] == '-h' || args[2] == '--help') {
            this.help();
            return
        }
        if (args.length != 3) {
            this.help()
            process.exit(1)
        }
        return {
            port: parseInt(args[2])
        }
    }
}

let parser = new ArgumentsParser()

export default parser