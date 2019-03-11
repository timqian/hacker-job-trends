#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const escapeStringRegexp = require('escape-string-regexp')

module.exports.readData = function () {
  // "remote - no remote - not remote" blockchain react vue javascript/\sjs\s tenserflow ai node.js nodejs \snode\s typescript
  const contentFolder = path.join(__dirname, '../../assets/api/processed')
  const contentArr = fs.readdirSync(contentFolder)
    .filter(name => name.indexOf('combined') > -1)
    .map(name => {
      const filePath = path.join(contentFolder, name)
      const data = fs.readFileSync(filePath, 'utf-8')
      const dataObj = JSON.parse(data)

      return {
        month: name.split('-combined.json')[0],
        data,
        dataObj
      }
    })

  return contentArr
}

module.exports.prepareData = function (args, contentArr) {
  const matcherArr = [{
    opration: '+',
    keyword: escapeStringRegexp(args[0]), // first arg fill in here
    matchCounts: [] // going to store matchCounts of keyword
  }]

  if (args.length === 0) {
    throw new Error('Please provide keyword')
  }

  if (args.length > 1) {
    for (let i = 1; i < args.length; i += 2) {
      if (args[i + 1]) {
        matcherArr.push({
          opration: args[i],
          keyword: escapeStringRegexp(args[i + 1])
        })
      }
    }
  }

  matcherArr.forEach(matcher => {
    if (matcher.opration !== '+' && matcher.opration !== '-') {
      throw new Error('opration should be + or -')
    }
  })

  // console.log('matcherArr', matcherArr);

  const matcherArrWithCounts = matcherArr.map(matcher => {
    const reg = new RegExp(matcher.keyword, 'gi')
    const matchCounts = contentArr.map(content => (content.data.match(reg) || []).length)
    matcher.matchCounts = matchCounts
    return matcher
  })

  // console.log(matcherArrWithCounts, 'matcherArrWithCounts');

  const resultCountArr = matcherArrWithCounts[0].matchCounts

  for (let i = 1; i < matcherArrWithCounts.length; i++) {
    const nextMatcher = matcherArrWithCounts[i]
    // console.log(nextMatcher, 'nextMatcher');
    const nextMatchCounts = nextMatcher.matchCounts
    const nextOpration = nextMatcher.opration
    for (let j = 0; j < nextMatchCounts.length; j++) {
      if (nextOpration === '+') {
        resultCountArr[j] += nextMatchCounts[j]
      } else if (nextOpration === '-') {
        resultCountArr[j] -= nextMatchCounts[j]
      } else {
        throw new Error('opration should be + or -')
      }
    }
  }

  const output = {
    dateCount: [],
    counts: []
  }

  for (let i = 0; i < contentArr.length; i++) {
    let numberOfComments = contentArr[i].dataObj.comments.length
    resultCountArr[i] = (resultCountArr[i] / numberOfComments) * 100

    output.counts.push(resultCountArr[i])
    output.dateCount.push({ x: `${contentArr[i].month}-01`, y: resultCountArr[i] })
  }

  return output
}
