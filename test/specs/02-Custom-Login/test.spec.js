var lite_server_process = {};
var original_path = '';

describe('Auth0 Angular2 02-Custom-Login', function() {
    before(function () {
        exec('killall lite-server');
        original_path = pwd();
        cd('./auth0-angularjs2-systemjs-sample/02-Custom-Login');
        replaceInFile(pwd()+'/app/auth.service.ts', 'YOUR_CLIENT_ID', auth0_credentials.client_id);
        replaceInFile(pwd()+'/app/auth.service.ts', 'YOUR_DOMAIN', auth0_credentials.domain);
        replaceInFile(pwd()+'/app/auth.service.ts', 'CALLBACK_URL', auth0_credentials.callback_url);
        if (ls('node_modules').length === 0) exec('npm install');
        exec('npm run tsc');
        lite_server_process = exec('npm run lite -- -c ' + original_path + '/bs-config.js', {async: true});
        console.log('PID: ', lite_server_process.pid);
        sleep.sleep(sleep_seconds);
    });

    it('should have an Auth0.js library available', function () {
        browser.url('/');

        browser.waitForVisible('home');

        const ret = browser.execute(function() {
            return Auth0;
        });

        ret.value.should.exist;

    });

    it ('should show Login fields', function () {
        browser.click("//button[contains(text(), 'Log In')]");
        sleep.sleep(sleep_seconds);
    })

    after(function() {
        if (lite_server_process.kill)
            lite_server_process.kill("SIGINT");

        replaceInFile(pwd()+'/app/auth.service.ts', auth0_credentials.client_id, 'YOUR_CLIENT_ID');
        replaceInFile(pwd()+'/app/auth.service.ts', auth0_credentials.domain, 'YOUR_DOMAIN');
        replaceInFile(pwd()+'/app/auth.service.ts', auth0_credentials.callback_url, 'CALLBACK_URL');
    });

});
