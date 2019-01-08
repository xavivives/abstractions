const MarkdownIt = require('markdown-it');
const ignore = require('ignore');
// .* //everythin
const ig = ignore().add(['node_modules','*.*','!*.md', '!*/']);
const md = new MarkdownIt();

var fs = require('fs');
var path = require('path');
var walk = function (dir, done) {
    var results = [];
    fs.readdir(dir, function (err, list) {
        if (err) return done(err);
        var pending = list.length;
        if (!pending) return done(null, results);
        list.forEach(function (fileName) {
            if (!ig.ignores(fileName)) {
               // console.log(fileName);
                
                let extension =  fileName.split('.').pop();
                if(extension =='md')
                    console.log(fileName)
                else{
                    console.log("folder", fileName)
                }

                let file = path.resolve(dir, fileName);

                fs.stat(file, function (err, stat) {
                    if (stat && stat.isDirectory()) {
                        walk(file, function (err, res) {
                            results = results.concat(res);
                            if (!--pending) done(null, results);
                        });
                    } else {
                        results.push(file);
                        if (!--pending) done(null, results);
                    }
                });

            }


        });
    });
};

var done = function (err, results) {
    console.log(err, results);
}

walk(__dirname, done);
