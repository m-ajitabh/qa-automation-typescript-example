import {LoginPage} from '../page-objects/pages/login/login.po';
import {LoginPageHelper} from '../page-objects/pages/login/login-page.helper';
import {browser, By, element, ExpectedConditions} from 'protractor';

describe('G mail suite', () => {
    let loginPageHelper: LoginPageHelper;

    beforeEach(() => {
        browser.restart();
        loginPageHelper = new LoginPageHelper();
    });

    afterEach(()=> {
       
    });
    // tslint:disable-next-line:no-trailing-whitespace
    
    it('Send email from user one', async () => {

        var path = require('path');
        const user1 = browser.params.user1;
       // tslint:disable-next-line:no-trailing-whitespace
       
       // const user2 = browser.param.user2;
        await loginPageHelper.goToPage();
        await LoginPage.username.sendKeys(user1.username);

        await element(By.id('identifierNext')).click();
        await browser.wait(ExpectedConditions.visibilityOf(LoginPage.password));

        await LoginPage.password.sendKeys(user1.password);

        await browser.sleep(5000);
        await LoginPage.passwordNextButton.click();
        await browser.wait(ExpectedConditions.visibilityOf(element(By.xpath(`//*[contains(text(),'Compose') and @role='button']`))));
        await browser.sleep(5000);
        await element(By.xpath(`//*[contains(text(),'Compose') and @role='button']`)).click();

        await browser.sleep(15000);
        await element(By.css('[name="to"]')).clear();
        await element(By.css('[name="to"]')).sendKeys('m.ajitabh@gmail.com');

        await element(By.xpath('//*[@placeholder=\'Subject\']')).sendKeys(user1.subject);

        //await element(By.xpath("//*[@data-tooltip='Attach files']")).click();

        var fileToUpload = '../../ajit.txt',
       absolutePath = path.resolve(__dirname, fileToUpload);

        console.log(absolutePath);
         element(By.css('input[type="file"]')).sendKeys(absolutePath);    
        //element(By.xpath('//input[@name="Filedata"]')).sendKeys(absolutePath);


        await element(By.xpath('//*[@role=\'textbox\' and @aria-label=\'Message Body\']')).sendKeys(user1.message);

        await loginPageHelper.click(element(By.xpath('//*[@role="button" and text()="Send"]')));

        await browser.sleep(5000);
       //signout

        // await element(By.css(".gb_db.gbii")).click();

        // await element(By.css("#gb_71")).click();


        await browser.sleep(15000);
    });
    

    it('Verify email from user two', async () => {

        await loginPageHelper.goToPage();

       

        //var path = require('path');
        const user1 = browser.params.user1;
        const user2 = browser.params.user2;

       // const user2 = browser.param.user2;
        //await loginPageHelper.goToPage();
        await LoginPage.username.sendKeys(user2.username);

        await element(By.id('identifierNext')).click();
        await browser.wait(ExpectedConditions.visibilityOf(LoginPage.password));

        await LoginPage.password.sendKeys(user2.password);

        await browser.sleep(5000);
        await LoginPage.passwordNextButton.click();
        await browser.wait(ExpectedConditions.visibilityOf(element(By.xpath(`//*[contains(text(),'Compose') and @role='button']`))));
        await element(By.xpath("//*[@aria-label='Search mail']")).sendKeys(user1.subject);
        await element(By.xpath("//*[@id='aso_search_form_anchor']/button[4]")).click();
        // tslint:disable-next-line:prefer-const
        var eleVar = "//span[contains(text(), '"+user1.subject+"')]";
        var list = element.all(By.xpath(eleVar));
        await list.get(1).click();

        await element(By.css('.hP')).getText().then(function(text){
            expect(text).toEqual(user1.subject);
        });
        
         var fileArea = element(By.css(".aYy"));
        browser.actions().mouseMove(fileArea).perform();

        await element(By.css('.aV3.zzV0ie')).getText().then(function(text){
            expect(text).toEqual(user1.fileName);
        });

        await element(By.css('.ii.gt.adO')).getText().then(function(text){
            expect(text).toEqual(user1.message);
        });

        await browser.sleep(15000);
    });

});
