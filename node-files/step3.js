const fs = require('fs');
const axios = require('axios');

const argv = process.argv;
let catPath = null;
let outPath = null;

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
        write(data, outPath)
      });
};

function webCat(url) {
    axios.get(url).then(function(resp) {
        write(resp.data, outPath)
    }).catch(function (err) {
        console.error(`Error fetching ${err.config.url} (web):\n  Request failed with code ${err.code}`);
        process.exit(1);
    });

};

function write(data, outPath) {
    //if outputPath null, write to console
    if (outPath) {
        fs.writeFile(outPath, data, "utf8", function(err) {
            if (err) {
                console.error(`Error writing ${err.path}:\n  ${err}`);
                process.exit(1);
            }
            console.log("success");
            process.exit(0);
          });
    } else {
        console.log(data);
    }
}

if (argv[2] == "-o") {
    if (argv[3] && argv[4]) {
        outPath = argv[3];
        catPath = argv[4];
    } else {
        console.error("-o requires a path.");
        process.exit(1);
    }
} else {
    catPath = argv[2];
}

if (isUrl(catPath)) {
    webCat(catPath);
} else {
    cat(catPath);
}