const {SpecReporter} = require('jasmine-spec-reporter');

exports.config = {plugins: [{
    package: 'protractor-screenshoter-plugin',
    screenshotPath: './REPORTS/e2e',
    screenshotOnExpect: 'failure+success',
    screenshotOnSpec: 'none',
    withLogs: true,
    writeReportFreq: 'asap',
    imageToAscii: 'none',
    clearFoldersBeforeTest: true
  }],
    allScriptsTimeout: 300000,
    suites: {
        default: './e2e/test-suites/*.e2e-spec.ts',
                
    },
    capabilities: {
        "browserName": "chrome"
    },
    params: {
        user2: {
            username: "m.ajitabh@gmail.com",
            password: "@@@@@@@@@@@@@#####"
        },
        user1: {
            username: "ajitabh.bmsce@gmail.com",
            password: "@@@@@@@@@@@@@@######",
            subject: "ajitabh protractor",
            message: " this is a protractor test",
            fileName: "ajit.txt"
        }

        
    },
    directConnect: true,
    baseUrl: 'https://mail.google.com/',
    framework: 'jasmine',
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 300000,
        print: function () {
        }
    },
    onPrepare() {
        require('ts-node').register({
            project: 'e2e/tsconfig.e2e.json'
        });
        jasmine.getEnv().addReporter(new SpecReporter({
            spec: {
                displayStacktrace: false
            }
        }));
    }
};