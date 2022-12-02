// without this config file webpack watches the ENTIRE node_modules folder...
// and it hit the 65535 file limit on linux...

module.exports = {
  watchOptions: {
    ignored: /node_modules/,
  },
};
