const fs = require("fs")
const path = require("path")

createDir()

copyDir("./06-build-page/assets", "./06-build-page/project-dist/assets")

relocateStyles()

replacePattern()

function relocateStyles() {
  const stylesDirPath = path.join(__dirname, "styles")

  fs.readdir(stylesDirPath, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.log(err)
    }

    files.forEach((file) => {
      let temp = []
      const desPath = path.join(__dirname, "project-dist", "style.css")
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
}

function createDir() {
  fs.mkdir(path.join(__dirname, "project-dist"), (err) => {
    if (err) {
      return console.error(err)
    }
  })
}

function copyDir(src, dest, callback) {
  const copy = (copySrc, copyDest) => {
    fs.readdir(copySrc, (err, list) => {
      if (err) {
        callback(err)
        return
      }
      list.forEach((item) => {
        const ss = path.resolve(copySrc, item)
        fs.stat(ss, (err, stat) => {
          if (err) {
            callback(err)
          } else {
            const curSrc = path.resolve(copySrc, item)
            const curDest = path.resolve(copyDest, item)

            if (stat.isFile()) {
              fs.createReadStream(curSrc).pipe(fs.createWriteStream(curDest))
            } else if (stat.isDirectory()) {
              fs.mkdir(curDest, { recursive: true }, (err) => {
                if (err) {
                  throw err
                }
              })
              copy(curSrc, curDest)
            }
          }
        })
      })
    })
  }

  fs.access(dest, (err) => {
    if (err) {
      fs.mkdir(dest, (err) => {
        if (err) {
          throw err
        }
      })
    }
    copy(src, dest)
  })
}

function replacePattern() {
  const templatePath = path.join(__dirname, "template.html")
  const pathToHeader = path.join(__dirname, "components", "header.html")
  const pathToFooter = path.join(__dirname, "components", "footer.html")
  const pathToArticle = path.join(__dirname, "components", "articles.html")
  fs.copyFile(templatePath, path.join(__dirname, "project-dist", "index.html"), (err) => {
    if (err) throw err
  })

  const destPath = path.join(__dirname, "project-dist", "index.html")

  // fs.readFile(pathToHeader, "utf-8", function (err, data) {
  //   if (err) {
  //     return console.log(err)
  //   }
  //   data = data.toString()
  //   fs.readFile(destPath, "utf-8", function (err, data1) {
  //     if (err) {
  //       return console.log(err)
  //     }
  //     data1 = data1.toString()
  //     var re = /{{header}}/gi
  //     var formatted = data1.replace(re, data)

  //     fs.writeFile(destPath, formatted, "utf8", function (err) {
  //       if (err) return console.log(err)
  //     })
  //   })
  // })

  fs.readFile(pathToHeader, "utf-8", function (err, data) {
    if (err) {
      return console.log(err)
    }
    data = data.toString()
    fs.readFile(pathToFooter, "utf-8", function (err1, data1) {
      if (err1) {
        return console.log(err)
      }
      data1 = data1.toString()
      fs.readFile(pathToArticle, "utf-8", function (err2, data2) {
        if (err2) {
          return console.log(err)
        }
        data2 = data2.toString()
        fs.readFile(destPath, "utf-8", function (err, total) {
          if (err) {
            return console.log(err)
          }
          total = total.toString()
          var he = /{{header}}/gi
          var fo = /{{footer}}/gi
          var ar = /{{articles}}/gi

          var formatted = total.replace(he, data)
          formatted = formatted.replace(fo, data1)
          formatted = formatted.replace(ar, data2)

          fs.writeFile(destPath, formatted, "utf8", function (err) {
            if (err) return console.log(err)
          })
        })
      })
    })
  })
}
