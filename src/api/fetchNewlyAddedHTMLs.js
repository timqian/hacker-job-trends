const fs = require('fs')
const path = require('path')
const axios = require('axios')

const apiBase = 'https://hacker-news.firebaseio.com/v0/item'

const basePath = path.join(__dirname, '../..')
const pathToDatedLinks = path.join(basePath, '/HN-who-is-hiring-monthly.md')
const pathToRawData = path.join(basePath, 'assets/api', '/raw')
const pathToProcessedData = path.join(basePath, 'assets/api', '/processed')

async function fetchNewlyAddedHTMLs () {
  const datedLinks = fs.readFileSync(pathToDatedLinks, 'utf-8')

  const linkArr = datedLinks.split('\n').map(datedLink => ({
    month: datedLink.split(': ')[0].slice(2),
    link: datedLink.split(': ')[1]
  }))

  const fetchedStories = fs.readdirSync(pathToProcessedData)
  const storyIds = fetchedStories.map(fileName => fileName.split('-combined.json')[0])

  for (const linkObj of linkArr) {
    if (linkObj.month && linkObj.link && !storyIds.includes(linkObj.month)) {
      const storyId = linkObj.link.substring('https://news.ycombinator.com/item?id='.length)
      console.log('Fetching jobs of:', linkObj.month)

      let res;
      if (fs.existsSync(path.join(pathToRawData, `/${storyId}.json`))) {
        console.log('using cached story');
        res = fs.readFileSync(path.join(pathToRawData, `/${storyId}.json`))
        res = JSON.parse(res)
      } else {
        res = await axios.get(`${apiBase}/${storyId}.json`)
        res = res.data
        fs.writeFileSync(path.join(pathToRawData, `/${storyId}.json`), JSON.stringify(res))
      }

      const storyFolder = path.join(pathToRawData, `/${storyId}/`)
      if (!fs.existsSync(storyFolder)) {
        fs.mkdirSync(storyFolder)
      }

      const fetchedKids = fs.readdirSync(storyFolder)
      const kidIds = fetchedKids.map(fileName => fileName.split('.json')[0])

      let promises = []
      res.kids.forEach((value, idx) => {
        if (!kidIds.includes(`${value}`)) {
          promises.push(
            axios.get(`${apiBase}/${value}.json`).then((response) => {
              fs.writeFileSync(path.join(pathToRawData, `/${storyId}/${value}.json`), JSON.stringify(response.data))
              return response.data
            })
          )
        } else {
          const d = fs.readFileSync(path.join(pathToRawData, `/${storyId}/${value}.json`))
          promises.push(Promise.resolve(JSON.parse(d)))
        }
      })

      let output = { comments: [] }
      await Promise.all(promises).then((result) => {
        result.forEach(comment => {
          output.comments.push(comment)
        })
      })

      fs.writeFileSync(path.join(pathToProcessedData, `/${linkObj.month}-combined.json`), JSON.stringify(output))
      console.log('Fetching done:', linkObj.month)
    }
  }
}

fetchNewlyAddedHTMLs()
