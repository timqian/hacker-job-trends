const fs = require('fs')
const path = require('path')
const axios = require('axios')

const apiBase = 'https://hacker-news.firebaseio.com/v0/item'

const basePath = path.join(__dirname, '../..')
const pathToDatedLinks = path.join(basePath, '/HN-who-is-hiring-monthly.md')
const pathToRawData = path.join(basePath, 'assets/api', '/raw')
const pathToProcessedData = path.join(basePath, 'assets/api', '/processed')

async function getStoryDataById(storyId) {

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

  return res;
}

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

      const story = await getStoryDataById(storyId)

      const storyFolder = path.join(pathToRawData, `/${story.id}/`)
      if (!fs.existsSync(storyFolder)) {
        fs.mkdirSync(storyFolder)
      }

      const fetchedKids = fs.readdirSync(storyFolder)
      const kidIds = fetchedKids.map(fileName => fileName.split('.json')[0])

      let promises = []
      story.kids.forEach((kid) => {
        let promise;

        if (!kidIds.includes(`${kid}`)) {
          promise = axios.get(`${apiBase}/${kid}.json`).then((response) => {
            fs.writeFileSync(path.join(pathToRawData, `/${storyId}/${kid}.json`), JSON.stringify(response.data))
            return response.data
          })
        } else {
          const data = fs.readFileSync(path.join(pathToRawData, `/${storyId}/${kid}.json`))
          promise = Promise.resolve(JSON.parse(data))
        }

        promises.push( promise )
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
