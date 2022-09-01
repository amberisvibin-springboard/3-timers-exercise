const fs = require('fs');

const argv = process.argv;

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
}

cat(argv[2]);