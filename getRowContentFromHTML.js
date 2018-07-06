const fs = require('fs');
const path = require('path');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const htmlFolder = path.join(__dirname, './assets/htmls');
const contentFolder = path.join(__dirname, './assets/rowContents');


const htmlPaths = fs.readdirSync(htmlFolder)
    .filter(name => name.includes('.html'))
    .map(name => path.join(htmlFolder, name));

const existsContents = fs.readdirSync(contentFolder);

for (const htmlPath of htmlPaths) {
    const destFileName =  path.basename(htmlPath).slice(0, -5) + '.txt';
    if (!existsContents.includes(destFileName)) {
        console.log('dealing with:', htmlPath);

        const html = fs.readFileSync(htmlPath);
        const dom = new JSDOM(html);
        const contentEles = dom.window.document.querySelectorAll('.c00');
        
        let contents = '';
        for (const contentEle of contentEles) {
            contents = contents + contentEle.textContent;
        }

        fs.writeFileSync(path.join(contentFolder, destFileName), contents);

        console.log('done:', htmlPath);
    }
}
