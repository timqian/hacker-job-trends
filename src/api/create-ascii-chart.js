const EOL = require('os').EOL
const asciichart = require('asciichart')

module.exports.createAsciiChart = function (counts) {
  let chart = ''

  try {
    chart = asciichart.plot(counts, { height: 15, padding: ' '.repeat(7) }) + EOL
    chart += ' '.repeat(8) + ':' + EOL
    chart += ' '.repeat(8) + '┼' + '┼──────────┼'.repeat(9) + '┼──' + EOL
    chart += ' '.repeat(7) + '2011-01' +
            ' '.repeat(5) + '2012-01' + ' '.repeat(5) + '2013-01' +
            ' '.repeat(5) + '2014-01' + ' '.repeat(5) + '2015-01' +
            ' '.repeat(5) + '2016-01' + ' '.repeat(5) + '2017-01' +
            ' '.repeat(5) + '2018-01' + ' '.repeat(5) + '2019-01' +
            ' '.repeat(5) + '2020-01' + EOL
  } catch (e) {
    if (e instanceof RangeError) {
      console.log('No results')
    } else {
      console.error(e)
    }
  }

  return chart
}
