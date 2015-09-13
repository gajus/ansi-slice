"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var trim = undefined;

/**
 * Removes the characters from the string matching rule.
 *
 * @param {String} subject
 * @param {RegExp} rule
 * @return {String}
 */
trim = function (subject, rule) {
    var result = undefined;

    result = subject.replace(rule, "");

    if (result !== subject) {
        return trim(result, rule);
    }

    return result;
};

exports["default"] = trim;
module.exports = exports["default"];
//# sourceMappingURL=trim.js.map