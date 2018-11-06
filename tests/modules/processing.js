const Command = require('../../command');
const Dispatcher = require('../../dispatcher');

class TestDispatcher extends Dispatcher {
    constructor() {
        super();
    }
}

class NoProcessMethodCommand extends Command {
    constructor(args) {
        super('no-process-method', args);
    }
}

module.exports = {
    TestDispatcher,
    NoProcessMethodCommand,
};