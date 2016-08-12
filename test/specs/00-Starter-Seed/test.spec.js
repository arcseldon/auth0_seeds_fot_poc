var sleep = require('sleep');
var lite_server_process = {};

describe('Auth0 Angular2 00-Starter Seed', function() {
    before(function () {
        console.log("PWD: ", pwd());
        cd('./auth0-angularjs2-systemjs-sample/00-Starter-Seed');
        exec('npm run tsc');
        lite_server_process = exec('npm run lite', {async: true});
        console.log('PID: ', lite_server_process.pid);
        sleep.sleep(5);
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
