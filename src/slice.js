import stripANSI from 'strip-ansi';
import splice from 'splice-string';
import ANSIRegexFactory from 'ansi-regex';
import mapANSIEscapeCodes from './mapANSIEscapeCodes';
import trim from './trim';
import close from './close';

let ANSIRegex;

ANSIRegex = ANSIRegexFactory();

/**
 * @param {String} subject
 * @param {Number} beginSlice The zero-based index at which to begin extraction.
 * @param {Number} endSlice Optional. The zero-based index at which to end extraction.
 * @return {String}
 */
export default (subject, beginSlice = 0, endSlice) => {
    let ANSIEscapeCodeMap,
        ReverseANSIEscapeCodeMap,
        noNegative,
        offsetSlicedSubjectLength,
        plainSubject,
        slicedSubject,
        mappedEscapeCodes;

    mappedEscapeCodes = false;

    if (typeof subject !== `string`) {
        throw new Error(`ansi-slice subject must be a string.`);
    }

    plainSubject = stripANSI(subject);

    // console.log(`plainSubject`, plainSubject);

    ANSIEscapeCodeMap = mapANSIEscapeCodes(subject);

    // console.log(`ANSIEscapeCodeMap`, ANSIEscapeCodeMap);

    ReverseANSIEscapeCodeMap = ANSIEscapeCodeMap.reverse();

    // console.log(`\nReverseANSIEscapeCodeMap:\n\n`, ReverseANSIEscapeCodeMap, `\n`);

    slicedSubject = plainSubject.slice(beginSlice, endSlice);

    // console.log(`slicedSubject`, slicedSubject);

    offsetSlicedSubjectLength = beginSlice + slicedSubject.length;

    // console.log(`offsetSlicedSubjectLength`, offsetSlicedSubjectLength);

    noNegative = true;

    ReverseANSIEscapeCodeMap.forEach((escapeCode) => {
        let offsetIndex;

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

        slicedSubject = splice(slicedSubject, offsetIndex, 0, escapeCode.code);
    });

    if (mappedEscapeCodes) {
        slicedSubject = trim(slicedSubject, new RegExp(`${ANSIRegex.source}\$`));
        slicedSubject += close();
        // slicedSubject += `\u001b[39m`;
    }

    return slicedSubject;
};
