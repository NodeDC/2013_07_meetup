var hello = require('./lib/hello');

function WriteHello(predicate) {
  console.log('Hello, ' + predicate + ' from the machine ' + os.hostname() + '!');
}

hello.hello(process.argv[2]);
