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

    it ('should login successfully', function () {
        browser.setValue('div.auth0-lock-input-email input.auth0-lock-input', "auth0.seeds.fot.poc@gmail.com");
        browser.setValue('div.auth0-lock-input-password input.auth0-lock-input', "87654321!");
        browser.click('button.auth0-lock-submit');
        browser.waitForVisible('home');
        browser.waitUntil(function() {
            return this.getText('home h4').then(function(value){
                return value === "You are logged in";
            });
        });
        browser.getText('home h4').should.equal("You are logged in");

    })

    after(function() {
        if (lite_server_process.kill)
            lite_server_process.kill("SIGINT");

        replaceInFile(pwd()+'/app/auth.service.ts', auth0_credentials.client_id, 'YOUR_CLIENT_ID');
        replaceInFile(pwd()+'/app/auth.service.ts', auth0_credentials.domain, 'YOUR_DOMAIN');
    });

});
