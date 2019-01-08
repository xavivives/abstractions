const MarkdownIt = require('markdown-it')
const ignore = require('ignore')
// .* //everythin
const ig = ignore().add(['node_modules', '*.*', '!*.md', '!*/'])
const md = new MarkdownIt()

var fs = require('fs')
var path = require('path')
var walk = function (dir, done) {
    var results = []
    fs.readdir(dir, function (err, list) {
        if (err) return done(err)
        var pending = list.length
        if (!pending) return done(null, results)
        list.forEach(function (fileName) {
            if (!ig.ignores(fileName)) {
                // console.log(fileName)

                let extension = fileName.split('.').pop()
                let filePath = path.resolve(dir, fileName)

                if (extension == 'md')
                    console.log(openAndGetFirstH1(filePath))
                else {
                    console.log("folder", fileName)
                }

                fs.stat(filePath, function (err, stat) {
                    if (stat && stat.isDirectory()) {
                        walk(filePath, function (err, res) {
                            results = results.concat(res)
                            if (!--pending) done(null, results)
                        })
                    } else {
                        results.push(filePath)
                        if (!--pending) done(null, results)
                    }
                })

            }


        })
    })
}

const openAndGetFirstH1 = function (markdownPath) {
    let str = fs.readFileSync(markdownPath, 'utf8')
    var result = md.parse(str)

    let nextIsTitle = false

    for (let token of result) {
        if (nextIsTitle)
            return token.content

        if (token.tag === "h1")
            nextIsTitle = true

    }
    return null
}

const done = function (err, results) {
    console.log(err, results)
}

walk(__dirname, done)
