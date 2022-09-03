const express = require('express');

const app = express();

let numsArray = [];

app.get('/mean', function(req, res) {
    numsArray = req.query.nums.split(',');
    let total = 0;
    //very inefficient 
    for (num in numsArray) {
        if (numsArray[0] == '') {
            return res.status(400).json({'operation': 'mean', 'error': `no input`});
        }
        if (!Number(numsArray[num])) {
            return res.status(400).json({'operation': 'mean', 'error': `${numsArray[num]} is not a number`});
        }
        total += Number(numsArray[num]);
    }
    return res.status(200).json({'operation': 'mean', 'value': total / numsArray.length});
});

app.get('/median', function(req, res) {
    numsArray = req.query.nums.split(',');
    //very inefficient 
    for (num in numsArray) {
        if (numsArray[0] == '') {
            return res.status(400).json({'operation': 'mean', 'error': `no input`});
        }
        if (!Number(numsArray[num])) {
            return res.status(400).json({'operation': 'median', 'error': `${numsArray[num]} is not a number`});
        }
    }
    numsArray.sort(function(a, b){return a - b});

    let half = Math.floor(numsArray.length / 2);
    if (numsArray.length % 2) {
        return res.status(200).json({'operation': 'median', 'value': numsArray[half]});
    } else {
        return res.status(200).json({'operation': 'median', 'value': (Number(numsArray[half - 1]) + Number(numsArray[half])) / 2.0});
    }
});

app.get('/mode', function(req, res) {
    numsArray = req.query.nums.split(',');
    //very inefficient 
    for (num in numsArray) {
        if (numsArray[0] == '') {
            return res.status(400).json({'operation': 'mean', 'error': `no input`});
        }
        if (!Number(numsArray[num])) {
            return res.status(400).json({'operation': 'median', 'error': `${numsArray[num]} is not a number`});
        }
    }
    let counts = {}
    numsArray.forEach(function(e) {
        if(counts[e] === undefined) {
            counts[e] = 0
        }
        counts[e] += 1
    })
    let countsArr = Object.values(counts);
    //doesnt account for multiple modes, whatever
    let max = Math.max(...countsArr);
    return res.status(200).json({'operation': 'mode', 'value': getKeyByValue(counts, max)});
});

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

app.listen(3000, function () {
  console.log('App on port 3000');
})