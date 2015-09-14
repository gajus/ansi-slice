/* eslint-disable max-nested-callbacks */

import trim from './../src/trim';

import {
    expect
} from 'chai';

import chalk from 'chalk';

import slice from './../src/slice';

import ANSIRegexFactory from 'ansi-regex';

describe(`slice`, () => {
    let expectEqualTrimRight,
        ANSIRegex;

    before(() => {
        ANSIRegex = ANSIRegexFactory();

        expectEqualTrimRight = (subject, target) => {
            expect(trim(subject, new RegExp(`${ANSIRegex.source}\$`))).to.equal(trim(target, new RegExp(`${ANSIRegex.source}\$`)));
        };
    });

    context(`subject is not a string`, () => {
        it(`throws an error`, () => {
            expect(() => {
                slice();
            }).to.throw(Error, `ansi-slice subject must be a string.`);
        });
    });
    context(`string without ANSI escape codes`, () => {
        let subject;

        beforeEach(() => {
            subject = `abcdef`;
        });

        context(`extracting first 2 charactrs`, () => {
            it(`extracts 2 characters of the string`, () => {
                subject = slice(subject, 0, 2);

                expect(subject).to.equal(`ab`);
            });
        });
        context(`extracting 2 characters starting 2 in from the beginning`, () => {
            it(`extracts 2 characters starting 2 in from the beginning`, () => {
                subject = slice(subject, 2, 4);

                expect(subject).to.equal(`cd`);
            });
        });
    });
    context(`string using a single ANSI escape code (color:red)`, () => {
        let subject;

        beforeEach(() => {
            subject = chalk.red(`abcdef`);
        });

        context(`extracting first 2 charactrs`, () => {
            it(`extracts 2 characters of the string`, () => {
                subject = slice(subject, 0, 2);

                expectEqualTrimRight(subject, chalk.red(`ab`));
            });
        });
        context(`extracting 2 characters starting 2 in from the beginning`, () => {
            it(`extracts 2 characters starting 2 in from the beginning`, () => {
                subject = slice(subject, 2, 4);

                expectEqualTrimRight(subject, chalk.red(`cd`));
            });
        });
    });
    context(`string using multiple ANSI escape codes (color:red and bgColor:blue)`, () => {
        let subject;

        beforeEach(() => {
            subject = chalk.red.bgBlue(`abcd`);
        });

        context(`extracting first 2 charactrs`, () => {
            it(`extracts 2 characters of the string`, () => {
                subject = slice(subject, 0, 2);

                expectEqualTrimRight(subject, chalk.red.bgBlue(`ab`));
            });
        });
    });
    context(`string using two ANSI escape codes (color:red and color:blue)`, () => {
        let subject;

        beforeEach(() => {
            subject = chalk.red(`abc`) + chalk.blue(`def`);
        });

        context(`extracting first 2 charactrs`, () => {
            it(`extracts 2 characters of the string`, () => {
                subject = slice(subject, 0, 2);

                expectEqualTrimRight(subject, chalk.red(`ab`));
            });
        });
        context(`extracting 2 characters starting 2 in from the beginning`, () => {
            it(`extracts 2 characters starting 2 in from the beginning`, () => {
                subject = slice(subject, 2, 4);

                expectEqualTrimRight(subject, chalk.red(`c`) + chalk.blue(`d`));
            });
        });
    });
    xcontext(`string ending with an ANSI escape code`, () => {
        it(`strips the code from the end of the string`, () => {
            expect(slice(`${chalk.styles.red.open}test${chalk.styles.red.open}`)).to.equal(`${chalk.styles.red.open}test\u001b[39m`);
        });
    });
});
