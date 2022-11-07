const fs = require("fs")
const path = require("path")

const stylesDirPath = path.join(__dirname, "styles")

fs.readdir(stylesDirPath, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.log(err)
  }

  files.forEach((file) => {
    let temp = []
    const desPath = path.join(__dirname, "project-dist", "bundle.css")
    const filePath = path.join(__dirname, "styles", file.name)

    fs.truncate(desPath, (err) => {})
    if (path.extname(filePath) == ".css") {
      fs.readFile(filePath, "utf8", function (error, data) {
        if (error) {
          throw error
        }
        temp = temp.concat([...data]).join("")
        fs.appendFile(desPath, temp, function (err) {
          if (err) {
            throw err
          }
        })
      })
    }
  })
})

// let stream = fs.createReadStream(temp)
//         stream.on("data", (data) => {
//           fs.appendFile(desPath, data, (err) => {
//             if (err) {
//               throw err
//             }
//           })
//         })
