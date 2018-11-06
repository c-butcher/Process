const assert = require('assert');
const Command = require('../command');
const String = require('./modules/string');
const Processing = require('./modules/processing');

describe('Command', function() {

    it('instantiates with same amount of arguments as inputs.', function() {
        let cmd = new String.StringLengthCommand();
        assert.equal(1, cmd.args.size);

        cmd = new String.StringReplaceCommand({
            subject: 'Hello {name}',
            search: '{name}',
            replace: 'Chris!',
        });

        assert.equal(Object.values(cmd.getInputs()).length, cmd.args.size);
    });


    it('sanitizes the input arguments when instantiated.', function() {
        let cmd = new String.StringLengthCommand({
            string: {
                toString: function() {
                    return 'This was an object.';
                }
            }
        });

        assert.equal(cmd.args.size, 1);
        assert.equal(cmd.args.get('string'), 'This was an object.');
    });


    it('retains arguments supplied to constructor().', function() {
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
