const Command    = require('./command');
const Dispatcher = require('./dispatcher');

class Process {

    /**
     * Create a new process and append the commands to it.
     *
     * @param {Command[]} commands
     */
    constructor(commands = []) {
        this.commands = [];
        this.map = [];
        commands.forEach((command) => {
            this.append(command);
        });
    }

    /**
     * Append a command to this process.
     *
     * @param {Command}    command
     * @param {Map|object} outputMap
     *
     * @returns {Process}
     */
    append(command, outputMap = {}) {
        if (typeof command !== 'function' || !(command.prototype instanceof Command)) {
            throw new Error("Process can only append Command objects");
        }

        this.commands.push(command);
        this.map.push(new Map(Object.entries(outputMap)));

        return this;
    }

    /**
     * Send the dispatcher to deal with the commands in the process.
     *
     * @param {Dispatcher} dispatcher
     *
     * @returns {Dispatcher}
     */
    dispatch(dispatcher) {
        if (!(dispatcher instanceof Dispatcher)) {
            throw new Error("Process can only be executed using a Dispatcher.");
        }

        dispatcher.startProcessing();

        let inputs  = {};
        for (let key in this.commands) {
            if (!dispatcher.isProcessing()) {
                break;
            }

            let command = new this.commands[key](inputs);
            let outputs = command.process(dispatcher);

            inputs = this._mapInputsFromOutputs(outputs, this.map[key]);
        }

        dispatcher.stopProcessing();

        return dispatcher;
    }

    /**
     * Map the returned outputs from the last command to the input arguments for the next command.
     *
     * @param {object} outputs
     * @param {Map<string, string>} map
     *
     * @returns {Map<string, *>}
     */
    _mapInputsFromOutputs(outputs, map) {
        let inputs = new Map();
        map.forEach( (to, from) => {
            if (outputs.hasOwnProperty(from)) {
                let value = outputs[from];
                inputs.set(to, value);
            }
        });

        return inputs;
    }
}

module.exports = Process;
