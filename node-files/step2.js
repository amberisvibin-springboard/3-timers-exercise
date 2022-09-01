const fs = require('fs');
const axios = require('axios');

const argv = process.argv;

const arg1 = argv[2]

//stackoverflow to the rescue
const isUrl = string => {
    try { return Boolean(new URL(string)); }
    catch(e){ return false; }
}

function cat(path) {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
          // handle possible error
          console.error(`Error reading ${err.path}:\n  ${err}`);
          // kill the process and tell the shell it errored
          process.exit(1);
        }
        // otherwise success
        console.log(data);
        process.exit(0);
      });
};

function webCat(url) {
    axios.get(url).then(function(resp) {
        console.log(resp.data);
        process.exit(0);
    }).catch(function (err) {
        console.error(`Error fetching ${err.config.url}\n  Request failed with code ${err.code}`);
        process.exit(1);
    });

};

if (isUrl(arg1)) {
    webCat(arg1);
} else {
    cat(arg1);
}