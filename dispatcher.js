class Dispatcher {
    constructor() {
        this._isRunning  = true;
        this._isStateful = true;
        this._data       = new Map();

        this.resetState();
    }

    setData(name, value) {
        this._data.set(name, value);

        return this;
    }

    getData(name = null, defaultValue = null) {
        if (name === null) {
            return this._data;
        }

        if (!this._data.has(name)) {
            return defaultValue;
        }

        return this._data.get(name);
    }

    removeData(name) {
        return this._data.delete(name);
    }

    clearData() {
        return this._data.clear();
    }

    hasData(name) {
        return this._data.has(name);
    }

    resetState() {
        this._isRunning = true;
        this._data.clear();
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
