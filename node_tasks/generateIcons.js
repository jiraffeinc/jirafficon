const webfontsGenerator = require('webfonts-generator');
const fs = require('fs')
const _ = require('lodash')
const path = require('path')
// options
const svgSourcePath = 'src/svg'

function doGenerate() {
  createSVGFileList(svgSourcePath).then((paths) => {
    generateFont(paths)
  })
  return;
}

function generateFont(paths){
  webfontsGenerator({
    files: paths,
    dest: path.join('fonts'),
    fontName: 'jirafficon',
    html: true,
    htmlTemplate: 'src/templates/html.hrb',
    htmlDest: path.join('docs', 'index.html'),
    templateOptions: {
      classPrefix: 'jirafficon-',
      baseSelector: '.jirafficon',
    }
  }, (error) => {
    if (error) {
      console.log('Fail!', error)
    } else {
      duplicateScss()
      console.log('Done!')
    }
  })
}

function createSVGFileList(dir){
  return new Promise((resolve, reject) => {
    const svgDir = fs.readdir(dir, (err, files) => {
      if(err){
        return reject(err)
      }
      let result = files.map((path) => {
        if(!/.svg$/.test(path)){
          return
        }
        return `${dir}/${path}`
      })
      result = _.compact(result)
      resolve(result)
    })
  }).catch((err) => {
    console.log(err)
  })
}

function duplicateScss(){
  fs.createReadStream('./fonts/jirafficon.css', 'utf8')
    .pipe(fs.createWriteStream('./fonts/jirafficon.scss', 'utf8'))
}

doGenerate();
