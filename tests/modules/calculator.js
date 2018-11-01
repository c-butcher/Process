const Command    = require('../../command');
const Dispatcher = require('../../dispatcher');

class CalculatorDispatcher extends Dispatcher {
    constructor(value = 0) {
        super();

        this.value = value;
    }

    add(addition) {
        this.value += parseFloat(addition);

        return this.value;
    }

    multiply(multiplier) {
        this.value *= parseFloat(multiplier);

        return this.value;
    }

    divide(divisor) {
        this.value /= parseFloat(divisor);

        return this.value;
    }

    subtract(subtraction) {
        this.value -= parseFloat(subtraction);

        return this.value;
    }

    clear() {
        this.value = 0;
    }

    resetState() {
        this.clear();
        super.resetState();
    }
}

class AddCommand extends Command {
    constructor(params) {
        super('calculator_add', params);
    }

    process(calculator) {
        if ( !(calculator instanceof CalculatorDispatcher) ) {
            return;
        }

        let value = this.params.get('value');

        calculator.add(value);
    }
}

class SubtractCommand extends Command {
    constructor(params) {
        super('calculator_subtract', params);
    }

    process(calculator) {
        if ( !(calculator instanceof CalculatorDispatcher) ) {
            return;
        }

        let value = this.params.get('value');

        calculator.subtract(value);
    }
}

class MultiplyCommand extends Command {
    constructor(params) {
        super('calculator_multiply', params);
    }

    process(calculator) {
        if ( !(calculator instanceof CalculatorDispatcher) ) {
            return;
        }

        let value = this.params.get('value');

        calculator.multiply(value);
    }
}

class DivideCommand extends Command {
    constructor(params) {
        super('calculator_divide', params);
    }

    process(calculator) {
        if ( !(calculator instanceof CalculatorDispatcher) ) {
            return;
        }

        let value = this.params.get('value');

        calculator.divide(value);
    }
}

class SetTraversingCommand extends Command {
    constructor(params) {
        super('set_traversing', params);
    }

    process(dispatcher) {
        if ( !(dispatcher instanceof Dispatcher) ) {
            return;
        }

        dispatcher.setTraversing(false);
    }
}

class SetStatefulCommand extends Command {
    constructor(params) {
        super('set_stateful', params);
    }

    process(dispatcher) {
        if ( !(dispatcher instanceof Dispatcher) ) {
            return;
        }

        let stateful = this.params.get('stateful');

        dispatcher.setStateful(stateful);
    }
}

class NoProcessMethodCommand extends Command {
    constructor(params) {
        super('no_process_method', params);
    }
}

module.exports = {
    AddCommand: AddCommand,
    DivideCommand: DivideCommand,
    MultiplyCommand: MultiplyCommand,
    SubtractCommand: SubtractCommand,
    SetStatefulCommand: SetStatefulCommand,
    SetTraversingCommand: SetTraversingCommand,
    NoProcessMethodCommand: NoProcessMethodCommand,
    CalculatorDispatcher: CalculatorDispatcher
};