import stripANSI from 'strip-ansi';
import mapANSIEscapeCodes from './mapANSIEscapeCodes';
import splice from 'splice-string';

/**
 * @param {String} input
 * @param {Number} beginSlice The zero-based index at which to begin extraction.
 * @param {Number} endSlice Optional. The zero-based index at which to end extraction.
 * @return {String}
 */
export default (input, beginSlice, endSlice) => {
    let ANSIEscapeCodeMap,
        ReverseANSIEscapeCodeMap,
        lastEscapeCode,
        noNegative,
        offsetSlicedInputLength,
        plainInput,
        slicedInput;

    plainInput = stripANSI(input);

    // console.log(`plainInput`, plainInput);

    ANSIEscapeCodeMap = mapANSIEscapeCodes(input);

    // console.log(`ANSIEscapeCodeMap`, ANSIEscapeCodeMap);

    ReverseANSIEscapeCodeMap = ANSIEscapeCodeMap.reverse();

    // console.log(`\nReverseANSIEscapeCodeMap:\n\n`, ReverseANSIEscapeCodeMap, `\n`);

    slicedInput = plainInput.slice(beginSlice, endSlice);

    // console.log(`slicedInput`, slicedInput);

    offsetSlicedInputLength = beginSlice + slicedInput.length;

    // console.log(`slicedInputLength`, offsetSlicedInputLength);

    noNegative = true;

    ReverseANSIEscapeCodeMap.forEach((escapeCode) => {
        let offsetIndex;

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

        slicedInput = splice(slicedInput, offsetIndex, 0, escapeCode.code);
    });

    // This logic is specific to https://github.com/chalk/chalk implementation.
    // `chalk` ends every string with `\u001b[31m`.
    if (lastEscapeCode !== `\u001b[39m` && ReverseANSIEscapeCodeMap.length && ReverseANSIEscapeCodeMap[0].code === `\u001b[39m`) {
        slicedInput += `\u001b[39m`;
    }

    return slicedInput;
};
