# Mowitnow

  Effective mower controller

  [![Linux Build][build-image]][build-url]
  [![Coverage][coverage-image]][coverage-url]
  [![CodeClimate][codeclimate-image]][codeclimate-url]
  [![Score][score-image]][score-url]
  [![NPM Version][npm-image]][npm-url]

## Installation

```bash
$ npm install mowitnow
```

## Usage

```js
var App = require('mowitnow');
var app = new App({
        configFile : '[config-file-path]'
        debug : true
    });
app.run();
```
## Command Line Interface

The interface for command-line usage is fairly simplistic at this stage, as seen in the following usage section.

#### Usage
 `mowitnow [command] <options>`

Examples:

`> mowitnow run my.cfg`

 **Commands:**

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
[score-image]: https://img.shields.io/scrutinizer/g/huljo/mowitnow.svg?style=flat-square
[score-url]: https://scrutinizer-ci.com/g/Huljo/MowItNow
[build-image]: https://img.shields.io/travis/Huljo/MowItNow.svg?label=build&style=flat-square
[build-url]: https://travis-ci.org/Huljo/MowItNow
[coverage-image]: https://img.shields.io/coveralls/Huljo/MowItNow.svg?style=flat-square
[coverage-url]: https://coveralls.io/github/Huljo/MowItNow
[codeclimate-image]: https://img.shields.io/codeclimate/github/Huljo/MowItNow.svg?style=flat-square
[codeclimate-url]: https://codeclimate.com/github/Huljo/MowItNow
[license-image]: https://img.shields.io/npm/l/mowitnow.svg?style=flat-square
