const assert = require('assert');
const
    Chain = require('../chain'),
    AddCommand = require('./modules/calculator').AddCommand,
    SubtractCommand = require('./modules/calculator').SubtractCommand,
    DivideCommand = require('./modules/calculator').DivideCommand,
    MultiplyCommand = require('./modules/calculator').MultiplyCommand,
    SetTraversingCommand = require('./modules/calculator').SetTraversingCommand,
    SetStatefulCommand = require('./modules/calculator').SetStatefulCommand,
    CalculatorDispatcher = require('./modules/calculator').CalculatorDispatcher;

describe('Chain', function() {

    it('instantiates with no commands.', function() {
        let chain = new Chain();
        assert.equal(chain.commands.length, 0);
    });

    it('can link individual commands.', function() {
        let calculator = new CalculatorDispatcher();
        let chain = new Chain();

        chain.link(new AddCommand({value: 25}))
            .link(new SubtractCommand({value: 5}));

        chain.execute(calculator);

        assert.equal(calculator.value, 20);
    });


    it('will only accept commands extending the Command class.', function() {
        assert.throws(() => {
            let chain = new Chain([
                new AddCommand({value: 10}),
                new SubtractCommand({value: 20}),
                Object.create({value: 20}),
            ]);
        }, /Chains can only link/);
    });


    it('will only execute using a dispatcher that extends the Dispatcher class.', function() {
        assert.throws(() => {
            let chain = new Chain([
                new AddCommand({value: 10}),
                new SubtractCommand({value: 20}),
            ]);

            let dispatcher = Object.create({});

            chain.execute(dispatcher);

        }, /can only be executed using a Dispatcher/);
    });


    it('stops traversing when dispatcher tells it to.', function() {
        let chain = new Chain([
            new SubtractCommand({value: 50}), // 100 - 50 = 50
            new DivideCommand({value: 2}),    // 50  / 2  = 25
            new SetTraversingCommand({traversing: true}),
            new MultiplyCommand({value: 10}),
        ]);

        let calculator = new CalculatorDispatcher(100);

        chain.execute(calculator);

        assert.equal(calculator.value, 25);
    });


    it('holds dispatcher state between commands.', function() {
        let chain = new Chain([
            new SubtractCommand({value: 50}), // 100 - 50 = 50
            new DivideCommand({value: 2}),    // 50  / 2  = 25
            new MultiplyCommand({value: 10}), // 25  * 10 = 250
            new AddCommand({value: 5}),       // 250 + 5  = 255
        ]);

        let calculator = new CalculatorDispatcher(100);

        chain.execute(calculator);

        assert.equal(calculator.value, 255);
    });


    it('forgets dispatcher state between commands.', function() {
        let chain = new Chain([
            new SetStatefulCommand({stateful: false}),
            new SubtractCommand({value: 50}), // 100 - 50 = 50
            new DivideCommand({value: 2}),    // 50  / 2  = 25
            new MultiplyCommand({value: 10}), // 25  * 10 = 250
            new AddCommand({value: 5}),       // 250 + 5  = 255
        ]);

        let calculator = new CalculatorDispatcher(0);

        chain.execute(calculator);

        assert.equal(calculator.value, 5);
    });


    it('executes the entire list of commands.', function() {
        let chain = new Chain([
            new SubtractCommand({value: 50}), // 100 - 50 = 50
            new DivideCommand({value: 2}),    // 50  / 2  = 25
            new MultiplyCommand({value: 10}), // 25  * 10 = 250
            new AddCommand({value: 5}),       // 250 + 5  = 255
        ]);

        let calculator = new CalculatorDispatcher(100);

        chain.execute(calculator);

        assert.equal(calculator.value, 255);
    });
});
