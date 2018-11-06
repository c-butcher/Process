# Chains

### What are processes?
Parcel is a tool that allows you to build an application or process through the combination of commands.

### Creating a Command

- Extending the Command Object
  - Command Name
  - Process Method
- Check Dispatcher
  - Make sure you are using the best dispatcher based on minimum requirements.
- 
```javascript
const Command = require('process').Command;

class SendEmailCommand extends Command {
    constructor(params) {
        super('send_email_command', params);
    }
    
    process(dispatcher) {
        if(!(dispatcher instanceof EmailDispatcher)) {
            return;
        }
        
        if (!this.params.has('to')) {
            throw new Error('Email must have an address of where to send it.');
        }
        
        if (!this.params.has('from')) {
            throw new Error('Email must have an address of where it was sent from.');
        }
        
        if (!this.params.has('body')) {
            throw new Error('Email must have a body.');
        }
        
        let to      = this.params.get('to');
        let from    = this.params.get('from');
        let subject = this.params.get('subject');
        let body    = this.params.get('body');
        
        dispatcher.send(to, from, subject, body);
    }
}

```

#### Interacting with the Dispatcher
You'll notice the first thing our command does is check whether the dispatcher is an instance of our EmailDispatcher.
```javascript
    if(!(dispatcher instanceof EmailDispatcher)) {
        return;
    }
```
Most commands will only be able to utilize one or two dispatchers. This is because the commands will need certain
methods and parameters to be attached to the dispatcher. Our email dispatcher will have a method called `send`
and our command `SendEmailCommand` will execute that method. So we know our command will only work with a dispatcher
that has the method with a signature matching `send(to from, subject, body)`.

We are returning at this point because we know the command can't use the dispatcher. This command can only be used
with an `EmailDispatcher` because the `EmailDispatcher` has a `send()` method.

### Create a Dispatcher

```javascript
const Dispatcher = require(process).Dispatcher;

class EmailDispatcher extends Dispatcher {
    constructor(config = {}) {
        super();
        
        this.host = config.host ? config.host : null;
        this.port = config.port ? config.port : 25;
        this.username = config.username ? config.username : null;
        this.password = config.password ? config.password : null;
        this.addresses = new Map();
    }
    
    setHost(host) {
        this.host = host;
    }
    
    setPort(port) {
        this.port = port;
    }
    
    setUsername(username) {
        this.username = username;
    }
    
    setPassword(password) { 
        this.password = password;
    }
    
    addAddress(address, name) {
        this.addresses.set(address, name);
    }
    
    removeAddress(address) {
        this.addresses.delete(address);
    }
    
    hasAddress(address) {
        return this.addresses.has(address);
    }
    
    clearAddresses() {
        this.addresses.clear();
    }
    
    reset() {
        super.reset();
        this.host = null;
        this.port = 25;
        this.username = null;
        this.password = null;
        this.addresses = new Map();
    }
    
    send(to, from, subject, body) {
        return this.mailer.send({
            to: to,
            from: from,
            subject: subject,
            body: body
        });
    }
}

```

### Executing a Process

```javascript
let process = new Process();
let mailer  = new EmailDispatcher();

process.attach(new ConfigureEmailTransportCommand({
    host: 'smtp.gmail.com',
    port: 587,
    username: 'youremail@gmail.com',
    password: 'wijfnwoldiuq'
}));

process.attach(new SendEmailCommand({
    to: 'dev@yourcompany.com',
    from: 'no-reply@yourcompany.com',
    subject: "Testing Development Server",
    body: "Checking to make sure that our development servers are working."
}));

process.run(mailer);

```