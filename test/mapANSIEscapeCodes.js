/* eslint-disable max-nested-callbacks */

import {
    expect
} from 'chai';

import chalk from 'chalk';

import mapANSIEscapeCodes from './../src/mapANSIEscapeCodes';

describe(`mapANSIEscapeCodes`, () => {
    context(`string does not have ANSI escape codes`, () => {
        it(`produces an empty array`, () => {
            let ANSIEscapeCodeMap;

            ANSIEscapeCodeMap = mapANSIEscapeCodes(`foo`);

            expect(ANSIEscapeCodeMap).to.deep.equal([]);
        });
    });
    context(`string is using ANSI escape codes`, () => {
        it(`produces an array reflecting the position of the escape code in a plain text version of the string`, () => {
            let ANSIEscapeCodeMap;

            ANSIEscapeCodeMap = mapANSIEscapeCodes(chalk.red(`abcd`) + chalk.blue(`efgh`));

            expect(ANSIEscapeCodeMap).to.deep.equal([
                {
                    index: 0,
                    code: `\u001b[31m`
                },
                {
                    index: 4,
                    code: `\u001b[39m`
                },
                {
                    index: 4,
                    code: `\u001b[34m`
                },
                {
                    index: 8,
                    code: `\u001b[39m`
                }
            ]);
        });
    });
});
