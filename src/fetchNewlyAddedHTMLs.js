const fs = require('fs');
const path = require('path');
const axios = require('axios');

async function fetchNewlyAddedHTMLs() {
    const htmlFolder = path.join(__dirname, '../assets/htmls');
    const str = fs.readFileSync(path.join(__dirname, '../HN-who-is-hiring-monthly.md'), 'utf-8');
    const linkArr = str.split('\n').map(datedLink => ({
        month: datedLink.split(': ')[0].slice(2),
        link: datedLink.split(': ')[1],
    }));

    const fetchedHTMLs = fs.readdirSync(htmlFolder);
    const monthes = fetchedHTMLs.map(fileName => fileName.slice(0, 7));

    for (const linkObj of linkArr) {
        if (linkObj.month && linkObj.link && !monthes.includes(linkObj.month)) {
            console.log('Fetching jobs of:', linkObj.month);
            const res = await axios.get(linkObj.link);
            fs.writeFileSync(path.join(htmlFolder, `./${linkObj.month}.html`), res.data);
            console.log('Fetching done:', linkObj.month);
        }
    }
}

fetchNewlyAddedHTMLs();
