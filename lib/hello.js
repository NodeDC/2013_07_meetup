var os = require('os');

module.exports = {
  hello: function WriteHello(predicate) {
    console.log('Hello, ' + predicate + ' from the machine ' + os.hostname() + '!');
  }
}

