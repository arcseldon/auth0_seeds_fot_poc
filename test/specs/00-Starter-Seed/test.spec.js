var sleep = require('sleep');
var lite_server_process = {};

describe('Auth0 Angular2 00-Starter Seed', function() {
    before(function () {
        cd('./auth0-angularjs2-systemjs-sample/00-Starter-Seed');
        if (ls('node_modules').length === 0) exec('npm install');
        exec('npm run tsc');
        lite_server_process = exec('npm run lite-server', {async: true});
        console.log('PID: ', lite_server_process.pid);
        sleep.sleep(sleep_seconds);
    });

    it('should have an Auth0Lock library available', function () {
        browser.url('/');

        browser.waitForVisible('home');

        const ret = browser.execute(function() {
            return Auth0Lock;
        });

        ret.value.should.exist;

    });

    after(function() {
        lite_server_process.kill("SIGINT");
    });

});
