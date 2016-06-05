# Mowitnow

  Effective mower controller

  [![Linux Build][build-image]][build-url]
  [![Corveralls][coveralls-image]][coveralls-url]
  [![NPM Version][npm-image]][npm-url]

## Installation

```bash
$ npm install mowitnow
```

## Usage

```js
var App = require('mowitnow')
var app = new App({
        configFile : '[config-file-path]'
    });
app.run();
```
## Command Line Interface

The interface for command-line usage is fairly simplistic at this stage, as seen in the following usage section.

### Usage
 `mowitnow [command] <options>`

Examples:

`> mowitnow run my.cfg`

 **Options:**

```bash
    run                      Run instructions from the given config file and return the final positions of mowers
    help                     Print usage info
```

## Tests

  To run the test suite, first install the dependencies, then run `npm test`:

```bash
$ npm install
$ npm test
```

## License

  ![License][license-image]

[npm-image]: https://img.shields.io/npm/v/mowitnow.svg?style=flat-square
[npm-url]: https://npmjs.org/package/mowitnow
[coveralls-image]: https://img.shields.io/scrutinizer/g/huljo/mowitnow.svg?style=flat-square&label=score
[coveralls-url]: https://scrutinizer-ci.com/g/Huljo/MowItNow
[build-image]: https://img.shields.io/travis/Huljo/MowItNow.svg?label=build&style=flat-square
[build-url]: https://travis-ci.org/Huljo/MowItNow
[license-image]: https://img.shields.io/npm/l/mowitnow.svg?style=flat-square