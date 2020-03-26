const path = require('path')

module.exports = {
  webpack: {
    alias: {
      sharedStyles: path.resolve(__dirname, './src/styles'),
    },
  },
}
