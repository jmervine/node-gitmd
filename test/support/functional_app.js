var GitMD = require('../../gitmd');
var gdown = new GitMD({
    // required
    user: 'jmervine',
    project: 'node-gitmd'
});

var app = require('express')();

var head = "<html><body>";
var foot = "</body></html>";

app.get('/pass', function (req, res) {
    gdown.fetch('/README', function (err, mdown, bm) {
        foot += "<!-- benchmark " + bm + " -->";
        if (err) {
            res.send("ERROR: " + error, 500);
        }
        res.send(head+mdown+foot);
    });
});

app.get('/fail', function (req, res) {
    gdown.fetch('/BADFILE', function (err, mdown, bm) {
        foot += "<!-- benchmark " + bm + " -->";
        if (err) {
            res.send("ERROR: " + error, 500);
        }
        res.send(head+mdown+foot);
    });
});

app.listen(8000);
console.log('functional_app.js starting on 8000');
process.send({app:'connect'});

