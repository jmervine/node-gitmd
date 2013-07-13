var GitMD = require('../../gitmd');
var gdown = new GitMD({
    // required
    user: 'jmervine',
    project: 'node-gitmd'
});

var app = require('express')();

var head = "<html><body>";
var foot = "</body></html>";

app.get(/^(.*)$/, function (req, res) {
    gdown.fetch(req.path, function (mdown) {
        res.send(head+mdown+foot);
    });
});

app.listen(8000);
console.log('starting on 8000');

