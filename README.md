# ansi-slice

[![Travis build status](http://img.shields.io/travis/gajus/ansi-slice/master.svg?style=flat)](https://travis-ci.org/gajus/ansi-slice)
[![NPM version](http://img.shields.io/npm/v/ansi-slice.svg?style=flat)](https://www.npmjs.com/package/ansi-slice)
[![js-canonical-style](https://img.shields.io/badge/code%20style-canonical-brightgreen.svg?style=flat)](https://github.com/gajus/canonical)

Extracts a section of a string containing ANSI escape codes.

```js
import slice from './src/';

let subject;

// A string "foobarbaz", where "foo" is red and "bar" is blue color and "baz" is reseted to the default.
subject = "\u001b[31mfoo\u001b[39m\u001b[34mbar\u001b[39mbaz";

/**
 * @param {String} input
 * @param {Number} beginSlice The zero-based index at which to begin extraction.
 * @param {Number} endSlice Optional. The zero-based index at which to end extraction.
 * @return {String}
 */
subject = slice(subject, 2, -2);

console.log(subject);
// "\u001b[31mo\u001b[39m\u001b[34mbar\u001b[39mb\u001b[39m"
```
