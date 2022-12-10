const path = require('path');
module.exports = path.dirname(require.main.filename);
/**
 * ? Here we are exporting a variable which will always indicate main path of our project (where index.js declared)
*/