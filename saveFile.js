const fs = require('fs');
const contentFilePath = './'

function save(content, filename) {
  const contentString = JSON.stringify(content)
  return fs.writeFileSync(contentFilePath + filename, contentString)
}

function load(filename) {
  const fileBuffer = fs.readFileSync(contentFilePath + filename, 'utf-8')
  const contentJson = JSON.parse(fileBuffer)
  return contentJson
}

module.exports = {
  save,
  load
}