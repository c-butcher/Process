const assert = require('assert');
const
    Command = require('../command'),
    AddCommand = require('./modules/calculator').AddCommand,
    NoProcessMethodCommand = require('./modules/calculator').NoProcessMethodCommand;

describe('Command', function() {

    it('instantiates with no arguments by default.', function() {
        let cmd = new AddCommand();
        assert.equal(cmd.params.size, 0);
    });

    it('retains arguments supplied to constructor().', function() {
        let cmd = new AddCommand({
            name: 'Add',
            value: 10,
        });

        assert.equal(cmd.params.size, 2);
    });

    it('throws an error when instantiated directly.', function() {
        assert.throws(() => {
            let cmd = new Command('FakeCommand');
        }, /cannot be instantiated/);
    });

    it('throws an error when there is no process() method.', function() {
        assert.throws(() => {
            let cmd = new NoProcessMethodCommand();
        }, /must have a process method/);
    });
});

