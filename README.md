# node-gitmd

Get and parse markdown from github.

## Install

> Node: still under development, going to publish an npm once complete and in
> real world use.

    $ npm isntall github jmervine/node-gitmd

## Usage Example

    var GitMD = require('gitmd');
    var gdown = new GitMD({
        // required
        user: 'jmervine',
        project: 'node-gitmd',

        // optional
        ext: 'md',              // default
        protocol: 'https',      // default
        host: 'raw.github.com', // default
        branch: 'master',       // default

        //root: 'content/pages',  // default is ''
    });

    var app     = require('express').express();

    var head = "<html><body>";
    var foot = "</body></html>";

    // Hit 'http://localhost:8000/README' with the
    // above configuration
    app.get(/^(.*)$/, function (req, res) {
        gdown.fetch(req.path, function (err, mdown, bm) {
            foot += "<!-- benchmark " + bm + " -->";
            if (!error) {
                res.send(head+mdown+foot);
            } else {
                res.send("ERROR: " + error, 500);
            }
        });
    });

    app.listen(8000);
    console.log('starting on 8000');

