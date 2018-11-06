const Type = require('./type');

class Number extends Type {
    constructor(isRequired, defaultValue = 0, min = null, max = null) {
        super(isRequired, defaultValue);

        this._min = min;
        this._max = max;
    }

    /**
     * Check to see if the value is a number.
     *
     * @param value
     * @returns {boolean}
     */
    isValid(value) {
        if (this._isRequired && value === undefined) {
            return false;
        }

        if (typeof value !== 'number') {
            value = parseInt(value);
            if (typeof value !== 'number') {
                return false;
            }
        }

        if (this._isRequired) {
            if (this._min !== null) {
                if (value < this._min) {
                    return false;
                }
            }

            if (this._max !== null) {
                if (value > this._max) {
                    return false;
                }
            }
        }

        return true;
    }

    /**
     * Sanitizes the value to a number.
     *
     * When the supplied value is an object or array, then the returned value will be
     * the number of properties/indexes in that object or array.
     *
     * @param value
     * @returns {*}
     */
    sanitize(value) {
        if (typeof value === 'string' || typeof value === 'boolean') {
            value = parseInt(value);
        }

        if (typeof value === 'object' || Array.isArray(value)) {
            value = value.length;
        }

        return value;
    }
}

module.exports = Number;