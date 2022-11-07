const fs = require("fs")
const Emitter = require("events")
const path = require("path")

const filePath = path.join(__dirname, "text.txt")

let emitter = new Emitter()
let eventName = "Hello"

emitter.on(eventName, function () {
  console.log("Hello! Enter some text(type exit to quit): ")
})
emitter.emit(eventName)

process.stdin.on("data", (data) => {
  data = data.toString()
  if (data.trim() == "exit") {
    process.stdin.destroy()
    console.log("See ya!")
  } else {
    fs.appendFile(filePath, data, (err) => {
      if (err) {
        throw err
      }
    })
  }
})
