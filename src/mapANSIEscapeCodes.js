import ANSIRegexFactory from 'ansi-regex';

let ANSIRegex;

ANSIRegex = ANSIRegexFactory();

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
export default (input) => {
    let match,
        matches,
        offset;

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
