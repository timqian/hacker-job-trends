const ejs = require('ejs')
const lib = require('./api/prepare-data')
const queries = require('./queries').queries

const dataSource = lib.readData()

queries.forEach(function (query) {
  query.rows = lib.prepareData(query.query, dataSource).dateCount
})

ejs.renderFile('./src/templates/index.ejs', { queries }, {}, (err, str) => {
  // str => Rendered HTML string
  if (err) {
    console.log(err)
  } else {
    console.log(str)
  }
})
