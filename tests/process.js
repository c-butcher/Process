const assert = require('assert');
const
    Process = require('../process'),
    Dispatcher = require('../dispatcher'),
    String  = require('./modules/string'),
    Processing = require('./modules/processing');

describe('Process', function() {

    it('instantiates with no commands.', function() {
        let process = new Process();
        assert.equal(process.commands.length, 0);
    });


    it('can append individual commands.', function() {
        let dispatcher = new Processing.TestDispatcher();
        let process = new Process();

        process
            .append(String.StringReplaceCommand, {
                string: 'string'
            })
            .append(String.StringLengthCommand, {
                length: ''
            });

        process.dispatch(dispatcher);

        assert.equal(process.commands.length, 2);
    });


    it('only accepts commands that extend the Command class.', function() {
        assert.throws(() => {
            let process = new Process();

            process.append(Object.create({}), { output: 'input' });

        }, /can only append command/i);
    });


    it('only runs with dispatchers that extend the Dispatcher class.', function() {
        assert.throws(() => {
            let process = new Process();
            let dispatcher = Object.create({});

            process.dispatch(dispatcher);

        }, /can only be executed using a dispatcher/i);
    });


    it('stops processing when the dispatcher is told to.', function() {
        let process = new Process();
        let dispatcher = new Processing.TestDispatcher();

        process.dispatch(dispatcher);
    });


    it('holds dispatcher state between commands.', function() {
        let process = new Process();
        let dispatcher = new Processing.TestDispatcher();

        process.dispatch(dispatcher);
    });


    it('executes the entire list of commands.', function() {
        let process = new Process();
        let dispatcher = new Processing.TestDispatcher();

        process.dispatch(dispatcher);
    });
});
