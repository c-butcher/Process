class Type {
    constructor(isRequired, defaultValue = null) {
        if (this.constructor === Type) {
            throw new Error('Abstract Type class cannot be instantiated by itself.');
        }

        if (typeof this.isValid !== 'function') {
            throw new Error('Abstract Type class must have an isValid() method.');
        }

        if (typeof this.sanitize !== 'function') {
            throw new Error('Abstract Type class must have a sanitize() method.');
        }

        this._isRequired = isRequired;
        this._defaultValue = defaultValue;
    }

    isRequired() {
        return this._isRequired;
    }

    getDefaultValue() {
        return this._defaultValue;
    }
}

module.exports = Type;