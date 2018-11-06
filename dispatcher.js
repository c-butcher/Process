class Dispatcher {

    /**
     *
     * @param {boolean} isRunning
     */
    constructor(isRunning = false) {
        if (this.constructor === Dispatcher) {
            throw new Error("Abstract class Dispatcher cannot be instantiated into an object.");
        }

        this._isRunning   = isRunning;
    }

    /**
     * Tell the dispatcher to start processing the commands.
     *
     * @returns {Dispatcher}
     */
    startProcessing() {
        this._isRunning = true;
        return this;
    }

    /**
     * Tell the dispatcher to stop processing the commands.
     *
     * @returns {Dispatcher}
     */
    stopProcessing() {
        this._isRunning = false;
        return this;
    }

    /**
     * Tells whether the commands are being processed.
     *
     * @returns {boolean}
     */
    isProcessing() {
        return this._isRunning;
    }
}

module.exports = Dispatcher;
