var fork = require('child_process').fork;
var server;

var config = {
    min: {
        user: 'foouser',
        project: 'fooproject'
    },
    max: {
        host: 'foo.com',
        user: 'foouser',
        project: 'fooproject',
        protocol: 'http',
        branch: 'foobranch',
        root: 'fooroot',
        ext: 'fooext'
    },
    std: {
        user: 'foouser',
        project: 'fooproject',
        ext: 'fooext'
    },
    stub: {
        user: 'foo',
        project: 'bar',
        protocol: 'http'
    }
};

var path = '/foo/path';

var GitMD = require('gitmd');
var gmd;

module.exports = {
    setUp: function (cb) {
        gmd = new GitMD(config.std);
        cb();
    },

    tearDown: function (cb) {
        gmd = undefined;
        try { server.kill(); } catch (e) {}
        cb();
    },

    'new GitMD(config)': function (test) {
        test.expect(12);
        // std config
        test.equal("foouser", gmd.user);
        test.equal("fooproject", gmd.project);
        test.equal("fooext", gmd.ext);

        // max config
        gmd = new GitMD(config.max);
        test.equal("foo.com", gmd.host);
        test.equal("foobranch", gmd.branch);
        test.equal("fooroot", gmd.root);
        test.equal("http", gmd.protocol);

        // min
        gmd = new GitMD(config.min);
        test.equal("raw.github.com", gmd.host);
        test.equal("https", gmd.protocol);
        test.equal("master", gmd.branch);
        test.equal("", gmd.root);
        test.equal("md", gmd.ext);

        // done
        test.done();
    },

    '#gitpath()': function (test) {
        test.expect(1);
        test.equal(
            "https://raw.github.com/foouser/fooproject/master//foo/path.fooext",
            gmd.gitpath(path)
        );
        test.done();
    },

    '#fetch(path, callback)': function (test) {
        test.expect(2);

        // stub gitpath
        GitMD.prototype.gitpath = function () {
            return "http://localhost:8000";
        };

        gmd = new GitMD(config.stub);

        // stub server
        server = fork('./test/support/app');

        server.on('message', function () {
            gmd.fetch(path, function (res) {
                test.ok(res);
                test.ok(res.indexOf('<h1>Hello Test!</h1>') !== -1);
                try { server.kill(); } catch (e) {}
                test.done();
            });
        });

        server.on('error', function () {
            try { server.kill(); } catch (e) {}
        });

    }
};

process.on('exit', function () {
    try { server.kill(); } catch (e) {}
});
