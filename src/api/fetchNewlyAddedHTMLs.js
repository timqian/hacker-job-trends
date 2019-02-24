const fs = require('fs');
const path = require('path');
const axios = require('axios');

const apiBase = "https://hacker-news.firebaseio.com/v0/item";

async function fetchNewlyAddedHTMLs() {
    const baseFolder = path.join(__dirname, '../../assets/api');
    const str = fs.readFileSync(path.join(__dirname, '../../HN-who-is-hiring-monthly.md'), 'utf-8');
    const linkArr = str.split('\n').map(datedLink => ({
        month: datedLink.split(': ')[0].slice(2),
        link: datedLink.split(': ')[1],
    }));

    const fetchedStories = fs.readdirSync(baseFolder);
    const storyIds = fetchedStories.map(fileName => fileName.split('.json')[0]);

    for (const linkObj of linkArr) {
        if (linkObj.month && linkObj.link) {
          const storyId = linkObj.link.substring("https://news.ycombinator.com/item?id=".length);
          console.log('Fetching jobs of:', linkObj.month);

          let res;
          if (!storyIds.includes(storyId)) {
            res = await axios.get(`${apiBase}/${storyId}.json`);
            fs.writeFileSync(path.join(baseFolder, `/${storyId}.json`), JSON.stringify(res.data));
            res = res.data;
          } else {
            console.log("Using cached story");
            res = fs.readFileSync(path.join(baseFolder, `/${storyId}.json`));
            res = JSON.parse(res);
          }

          const storyFolder = path.join(baseFolder, `/${storyId}/`);
          if(!fs.existsSync(storyFolder)) {
            fs.mkdirSync(storyFolder);
          }

          const fetchedKids = fs.readdirSync(storyFolder);
          const kidIds = fetchedKids.map(fileName => fileName.split('.json')[0]);
          
          let promises = [];
          res.kids.forEach((value, idx) => {
            if (!kidIds.includes(`${value}`)) {

              promises.push(
                axios.get(`${apiBase}/${value}.json`).then((response) => {
                  fs.writeFileSync(path.join(baseFolder, `/${storyId}/${value}.json`), JSON.stringify(response.data));
                  return response.data;
                })
              );
            } else {
              const d = fs.readFileSync(path.join(baseFolder, `/${storyId}/${value}.json`));
              promises.push( Promise.resolve( JSON.parse(d) ) );
            }
          });

          let output = { comments: [] };
          await Promise.all(promises).then((comment) => {
            output.comments.push(comment);
          });

          fs.writeFileSync( path.join(baseFolder, `/${linkObj.month}-combined.json`), JSON.stringify(output) );
          console.log('Fetching done:', linkObj.month);
        }
    }
}

fetchNewlyAddedHTMLs();
