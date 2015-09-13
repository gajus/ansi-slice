'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _stripAnsi = require('strip-ansi');

var _stripAnsi2 = _interopRequireDefault(_stripAnsi);

var _mapANSIEscapeCodes = require('./mapANSIEscapeCodes');

var _mapANSIEscapeCodes2 = _interopRequireDefault(_mapANSIEscapeCodes);

var _spliceString = require('splice-string');

var _spliceString2 = _interopRequireDefault(_spliceString);

/**
 * @param {String} input
 * @param {Number} beginSlice The zero-based index at which to begin extraction.
 * @param {Number} endSlice Optional. The zero-based index at which to end extraction.
 * @return {String}
 */

exports['default'] = function (input, beginSlice, endSlice) {
    var ANSIEscapeCodeMap = undefined,
        ReverseANSIEscapeCodeMap = undefined,
        lastEscapeCode = undefined,
        noNegative = undefined,
        offsetSlicedInputLength = undefined,
        plainInput = undefined,
        slicedInput = undefined;

    plainInput = (0, _stripAnsi2['default'])(input);

    // console.log(`plainInput`, plainInput);

    ANSIEscapeCodeMap = (0, _mapANSIEscapeCodes2['default'])(input);

    // console.log(`ANSIEscapeCodeMap`, ANSIEscapeCodeMap);

    ReverseANSIEscapeCodeMap = ANSIEscapeCodeMap.reverse();

    // console.log(`\nReverseANSIEscapeCodeMap:\n\n`, ReverseANSIEscapeCodeMap, `\n`);

    slicedInput = plainInput.slice(beginSlice, endSlice);

    // console.log(`slicedInput`, slicedInput);

    offsetSlicedInputLength = beginSlice + slicedInput.length;

    // console.log(`slicedInputLength`, offsetSlicedInputLength);

    noNegative = true;

    ReverseANSIEscapeCodeMap.forEach(function (escapeCode) {
        var offsetIndex = undefined;

        if (escapeCode.index > offsetSlicedInputLength) {
            return;
        }

        offsetIndex = escapeCode.index - beginSlice;

        if (offsetIndex <= 0) {
            if (!noNegative) {
                return;
            }

            noNegative = false;

            offsetIndex = 0;
        }

        /* escapeCode.code = escapeCode.code
            .replace("\u001b[34m", '{blue}')
            .replace("\u001b[39m", '{reset}')
            .replace("\u001b[31m", '{red}'); */

        // console.log(`escapeCode`, JSON.stringify(escapeCode));

        slicedInput = (0, _spliceString2['default'])(slicedInput, offsetIndex, 0, escapeCode.code);
    });

    // This logic is specific to https://github.com/chalk/chalk implementation.
    // `chalk` ends every string with `\u001b[31m`.
    if (lastEscapeCode !== '\u001b[39m' && ReverseANSIEscapeCodeMap.length && ReverseANSIEscapeCodeMap[0].code === '\u001b[39m') {
        slicedInput += '\u001b[39m';
    }

    return slicedInput;
};

module.exports = exports['default'];
//# sourceMappingURL=slice.js.map