class Command {
    constructor(name, params) {
        if (this.constructor === Command) {
            throw "Abstract class Command cannot be instantiated into an object.";
        }

        if (this.hasOwnProperty('process') || typeof this.process !== 'function') {
            throw "Command must have a process method.";
        }

        if (typeof params === 'object') {
            params = Object.entries(params);
        }

        this.name   = name;
        this.params = new Map(params);
    }
}

module.exports = Command;