const Command    = require('./command');
const Dispatcher = require('./dispatcher');

class Chain {

    /**
     * Create a new chain with the supplied commands linked to it.
     *
     * @param {Command[]} commands
     */
    constructor(commands = []) {
        this.commands = [];
        commands.forEach((command) => {
            this.link(command);
        })
    }

    /**
     * Link a command to the chain.
     *
     * @param command
     * @returns {Chain}
     */
    link(command) {
        if ( !(command instanceof Command)) {
            throw "Chains can only link Command objects";
        }

        this.commands.push(command);

        return this;
    }

    /**
     * Execute the chain of commands.
     *
     * @param {Dispatcher} dispatcher
     *
     * @returns {Dispatcher}
     */
    execute(dispatcher) {
        if (!(dispatcher instanceof Dispatcher)) {
            throw "Chains can only be executed using a Dispatcher.";
        }

        this.commands.forEach((command) => {
            if (dispatcher.isTraversing()) {

                if (!dispatcher.isStateful()) {
                    dispatcher.reset();
                }

                command.process(dispatcher);
            }
        });

        return dispatcher;
    }
}

module.exports = Chain;