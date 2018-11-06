const assert = require('assert');
const Dispatcher = require('../dispatcher');
const Processing = require('./modules/processing');

describe('Dispatcher', function() {

    it('throws an error when instantiated directly.', function() {
        assert.throws(() => {
            let dispatcher = new Dispatcher(false);
        }, /cannot be instantiated/i);
    });

    it('can start and stop processing.', function() {
        let dispatcher = new Processing.TestDispatcher();

        dispatcher.startProcessing();
        assert.equal(dispatcher.isProcessing(), true);

        dispatcher.stopProcessing();
        assert.equal(dispatcher.isProcessing(), false);
    });
});
