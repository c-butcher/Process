const Type = require('./type');

class Boolean extends Type {
    constructor(defaultValue = false) {
        super(false, defaultValue);
    }

    /**
     * Check to see if the value is a boolean.
     *
     * @param {*} value
     *
     * @returns {boolean}
     */
    isValid(value) {
        return value === true || value === false;
    }

    /**
     * Sanitizes the value to a boolean.
     *
     * Numbers are converted to true when they are not zero.
     * Strings are converted to true when the length is greater than zero and it does not equal 'false'.
     * Arrays are converted to true when the length is greater than zero.
     * Finally any non-boolean value is returned as true.
     *
     * @param {*} value
     *
     * @returns {boolean}
     */
    sanitize(value) {
        if (typeof value === 'string') {
            if (value === 'false') {
                value = false;
            }

            return value.length > 0;
        }

        if (typeof value === 'number') {
            value = value !== 0;
        }

        if (Array.isArray(value)) {
            value = value.length > 0;
        }

        if (typeof value !== 'boolean') {
            value = true;
        }

        return value;
    }
}

module.exports = Boolean;