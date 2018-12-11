# tiny-curry

[![source](https://badgen.net/npm/v/@ngard/tiny-curry)](https://www.npmjs.com/package/@ngard/tiny-curry)
[![bundle size](https://badgen.net/bundlephobia/minzip/@ngard/tiny-curry)](https://bundlephobia.com/result?p=@ngard/tiny-curry)
[![build status](https://badgen.net/travis/NickGard/tiny-curry)](https://travis-ci.org/NickGard/tiny-curry)
[![license](https://badgen.net/badge/license/MIT/blue)](https://badgen.net/badge/license/MIT/blue)

A minimal utility similar to `lodash.curry`. For when every byte counts!
Returns a series of functions that consume the original function's arguments one at a time until the original function's arity (or the passed arity) is met.

<hr/>

lodash.curry: [![bundle size](https://badgen.net/bundlephobia/minzip/lodash.curry)](https://bundlephobia.com/result?p=lodash.curry)
<br/>
tiny-curry: [![bundle size](https://badgen.net/bundlephobia/minzip/@ngard/tiny-curry)](https://bundlephobia.com/result?p=@ngard/tiny-curry)

<hr/>

## Syntax

```javascript
curry(/* function [, arity] */);
```

## Parameters

`function` - A function that will be called once the parameters are gathered through currying.
`arity` - The number of curry functions to create before returning the result of the passed function called with the arguments. Defaults to `function.length`.

## Returns
A series of functions that each take a single argument and apply those arguments to the supplied function once they have all been gathered. Each intermediate function also has a `value` method that may be invoked to apply the currently gathered arguments to the function.

## Use

```javascript
import { curry } from '@ngard/tiny-curry';

function add(a, b) { return a + b; }
// add.length = 2, the number of arguments it expects

const curriedAdd = curry(add);
const addTwo = curriedAdd(2);

console.log(addTwo(5)); // logs '7'
```

```javascript
import { curry } from '@ngard/tiny-curry';

function greet(name, title = 'Your Lordship') {
  return `Good day,  ${name}, ${title}`;
}
// greet.length = 1, because defaulted arguments are not 'expected'

const curriedGreet = curry(greet, 2);
const greetBob = curriedGreet('Bob');

console.log(greetBob('my friend')); // logs 'Good day, Bob, my friend'
console.log(greetBob()); // logs 'Good day, Bob, Your Lordship'
```

```javascript
import { curry } from '@ngard/tiny-curry';

function sum(...numbers) {
  return numbers.reduce((total, number) => total + number);
}
// sum.length = 0, because rest arguments are not 'expected'

const curriedSum = curry(sum, Infinity);

// call `.value()` on an infinitely curried function to call the
// original function with the gathered arguments
const total = curriedSum(1)(2)(3)(4).value();

console.log(total); // logs '10'
```
