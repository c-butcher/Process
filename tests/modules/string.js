const Command = require('../../command');
const Types = require('../../types');

class StringLengthCommand extends Command {
    constructor(args) {
        super('string-length', args, {
            string: new Types.String(false)
        }, {
            length: new Types.Number()
        });
    }

    process(dispatcher) {
        let length = 0;
        let string = this.args.get('string');

        if (typeof string === 'string') {
            length = string.length;
        }

        return {
            length: length
        };
    }
}

class StringReplaceCommand extends Command {
    constructor(args) {
        super('string-replace', args, {
            subject: new Types.String(true),
            search:  new Types.String(true),
            replace: new Types.String(true)
        },{
            string:  new Types.String(),
        });
    }

    process(dispatcher) {
        let subject = this.args.get('subject');
        let search  = this.args.get('search');
        let replace = this.args.get('replace');

        return {
            string: subject.replace(search, replace)
        };
    }
}

class StringRepeatCommand extends Command {
    constructor(args) {
        super('string-repeat', args, {
            string: new Types.String(true),
            count: new Types.Number(true),
        }, {
            string: new Types.String()
        });
    }

    process(dispatcher) {
        let string = this.args.get('string');
        let count  = this.args.get('count');

        return {
            string: string.repeat(count)
        };
    }
}

class StringSearchCommand extends Command {
    constructor(args) {
        super('string-search', args, {
            string: new Types.String(true),
            search: new Types.String(true),
            insensitive: new Types.Boolean(false),
        }, {
            count: new Types.Number(),
            positions: new Types.Number(),
        });
    }

    process(dispatcher) {
        let string = this.args.get('string');
        let search = this.args.get('search');
        let insensitive = this.args.get('insensitive');

        let regex = insensitive ? "/" + search + "/i" : "/" + search + "/";

        let count = string.match(regex).length;
        if (count === null) {
            count = 0;
        }

        let position = string.search(regex);
        if (position === -1) {
            position = null;
        }

        return {
            count: count,
            position: position,
        };
    }
}

module.exports = {
    StringLengthCommand,
    StringRepeatCommand,
    StringReplaceCommand,
    StringSearchCommand,
};