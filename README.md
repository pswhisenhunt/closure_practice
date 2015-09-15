# closure_practice

##Reviewing JS fundamentals: Closures

What are they are why use them?

Closure: A closure is a function defined within another scope, that has access to the outer function’s variables (outer scopes free variables).


Why use a closure?
Encapsulation ->
they hide internal state;
you can use a closure instead of prototype/constructor to create an object (see factory below);
you can use them in async programming to maintain scope (state) without manually binding an object to a callback (see last example using setTimeout);
