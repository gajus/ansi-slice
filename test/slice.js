/* eslint-disable max-nested-callbacks */

import {
    expect
} from 'chai';

import chalk from 'chalk';

import slice from './../src/slice';

describe(`slice`, () => {
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
    context(`string using a single ANSI escape code (red)`, () => {
        let subject;

        beforeEach(() => {
            subject = chalk.red(`abcdef`);
        });

        context(`extracting first 2 charactrs`, () => {
            it(`extracts 2 characters of the string`, () => {
                subject = slice(subject, 0, 2);

                expect(subject).to.equal(chalk.red(`ab`));
            });
        });
        context(`extracting 2 characters starting 2 in from the beginning`, () => {
            it(`extracts 2 characters starting 2 in from the beginning`, () => {
                subject = slice(subject, 2, 4);

                expect(subject).to.equal(chalk.red(`cd`));
            });
        });
    });
    context(`string using a single two ANSI escape code (red and blue)`, () => {
        let subject;

        beforeEach(() => {
            subject = chalk.red(`abc`) + chalk.blue(`def`);
        });

        context(`extracting first 2 charactrs`, () => {
            it(`extracts 2 characters of the string`, () => {
                subject = slice(subject, 0, 2);

                expect(subject).to.equal(chalk.red(`ab`));
            });
        });
        context(`extracting 2 characters starting 2 in from the beginning`, () => {
            it(`extracts 2 characters starting 2 in from the beginning`, () => {
                subject = slice(subject, 2, 4);

                expect(subject).to.equal(chalk.red(`c`) + chalk.blue(`d`));
            });
        });
    });
});
