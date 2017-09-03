## Todo App

This repository contains the solution to the assignment [TodoApp](https://github.com/malikankit/ng-aug-2017-web-dev/blob/master/Day_11_30_Aug/Assignment.md).
Intended Audience: Evaluators of trainee assignments at Nagarro Software Pvt Ltd
(If you don't know what is going on, this might not be for you.)

* Installing
    1. Make sure [Node](https://nodejs.org) and [NPM](https://www.npmjs.com) are installed and available in system path.
    2. Clone this repository (git clone https://<repo-url>) to your local machine.
    2. On a terminal, cd to the directory where you cloned the repo.
    3. Run 'npm install'.
    If no errors show up, Installation is complete.

* Running
    1. On a terminal, cd to the directory where you cloned the repo.
    2. Run 'npm start'.
    3. Open a web browser on your local machine.
    4. Navigate to http://localhost:4000.
    You can use the app now.

### Features Built
All features asked for in the assignment have been implemented.
In addition, the bonus features have also been added.

### Features Not Built
* Edit title of active todos. (Add edit button beside each todo.)
* Documentation of public/script.js

### Known Issues
* The API endpoints are hard-coded in the static client scripts as paths relative to 'window.location', but are defined in the server i.e. elsewhere outside the static content. One needs to make sure that the server serving the static content and the API endpoints is the same server. This makes the static content non-portable between servers and needs to be addressed.
* The cient-side javascript code needs restructuring. Currently the defined functions are doing more jobs than what they should as expected from their respective names, and are causing side-effects which can be understood only if certain assumptions are prior flow control is known to the maintainer. For example, getTodoAJAX does not get(return) a JSON unlike as expected from its name, but rather manipulates the DOM too.
* The HTML layout has not been tested for responsive design and use on different-sized screens.
