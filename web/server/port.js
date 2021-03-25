// const argv
const config = require('../config');

module.exports = parseInt(config.port || '3000', 10);
// module.exports = parseInt(argv.port || process.env.PORT || '3000', 10);
