const path = require('path');

module.exports = {

  /**
   * Function to transform assest, e.g images
   *
   * @param {any} src
   * @param {any} filename
   * @param {any} config
   * @param {any} options
   * @returns {void} filename
   */
  process(src, filename, config, options) {
    return `module.exports = ${JSON.stringify(path.basename(filename))};`;
  },
};
