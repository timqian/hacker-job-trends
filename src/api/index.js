#!/usr/bin/env node
const asciichart = require('asciichart');
const fs = require('fs');
const path = require('path');
const program = require('commander');
const escapeStringRegexp = require('escape-string-regexp');

program
  .option('-r, --relative', 'Numbers relative to number of posts')
  .parse(process.argv);

const args = program.args;

const matcherArr = [{
    opration: '+',
    keyword: escapeStringRegexp(args[0]), // first arg fill in here
    matchCounts: [], // going to store matchCounts of keyword
}];

if (args.length === 0) {
   throw 'Please provide keyword';
}

if (args.length > 1) {
    for(let i = 1; i < args.length; i += 2) {
        if (args[i+1]) {
            matcherArr.push({
                opration: args[i],
                keyword: escapeStringRegexp(args[i+1]),
            });
        }
    }
}

matcherArr.forEach(matcher => {
    if(matcher.opration !== '+' && matcher.opration !== '-') {
        throw 'opration should be + or -';
    }
});

// console.log('matcherArr', matcherArr);

// "remote - no remote - not remote" blockchain react vue javascript/\sjs\s tenserflow ai node.js nodejs \snode\s typescript
const contentFolder = path.join(__dirname, '../../assets/api');
const contentArr = fs.readdirSync(contentFolder)
    .filter(name => name.indexOf('combined') > -1)
    .map(name => path.join(contentFolder, name))
    .map(path => fs.readFileSync(path, 'utf-8'));

const matcherArrWithCounts = matcherArr.map(matcher => {
    const reg = new RegExp(matcher.keyword, 'gi');
    const matchCounts = contentArr.map(content => (content.match(reg) || []).length);
    matcher.matchCounts = matchCounts;
    return matcher;
});

// console.log(matcherArrWithCounts, 'matcherArrWithCounts');

const reslutCountArr = matcherArrWithCounts[0].matchCounts;

for (let i = 1; i < matcherArrWithCounts.length; i++) {
    const nextMatcher = matcherArrWithCounts[i];
    // console.log(nextMatcher, 'nextMatcher');
    const nextMatchCounts = nextMatcher.matchCounts;
    const nextOpration = nextMatcher.opration;
    for (let j = 0; j < nextMatchCounts.length; j++) {
        if(nextOpration === '+') {
            reslutCountArr[j] += nextMatchCounts[j];
        } else if(nextOpration === '-') {
            reslutCountArr[j] -= nextMatchCounts[j];
        } else {
            throw 'opration should be + or -';
        }
    }
}

if (program.relative) {
  for (let i = 1; i < contentArr.length; i++) {
    let jObj = JSON.parse(contentArr[i]).comments;
      reslutCountArr[i] = (reslutCountArr[i] / jObj.length) * 100;
  }
}

// console.log(reslutCountArr);
try {
    console.log(asciichart.plot(reslutCountArr, { height: 15, padding: ' '.repeat(7) }));
    console.log(' '.repeat(8) + ':');
    console.log(' '.repeat(8) + '┼' + '┼──────────┼'.repeat(8) + '┼──');
    console.log(' '.repeat(7) + '2011-01'
        + ' '.repeat(5) + '2012-01' + ' '.repeat(5) + '2013-01'
        + ' '.repeat(5) + '2014-01' + ' '.repeat(5) + '2015-01'
        + ' '.repeat(5) + '2016-01' + ' '.repeat(5) + '2017-01'
        + ' '.repeat(5) + '2018-01' + ' '.repeat(5) + '2019-01');
} catch (e) {
    if (e instanceof RangeError) {
        console.log('No results');
    } else {
        console.error(e);
    }
}

console.log('\nKeywords:', ...matcherArr.map(matcher => `${matcher.opration} ${matcher.keyword}`));
console.log('Mode:    ', program.relative ? 'relative' : 'absolute');
