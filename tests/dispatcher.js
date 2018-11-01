const assert = require('assert');
const Dispatcher = require('../dispatcher');

describe('Dispatcher', function() {
    it('can set a parameter.', function() {
        let dispatcher = new Dispatcher();
        dispatcher.setData('test', 42);

        assert.ok(dispatcher.hasData('test'));
    });

    it('can remove a parameter.', function() {
        let dispatcher = new Dispatcher();
        dispatcher.setData('test', 42);

        assert.ok(dispatcher.hasData('test'));
        assert.equal(dispatcher.getData('test'), 42);

        dispatcher.removeData('test');
        assert.ok(!dispatcher.hasData('test'));
        assert.equal(dispatcher.getData('test'), undefined);
    });

    it('can clear out the data.', function() {
        let dispatcher = new Dispatcher();

        dispatcher.setData('date', '10-15-2018');
        dispatcher.setData('time', '2:00pm');

        assert.ok(dispatcher.hasData('time'));
        assert.ok(dispatcher.getData('time'), '2:00pm');

        dispatcher.clearData();
        assert.ok(!dispatcher.hasData('time'));
    });

    it('can reset its state.', function() {
        let dispatcher = new Dispatcher();

        dispatcher.setData('date', '10-15-2018');
        dispatcher.setData('time', '2:00pm');
        dispatcher.setTraversing(false);

        assert.ok(dispatcher.hasData('time'));
        assert.ok(dispatcher.getData('time'), '2:00pm');
        assert.ok(!dispatcher.isTraversing());

        dispatcher.resetState();
        assert.ok(!dispatcher.hasData('time'));
        assert.ok(dispatcher.getData('time', '6:00pm'), '6:00pm');
        assert.ok(dispatcher.isTraversing());
    });
});
