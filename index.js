const asciichart = require('asciichart');
const fs = require('fs');
const path = require('path');
// "remote - no remote - not remote" blockchain react vue javascript/\sjs\s tenserflow ai node.js nodejs \snode\s typescript
const contentFolder = path.join(__dirname, './assets/rowContents');
const contentArr = fs.readdirSync(contentFolder)
    .map(name => path.join(contentFolder, name))
    .map(path => fs.readFileSync(path, 'utf-8'));

const matchCounts = contentArr
    .map(content => {
        return (content.match(/remote/gi) || []).length - (content.match(/no remote/gi) || []).length - (content.match(/not remote/gi) || []).length
    });


console.log(' '.repeat(28), 'Key words: "remote" - "no remote" - "not remote"');
console.log(asciichart.plot(matchCounts, { height: 15, padding: ' '.repeat(8) }));
console.log(' '.repeat(9) + ':');
console.log(' '.repeat(4) + '0.00 ' + '┼' + '┼──────────┼'.repeat(8) + '┼──');
console.log(' '.repeat(7) + '2011-01'
    + ' '.repeat(5) + '2012-01' + ' '.repeat(5) + '2013-01'
    + ' '.repeat(5) + '2014-01' + ' '.repeat(5) + '2015-01'
    + ' '.repeat(5) + '2016-01' + ' '.repeat(5) + '2017-01'
    + ' '.repeat(5) + '2018-01' + ' '.repeat(5) + '2019-01');
