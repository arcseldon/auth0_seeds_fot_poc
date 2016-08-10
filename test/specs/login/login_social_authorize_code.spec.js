function doGoogleLogin(googleAccount, password) {
    browser.waitForVisible('input#Email');
    browser.setValue('input#Email', googleAccount);
    browser.click('input#next');
    browser.waitForVisible('input#Passwd');
    browser.setValue('input#Passwd', password);
    browser.click('input#signIn');
}

describe('login_social_authorize_code - GET /authorize', function() {
    
    it('should get the code', function () {
        browser.url('/login/login_social_authorize_code.html');
        browser.click('button.login');

        browser.waitForVisible('div.a0-googleplus');
        browser.click('div.a0-googleplus');

        doGoogleLogin('auth0.apiv2.tests@gmail.com', '87654321!');

        browser.waitForVisible('input.result');

        browser.waitUntil(function() {
            return this.getValue('input.result').then(function(value){
                return value.length > 0;
            });
        });

        browser.getValue('input.result').should.not.be.empty;
    });

});
