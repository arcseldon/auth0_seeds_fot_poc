var lite_server_process = {};
var original_path = '';

describe('Auth0 Angular2 01-Login', function() {
    before(function () {
        original_path = pwd();
        cd('./auth0-angularjs2-systemjs-sample/01-Login');
        replaceInFile(pwd()+'/app/auth.service.ts', 'YOUR_CLIENT_ID', auth0_credentials.client_id);
        replaceInFile(pwd()+'/app/auth.service.ts', 'YOUR_DOMAIN', auth0_credentials.domain);
        if (ls('node_modules').length === 0) exec('npm install');
        exec('npm run tsc');
        lite_server_process = exec('npm run lite -- -c ' + original_path + '/bs-config.js', {async: true});
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

    it ('should show Lock', function () {
        browser.click('button.btn.btn-primary.btn-margin');
        browser.waitForVisible('button.auth0-lock-submit');
    })

    after(function() {
        if (lite_server_process.kill)
            lite_server_process.kill("SIGINT");

        replaceInFile(pwd()+'/app/auth.service.ts', auth0_credentials.client_id, 'YOUR_CLIENT_ID');
        replaceInFile(pwd()+'/app/auth.service.ts', auth0_credentials.domain, 'YOUR_DOMAIN');
    });

});
