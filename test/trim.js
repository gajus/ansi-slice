/* eslint-disable max-nested-callbacks */

import {
    expect
} from 'chai';

import trim from './../src/trim';

describe(`trim`, () => {
    it(`removes characters matching the regex pattern`, () => {
        expect(trim(`abc123`, /[0-9]$/g)).to.equal(`abc`);
    });
});
