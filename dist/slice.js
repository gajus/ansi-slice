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
 * @param {String} subject
 * @param {Number} beginSlice The zero-based index at which to begin extraction.
 * @param {Number} endSlice Optional. The zero-based index at which to end extraction.
 * @return {String}
 */

exports['default'] = function (subject, beginSlice, endSlice) {
    var ANSIEscapeCodeMap = undefined,
        ReverseANSIEscapeCodeMap = undefined,
        lastEscapeCode = undefined,
        noNegative = undefined,
        offsetSlicedSubjectLength = undefined,
        plainSubject = undefined,
        slicedSubject = undefined;

    if (typeof subject !== 'string') {
        throw new Error('ansi-slice subject must be a string.');
    }

    plainSubject = (0, _stripAnsi2['default'])(subject);

    // console.log(`plainSubject`, plainSubject);

    ANSIEscapeCodeMap = (0, _mapANSIEscapeCodes2['default'])(subject);

    // console.log(`ANSIEscapeCodeMap`, ANSIEscapeCodeMap);

    ReverseANSIEscapeCodeMap = ANSIEscapeCodeMap.reverse();

    // console.log(`\nReverseANSIEscapeCodeMap:\n\n`, ReverseANSIEscapeCodeMap, `\n`);

    slicedSubject = plainSubject.slice(beginSlice, endSlice);

    // console.log(`slicedSubject`, slicedSubject);

    offsetSlicedSubjectLength = beginSlice + slicedSubject.length;

    // console.log(`offsetSlicedSubjectLength`, offsetSlicedSubjectLength);

    noNegative = true;

    ReverseANSIEscapeCodeMap.forEach(function (escapeCode) {
        var offsetIndex = undefined;

        if (escapeCode.index > offsetSlicedSubjectLength) {
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

        slicedSubject = (0, _spliceString2['default'])(slicedSubject, offsetIndex, 0, escapeCode.code);
    });

    // This logic is specific to https://github.com/chalk/chalk implementation.
    // `chalk` ends every string with `\u001b[31m`.
    if (lastEscapeCode !== '\u001b[39m' && ReverseANSIEscapeCodeMap.length && ReverseANSIEscapeCodeMap[0].code === '\u001b[39m') {
        slicedSubject += '\u001b[39m';
    }

    return slicedSubject;
};

module.exports = exports['default'];
//# sourceMappingURL=slice.js.map