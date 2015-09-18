// Closure: A closure is a function defined within another scope,
// that has access to the outer function’s variables (outer scopes free variables).


// Why use a closure?
    // Encapsulation ->
      // they hide internal state
      // you can use a closure instead of prototype/constructor to create an object (see factory below)
      // you can use them in async programming to maintain scope (state) without manually binding an object
        // to a callback (see last example using setTimeout)


// Using closure to hide state
//ex:

// here we are passing internal state around
function greet(message) {
  console.log(message);
};

function greeter(name, age) {
  return name + ', who is ' + age + ' years old, says Hi!';
};

var message = greeter('bob', 47);

// greet(message);

// here we are refactoring to use a closure by defining greet within greeter, this will hide the state of private variables

function greeter(name, age) {
  var message = name + ', who is ' + age + ' years old, says Hi!';

  return function greet() {
    console.log(message);
  }
};

// var pamelaGreeter = greeter('Pamela', 27);
// pamelaGreeter();

// Using a closure instead of an object

// in JS you can use a constructor function and prototype that works like classical oop to create an object.
// with this, you are using the object itself to store state, so all references must be prefixed with 'this'
// It is impossible to hide any variables since everything that is accessible to your methods is also
// publicly readable, writable, and deletable.


// constructor func and prototype in JS cannot create encapsulation like classes in classical oop can!

// to encapsulate:
// you can instead create an object factory using a closure that will create an object without the use of
// the 'new' keyword, prototype, or 'this'. Using a closure creates encapsulation because you can choose
// which methods or properties to make public

//ex:
// Person factory
function Person(name, age) {
   // store the message in a closure
   var message = name  + ', who is ' + age + ' years old, says Hi!';

   return {
     // define a sync function
     greet: function greet() {
       console.log(message)
     },

     // define a function with async internals
     slowgreet: function slowgreet() {
       setTimeout(function() {
         console.log('slowgreet: ' + message)
       }, 1000);
     }
   }
}


module.exports = Person;

// One caution about the use of a factory: Each instance will create its own version of every function in the object.
// if you have a lot of instances, it doesn't perform well.



// CLOSURE ARE MOST USEFUL FOR EVENTS AND CALLBACKS
// In async programming, the callback won't get fired untill after an event happens.
// This will be on a completely new stack and the only way to get data into it is through lexical scope and a closure.

// When using the prototype/constructor func, you have to manually bind the callback to the object you wish to
// define the context of 'this', you don't have to do this with the factory (closure);

// example:
function PersonPrototype(name, age) {

  // Store the message in internal state
  this.message = name + ", who is " + age + " years old, says hi!";

};

// Define a sync method
PersonPrototype.prototype.greet = function greet() {
  console.log(this.message);
};

// Define a method with async internals
PersonPrototype.prototype.slowGreet = function slowGreet() {
  var self = this; // Use a closure to preserve `this`
  setTimeout(function () {
    console.log(self.message);
  }, 1000);
};

//created from constructor
var jake = new PersonPrototype("Jake", 17);
var phill = new PersonPrototype('Phill', 30);

//created from factory
var tim = Person("Tim", 28);

setTimeout(jake.greet, 100);
// Outputs: undefined

setTimeout(tim.greet, 100);
// Outputs: Tim, who is 28 years old, says hi!

// With `this` based objects you have to manually bind the function
// This works
setTimeout(function () {
  jake.greet();
}, 100);

// OR like this:

setTimeout(phill.greet.bind(phill), 100);


// source: http://howtonode.org/why-use-closure
