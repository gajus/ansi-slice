import stripANSI from 'strip-ansi';
import mapANSIEscapeCodes from './mapANSIEscapeCodes';
import splice from 'splice-string';

/**
 * @param {String} subject
 * @param {Number} beginSlice The zero-based index at which to begin extraction.
 * @param {Number} endSlice Optional. The zero-based index at which to end extraction.
 * @return {String}
 */
export default (subject, beginSlice, endSlice) => {
    let ANSIEscapeCodeMap,
        ReverseANSIEscapeCodeMap,
        lastEscapeCode,
        noNegative,
        offsetSlicedSubjectLength,
        plainSubject,
        slicedSubject;

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

        slicedSubject = splice(slicedSubject, offsetIndex, 0, escapeCode.code);
    });

    // This logic is specific to https://github.com/chalk/chalk implementation.
    // `chalk` ends every string with `\u001b[31m`.
    if (lastEscapeCode !== `\u001b[39m` && ReverseANSIEscapeCodeMap.length && ReverseANSIEscapeCodeMap[0].code === `\u001b[39m`) {
        slicedSubject += `\u001b[39m`;
    }

    return slicedSubject;
};
