const fs = require("fs")
const path = require("path")

copyDir()

function copyDir() {
  fs.mkdir(path.join(__dirname, "copy_dir"), (err) => {
    if (err) {
      return console.error(err)
    }
  })
  const dirPath = path.join(__dirname, "files")

  fs.readdir(dirPath, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.log(err)
    }
    files.forEach((file) => {
      const filePath = path.join(__dirname, "files", file.name)
      const desPath = path.join(__dirname, "copy_dir", file.name)
      fs.copyFile(filePath, desPath, (err) => {
        if (err) {
          throw err
        }
      })
    })
    console.log("Copied")
  })
}
