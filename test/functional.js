var http = require('http');
var fork = require('child_process').fork;
var server;
var expected = 2;
var ran = 0;
var stat = [];

server = fork('./test/support/functional_app');

server.on('message', function () {
    var data;
    console.log(" ");
    console.log("200 condition");
    console.log("loading: http://localhost:8000/README");
    console.log("   from: http://raw.github.com/jmervine/node-gitmd/master/README.md");
    console.log(" ");
    http.get("http://localhost:8000/README", function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on('error', function (error) {
            stat.push(error);
        });
        res.on('end', function () {
            if (data.indexOf("<h1>node-gitmd</h1>") !== -1) {
                stat.push(true);
            } else {
                stat.push("<h1>node-gitmd</h1> not found");
            }
            ran++;
            if (ran >= expected) {
                finish();
            }
        });
    });

    console.log(" ");
    console.log("404 condition");
    console.log("loading: http://localhost:8000/FILE_THAT_DOES_NOT_EXIST");
    console.log("   from: http://raw.github.com/jmervine/node-gitmd/master/FILE_THAT_DOES_NOT_EXIST.md");
    console.log(" ");
    http.get("http://localhost:8000/FILE_THAT_DOES_NOT_EXIST", function (res) {
        res.on('data', function (chunk) {
            if (res.statusCode === 404) {
                stat.push(true);
            } else {
                stat.push(("expected 404, but got" + res.statusCode));
            }
        });
        res.on('error', function (error) {
            //stat.push(error);
        });
        res.on('end', function () {
            ran++;
            if (ran >= expected) {
                finish();
            }
        });
    });
});

server.on('error', function (error) {
    console.error(error);
    fail();
});

process.on('exit', function () {
    try { server.kill(); } catch (e) {}
});

function finish () {
    try { server.kill(); } catch (e) {}
    if (stat.length !== expected) { fail(); }
    var success = false;
    for (var i = 0; i < expected; i++) {
        success = (stat[i] === true);
    }
    if (success){
        pass();
    } else {
        fail();
    }
}

function pass() {
    console.log("load successful");
    process.exit(0);
}

function fail() {
    console.error("load failed");
    process.exit(1);
}

setTimeout( function () {
    try { server.kill(); } catch (e) {}
    console.log("times up!");
    finish();
}, 4000);

