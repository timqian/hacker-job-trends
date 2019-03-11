const ejs = require('ejs')
const lib = require('./api/prepare-data')
const createAsciiChart = require('./api/create-ascii-chart').createAsciiChart
const queries = require('./queries').queries

const dataSource = lib.readData()

queries.forEach(function (query) {
  query.rows = lib.prepareData(query.query, dataSource).counts
  query.asciiChart = createAsciiChart(query.rows)
})

ejs.renderFile('./src/templates/readme-charts.ejs', { queries }, {}, (err, str) => {
  // str => Rendered HTML string
  if (err) {
    console.log(err)
  } else {
    console.log(str)
  }
})
