/** Command-line tool to generate Markov text. */

const fs = require('fs');
const axios = require('axios');
const MarkovMachine = require('./markov.js')

const argv = process.argv;
let catPath = null;

//stackoverflow to the rescue
const isUrl = string => {
    try { return Boolean(new URL(string)); }
    catch(e){ return false; }
}

function cat(path) {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
          // handle possible error
          console.error(`Error reading ${err.path} (file):\n  ${err}`);
          // kill the process and tell the shell it errored
          process.exit(1);
        }
        // otherwise success
        write(data)
      });
};

function webCat(url) {
    axios.get(url).then(function(resp) {
        write(resp.data)
    }).catch(function (err) {
        console.error(`Error fetching ${err.config.url} (web):\n  Request failed with code ${err.code}`);
        process.exit(1);
    });

};

function write(data) {
    let mm = new MarkovMachine(data);
    console.log(mm.makeText())
}

catPath = argv[2];


if (isUrl(catPath)) {
    webCat(catPath);
} else {
    cat(catPath);
}