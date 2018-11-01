class Dispatcher {
    constructor() {
        this._isStateful = true;
        this.reset();
    }

    set(name, value) {
        this._params.set(name, value);
    }

    get(name, defaultValue) {
        if (!this._params.has(name)) {
            return defaultValue;
        }

        return this._params.get(name);
    }

    has(name) {
        return this._params.has(name);
    }

    remove(name) {
        return this._params.delete(name);
    }

    reset() {
        this._isRunning = true;
        this._params = new Map();
    }

    setStateful(isStateful) {
        this._isStateful = isStateful;
    }

    isStateful() {
        return this._isStateful;
    }

    setTraversing(isTraversing) {
        this._isRunning = isTraversing;
    }

    isTraversing() {
        return this._isRunning;
    }
}

module.exports = Dispatcher;
