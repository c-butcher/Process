class Command {
    constructor(name, args, inputs = {}, outputs = {}) {
        if (this.constructor === Command) {
            throw new Error("Abstract class Command cannot be instantiated into an object.");
        }

        if (this.hasOwnProperty('process') || typeof this.process !== 'function') {
            throw new Error("Command must have a process method.");
        }

        if (typeof args === 'object') {
            args = Object.entries(args);
        }

        this.name = name;
        this.args = new Map(args);

        this._inputs = inputs;
        this._outputs = outputs;

        this._sanitizeInputs();
    }

    _sanitizeInputs() {
        for (let key in this._inputs) {
            if (!this._inputs.hasOwnProperty(key)) {
                continue;
            }

            let input = this._inputs[key];
            let value = input.getDefaultValue();

            if (this.args.has(key)) {
                value = this.args.get(key);
            }

            value = input.sanitize(value);

            if (!input.isValid(value)) {
                throw new Error(`Command '${this.name}' could not sanitize the '${key}' argument.`);
            }

            this.args.set(key, value);
        }
    }

    getInputs() {
        return this._inputs;
    }

    getOutputs() {
        return this._outputs;
    }
}

module.exports = Command;
