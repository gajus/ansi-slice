let trim;

/**
 * Removes the characters from the string matching rule.
 *
 * @param {String} subject
 * @param {RegExp} rule
 * @return {String}
 */
trim = (subject, rule) => {
    let result;

    result = subject.replace(rule, ``);

    if (result !== subject) {
        return trim(result, rule);
    }

    return result;
};

export default trim;
