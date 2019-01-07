const ignore = require('ignore');
// .* //everythin
const ig = ignore().add(['*.*','!*.md', '!*/']);

var fs = require('fs');
var path = require('path');
var walk = function (dir, done) {
    var results = [];
    fs.readdir(dir, function (err, list) {
        if (err) return done(err);
        var pending = list.length;
        if (!pending) return done(null, results);
        list.forEach(function (file) {
            if (!ig.ignores(file)) {
                console.log(file);
                

                file = path.resolve(dir, file);

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
