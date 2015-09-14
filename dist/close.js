'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var escapeCodes = undefined;

escapeCodes = [];

_lodash2['default'].forEach(_chalk2['default'].styles, function (style) {
    escapeCodes.push(style.close);
});

/**
 * @return {String}
 */

exports['default'] = function () {
    return escapeCodes.join('');
};

module.exports = exports['default'];
//# sourceMappingURL=close.js.map