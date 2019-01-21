const MarkdownIt = require('markdown-it')
const ignore = require('ignore')
// .* //everythin
const ig = ignore().add(['node_modules', '*.*', '!*.md', '!*/'])
const md = new MarkdownIt()

let fs = require('fs')
let path = require('path')
let walk = function (rootDirectory, currentDirectory, titleTransform, directoryTransform, level, done) {
    level++

    let results = []

    fs.readdir(currentDirectory, function (err, list) {
        if (err)
            return done(err)

        let pending = list.length

        if (!pending)
            return done(null, results)

        list.forEach(function (fileName) {
            if (!ig.ignores(fileName)) {

            
                let filePath = path.resolve(currentDirectory, fileName)
                fs.stat(filePath, function (err, stat) {

                   
                    let relativePath = path.relative(rootDirectory, currentDirectory)
                    
                    if (stat && stat.isDirectory()) {

                        //is directory
                        walk(rootDirectory, filePath, titleTransform, directoryTransform, level, function (err, res) {

                            results = results.concat(res)
                            if (!--pending)
                                done(null, results)
                        })


                    } else {

                        let extension = fileName.split('.').pop()

                        if (extension == 'md') {
                            let titleStr = openAndGetFirstH1(filePath)
                            if (titleStr)
                                results.push(filePath)
                                    //titleTransform(titleStr, fileName, relativePath, level))
                        }

                        results.push(filePath)
                        if (!--pending)
                            done(null, results)
                    }
                })

            }


        })
    })
}

const openAndGetFirstH1 = function (markdownPath) {
    let str = fs.readFileSync(markdownPath, 'utf8')
    let result = md.parse(str)

    let nextIsTitle = false

    for (let token of result) {
        if (nextIsTitle)
            return token.content

        if (token.tag === "h1")
            nextIsTitle = true

    }
    return null
}

const cloneString = function (str) {
    let clone = JSON.parse(JSON.stringify(str));
    console.log(clone, clone, clone)
    return clone
}

const done = function (err, results) {
    console.log("done",results)
}

const transformTitle = function (titleStr, fileName, relativePath, level) {
    let mdToken = "- " + titleStr
    //console.log(mdToken)
    return mdToken
}

const transformDirectory = function (dirName, relativePath, level) {
    let mdToken = '## ' + dirName
    console.log(mdToken)
    return mdToken
}


let rootDirectory = __dirname + "/docs"
walk(rootDirectory, rootDirectory, transformTitle, transformDirectory, 0, done)

