const Type = require('./type');

class Object extends Type {
    constructor(isRequired = false, defaultValue = Object.create()) {
        super(isRequired, defaultValue);
    }

    /**
     * Check to see if the value is a number.
     *
     * @param {*} value
     *
     * @returns {boolean}
     */
    isValid(value) {
        if (!this._isRequired) {
            return true;
        }

        return typeof value === 'object';
    }

    /**
     * Sanitize the value into an object.
     *
     * When the supplied value isn't an object, then an object will be returned
     * with a single property `obj.value` that contains the supplied value.
     *
     * @param {*} value
     *
     * @returns {boolean}
     */
    sanitize(value) {
        if (typeof value !== 'object') {
            value = Object.create({value: value});
        }

        return value;
    }
}

module.exports = Number;