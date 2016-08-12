var sleep = require('sleep');
var angular_process = {};

describe('Auth0 Angular2 00-Starter Seed', function() {
    before(function () {
        console.log("PWD: ", pwd());
        cd('./auth0-angularjs2-systemjs-sample/00-Starter-Seed');
        angular_process = exec('npm start', {async: true});
        console.log('PID: ', angular_process.pid);
        sleep.sleep(2);
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
        angular_process.kill("SIGINT");
    });

});
