//zombie testing is mimicking the actions of user through a browser 
//i'm testing 2 cases:
// 1. is page loads successfully
// 2. does page has input fields for username and password

const Browser = require('zombie');

// Start the server
require('../server/server');

describe('User visits home page', function() {
  const browser = new Browser();
  // browser.silent = true;

  before(function(done) {
    browser.visit(`http://localhost:3000/`, done);
  });

  describe('Initial display', () => {
    it('loads successfully', (done) => {
      setTimeout(() => {
        browser.assert.success();
        done();
      }, 1000);
    });

    it('shows login page', () => {
      browser.assert.element('#username');
      browser.assert.element('#password');
    });  
  });
});