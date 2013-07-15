var os = require('os');

function WriteHello(predicate) {
  console.log('Hello, ' + predicate + ' from the machine ' + os.hostname() + '!');
}

WriteHello(process.argv[2]);
