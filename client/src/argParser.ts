export interface arguments {
    ip: string;
    port: number;
}

class ArgumentsParser{

    /**
     * Prints help message
     */
    help() {
        console.log(`
        Usage:
        $ client <ip> <port>
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
        if (args.length != 4) {
            this.help()
            process.exit(1)
        }
        return {
            ip: args[2],
            port: parseInt(args[3])
        }
    }
}

let parser = new ArgumentsParser()

export default parser