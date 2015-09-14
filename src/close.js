import _ from 'lodash';
import chalk from 'chalk';

let escapeCodes;

escapeCodes = [];

_.forEach(chalk.styles, (style) => {
    escapeCodes.push(style.close);
});

/**
 * @return {String}
 */
export default () => {
    return escapeCodes.join(``);
};
