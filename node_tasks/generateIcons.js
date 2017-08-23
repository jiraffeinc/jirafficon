const webfontsGenerator = require('webfonts-generator');
const fs = require('fs')
const _ = require('lodash')

// options
const svgSourcePath = 'fonts/src/svg'

function doGenerate() {
  createSVGFileList(svgSourcePath).then((paths) => {
    generateFont(paths)
  })
  return;
}

function generateFont(paths){
  webfontsGenerator({
    files: paths,
    dest: 'fonts/dest/',
    fontName: 'jirafficon',
    html: true,
    htmlTemplate: 'fonts/src/templates/html.hrb',
    templateOptions: {
      classPrefix: 'jirafficon-',
      baseSelector: '.jirafficon',
    }
  }, (error) => {
    if (error) {
      console.log('Fail!', error)
    } else {
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
doGenerate();
