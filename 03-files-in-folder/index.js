const fs = require("fs")
const path = require("path")

const dirPath = path.join(__dirname, "secret-folder")

fs.readdir(dirPath, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.log(err)
  }
  console.log("\nCurrent directory files:")
  files.forEach((file) => {
    if (!file.isDirectory()) {
      const filePath = path.join(__dirname, file.name)
      const extName = path.extname(filePath).split(".").join("")
      const fileName = path.basename(filePath).split(".")[0]
      console.log(`<${fileName}> <${extName}>`)
    }
  })
})
