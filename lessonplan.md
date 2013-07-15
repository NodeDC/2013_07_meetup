## Make sure you have the right versions ##

### Goal: ###
Everybody should be running a version of node that has the necessary capabilities for the exercises

### Process ###

People should have ideally a node 0.10.x version and npm 1.2.x version.  We can probably live with node 0.8.2x and npm 1.2.x.

```
Cocytus:src jonathan$ node --version
v0.10.12
Cocytus:src jonathan$ npm --version
1.2.32
Cocytus:src jonathan$
```

Anybody who does not have a 0.10.x or 0.8.20-something node version should head to the separate table we'll try to have for getting people properly installed.

## Get started ##

### Goal: ###
Use decent/good node programming hygiene by using npm init to get coding started.

### Process ###

Have people create a new directory somewhere to work in, then do a `npm init`:

```
Cocytus:src jonathan$ mkdir nodedc_meetup
Cocytus:src jonathan$ cd nodedc_meetup/
Cocytus:nodedc_meetup jonathan$ npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sane defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg> --save` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
name: (nodedc_meetup)
version: (0.0.0)
description: _ENTER_A_DESCRIPTION_
entry point: (index.js) app.js
test command:
git repository:
keywords:
author: _INSERT_YOUR_NAME_HERE_
license: (BSD)
About to write to /Users/Jonathan/Files/src/nodedc_meetup/package.json:

{
  "name": "nodedc_meetup",
  "version": "0.0.0",
  "description": "_ENTER_A_DESCRIPTION_",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "_INSERT_YOUR_NAME_HERE_",
  "license": "BSD"
}


Is this ok? (yes)
npm WARN package.json nodedc_meetup@0.0.0 No repository field.
npm WARN package.json nodedc_meetup@0.0.0 No readme data.
Cocytus:nodedc_meetup jonathan$
```

We'll worry about the test and repository commands later, if at all: getting to either of those may be outside the scope of the meeting.  The users also shouldn't worry about the 2 npm warnings at the end that resulted.  But let's fix that `No readme data` warning now:

```
Cocytus:nodedc_meetup jonathan$ cat > README.md
_TYPE_OUT_A_USEFUL_DESCRIPTION_HERE?_
Cocytus:nodedc_meetup jonathan$
```

## Write "Hello world" app ##

### Goal ###

Have them write any simple working node script

### Process ###

Have them edit hello.js to contain nothing but `console.log('Hello, world');`, save it, and then run it:
```
Cocytus:nodedc_meetup jonathan$ node hello.js
Hello, world!
Cocytus:nodedc_meetup jonathan$
```

## Point out module use ##

### Goal ###
Introduce concept of node modules, and show how even the most basic scripts usually use them

### Process ###

There was a console.log in the previous example, that might be a good starting point to show that a module has already been used.

Explain modules as the base of how node code organization is done.  We'll cover what one looks like in the next step.

Let's let them pass who they want to say hello to in on the command line, and have the answer include the hostname of the machine it came from.  Here's hello2.js:
```
var os = require('os');

function WriteHello(predicate) {
  console.log('Hello, ' + predicate + ' from the machine ' + os.hostname() + '!');
}

WriteHello(process.argv[2]);
```

Let's point out that console and process are node _system_ modules.  They are provided by node and are always available.  Then point out that os is also a module provided by node but not automatically loaded up through the `var os = require('os'); line

## Make WriteHello its own module ##

### Goal ###

Get everybody used to the idea of writing their own modules, and stress that modules are one of the things that make node really work by having lots of elementary building blocks put together.

### Process ###

Let's move the WriteHello method to its own module.  Have everybody make a lib subdirectory (`mkdir lib`) and make a hello module with one method in it, hello:
```
Cocytus:nodedc_meetup jonathan$ cat lib/hello.js
var os = require('os');

module.exports = {
  hello: function WriteHello(predicate) {
    console.log('Hello, ' + predicate + ' from the machine ' + os.hostname() + '!');
  }
}
```

And now have them update their hello script to use it:
```
Cocytus:nodedc_meetup jonathan$ cat hello3.js
var hello = require('./lib/hello');

function WriteHello(predicate) {
  console.log('Hello, ' + predicate + ' from the machine ' + os.hostname() + '!');
}

hello.hello(process.argv[2]);
```
And show the output that results:
```
Cocytus:nodedc_meetup jonathan$ node hello3.js World
Hello, World from the machine Cocytus.local!
```

## Make "Hello world" be a website ##

### Goal ###
Serve out hello world over the web

### Process ###

Have people create a simple, non-frameworked http website using just the node http module.  A script something like this:

```
// Load the http module to create an http server.
var http = require('http');

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  response.writeHead(200, {"Content-Type": "text/html"});
  response.end("<html><head></head><body><h1>Hello World</h1></body></html>\n");
  console.log('Response sent at ' + new Date());
});

// Listen on port 3000, IP defaults to 127.0.0.1
server.listen(3000);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:3000/");
```

Then have them run it, load up the page in a browser, and then kill it:
```
Cocytus:nodedc_meetup jonathan$ node app.js
Server running at http://127.0.0.1:3000/
Response sent at Mon Jul 15 2013 13:12:09 GMT-0400 (EDT)
Response sent at Mon Jul 15 2013 13:12:09 GMT-0400 (EDT)
^CCocytus:nodedc_meetup jonathan$
```

They should have seen "Hello World" as an H1 in the browser.  Then have them look at the console and note that they got 2 responses sent here.  Since this was a browser (unless you had them use curl or wget), the second is for /favicon.ico.  Just a nifty reminder to point out to them that the server sees everything and should respond to it.

## Use a 3rd party module and start using a web framework ##

### Goal(s) ###
* Learn how to install 3rd party modules via npm
* Start using a web framework to build our app

### Process ###

Have the user install connect and a templating engine.  I prefer ejs, but moustache (hogan?) would probably work.  I would probably try to avoid jade myself, but whatever works for the assistants is ok by me. 

```
Cocytus:nodedc_meetup jonathan$ npm install ejs
npm WARN package.json nodedc_meetup@0.0.0 No repository field.
npm http GET https://registry.npmjs.org/ejs
npm http 200 https://registry.npmjs.org/ejs
npm http GET https://registry.npmjs.org/ejs/-/ejs-0.8.4.tgz
npm http 200 https://registry.npmjs.org/ejs/-/ejs-0.8.4.tgz
npm WARN package.json bytes@0.2.0 No repository field.
npm WARN package.json cookie-signature@1.0.1 No repository field.
npm WARN package.json fresh@0.1.0 No repository field.
npm WARN package.json methods@0.0.1 No repository field.
npm WARN package.json pause@0.0.1 No repository field.
npm WARN package.json uid2@0.0.2 No repository field.
npm WARN package.json range-parser@0.0.4 No repository field.
ejs@0.8.4 node_modules/ejs
Cocytus:nodedc_meetup jonathan$ npm install connect
```

The connect install is far too big to show the output.

## Build a form to collect input ##

### Goal ###
Be able to accept input and do something with it

### Process ###
Create a script that shows a form, takes in the POSTed input and does some transformation of the received data that then gets sent back to the user

## Take collected input and get secret key ##

### Goal ###
Using form-provided data, call a webservice to get the transformed data presented back to the user

### Process ###

Have them use node's ability to do client http requests to call the server we've built for the exercise with the user-supplied data, get the response, and send it back to the user


