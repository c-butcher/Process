const Type = require('./type');

class String extends Type {
    constructor(isRequired, defaultValue = '', minLength = null, maxLength = null) {
        super(isRequired);

        this._minLength = minLength;
        this._maxLength = maxLength;
    }

    isValid(value) {
        if (this._isRequired && value === undefined) {
            return false;
        }

        if (value === undefined) {
            if (this._isRequired) {
                return false;
            }
        }

        if (typeof value.toString === 'function') {
            value = value.toString();
        }

        if (typeof value === 'boolean') {
            value = value ? 'true' : 'false';
        }

        if (typeof value !== 'string') {
            return false;
        }

        let length = value.length;

        if (this._isRequired) {

            if (this._minLength !== null) {
                if (length < this._minLength) {
                    return false;
                }
            }

            if (this._maxLength !== null) {
                if (length > this._maxLength) {
                    return false;
                }
            }
        }

        return true;
    }

    sanitize(value) {
        if (typeof value === undefined || value === null) {
            value = '';
        }

        if (typeof value.toString === 'function') {
            value = value.toString();
        }

        if (typeof value === 'boolean') {
            value = value ? 'true' : 'false';
        }

        return value;
    }
}

module.exports = String;
