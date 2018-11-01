const assert = require('assert');
const Dispatcher = require('../dispatcher');

describe('Dispatcher', function() {
    it('can set a parameter.', function() {
        let dispatcher = new Dispatcher();
        dispatcher.set('test', 42);

        assert.ok(dispatcher.has('test'));
    });

    it('can remove a parameter.', function() {
        let dispatcher = new Dispatcher();
        dispatcher.set('test', 42);

        assert.ok(dispatcher.has('test'));
        assert.equal(dispatcher.get('test'), 42);

        dispatcher.remove('test');
        assert.ok(!dispatcher.has('test'));
        assert.equal(dispatcher.get('test'), undefined);
    });

    it('can clear its state.', function() {
        let dispatcher = new Dispatcher();
        dispatcher.set('test', 42);

        assert.ok(dispatcher.has('test'));

        dispatcher.reset();
        assert.ok(!dispatcher.has('test'));
    });
});
