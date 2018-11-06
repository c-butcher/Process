const assert = require('assert');
const Command = require('../command');
const String = require('./modules/string');
const Processing = require('./modules/processing');

describe('Command', function() {

    it('instantiates without args by default.', function() {
        let cmd = new String.StringLengthCommand();
        assert.equal(1, cmd.args.size);

        cmd = new String.StringReplaceCommand({
            subject: 'Hello {name}',
            search: '{name}',
            replace: 'Chris!',
        });

        assert.equal(3, cmd.args.size);
    });

    it('retains args supplied to constructor().', function() {
        let cmd = new String.StringLengthCommand({
            string: 'Hello World!',
            extra: 'Non-Input Value',
        });

        assert.equal(cmd.args.size, 2);
        assert.equal(cmd.args.get('string'), 'Hello World!');
        assert.equal(cmd.args.get('extra'), 'Non-Input Value');
    });

    it('throws an error when instantiated directly.', function() {
        assert.throws(() => {
            let cmd = new Command('FakeCommand');
        }, /cannot be instantiated/i);
    });

    it('throws an error when there is no process() method.', function() {
        assert.throws(() => {
            let cmd = new Processing.NoProcessMethodCommand();
        }, /must have a process method/i);
    });
});
