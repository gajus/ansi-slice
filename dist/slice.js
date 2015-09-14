'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _stripAnsi = require('strip-ansi');

var _stripAnsi2 = _interopRequireDefault(_stripAnsi);

var _spliceString = require('splice-string');

var _spliceString2 = _interopRequireDefault(_spliceString);

var _ansiRegex = require('ansi-regex');

var _ansiRegex2 = _interopRequireDefault(_ansiRegex);

var _mapANSIEscapeCodes = require('./mapANSIEscapeCodes');

var _mapANSIEscapeCodes2 = _interopRequireDefault(_mapANSIEscapeCodes);

var _trim = require('./trim');

var _trim2 = _interopRequireDefault(_trim);

var _close = require('./close');

var _close2 = _interopRequireDefault(_close);

var ANSIRegex = undefined;

ANSIRegex = (0, _ansiRegex2['default'])();

/**
 * @param {String} subject
 * @param {Number} beginSlice The zero-based index at which to begin extraction.
 * @param {Number} endSlice Optional. The zero-based index at which to end extraction.
 * @return {String}
 */

exports['default'] = function (subject, beginSlice, endSlice) {
    if (beginSlice === undefined) beginSlice = 0;

    var ANSIEscapeCodeMap = undefined,
        ReverseANSIEscapeCodeMap = undefined,
        noNegative = undefined,
        offsetSlicedSubjectLength = undefined,
        plainSubject = undefined,
        slicedSubject = undefined,
        mappedEscapeCodes = undefined;

    mappedEscapeCodes = false;

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

        mappedEscapeCodes = true;

        offsetIndex = escapeCode.index - beginSlice;

        if (offsetIndex < 0) {
            // console.log(`offsetIndex`, offsetIndex);

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

    if (mappedEscapeCodes) {
        slicedSubject = (0, _trim2['default'])(slicedSubject, new RegExp(ANSIRegex.source + '$'));
        slicedSubject += (0, _close2['default'])();
        // slicedSubject += `\u001b[39m`;
    }

    return slicedSubject;
};

module.exports = exports['default'];
//# sourceMappingURL=slice.js.map