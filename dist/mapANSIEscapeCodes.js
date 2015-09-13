'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ansiRegex = require('ansi-regex');

var _ansiRegex2 = _interopRequireDefault(_ansiRegex);

var ANSIRegex = undefined;

ANSIRegex = (0, _ansiRegex2['default'])();

/**
 * @typedef {Object} mapANSIEscapeCodes
 * @property {Numbex} Index of the escape code in the plain string equivalent of the input string.
 * @property {String} ANSI escape code.
 */

/**
 * Produces a list of the escape codes contained in the input string.
 *
 * @param {String} input
 * @return {mapANSIEscapeCodes~code[]}
 */

exports['default'] = function (input) {
    var match = undefined,
        matches = undefined,
        offset = undefined;

    offset = 0;
    matches = [];

    while ((match = ANSIRegex.exec(input)) !== null) {
        matches.push({
            index: match.index - offset,
            code: match[0]
        });

        offset += match[0].length;
    }

    return matches;
};

module.exports = exports['default'];
//# sourceMappingURL=mapANSIEscapeCodes.js.map