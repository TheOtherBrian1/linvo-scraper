import * as LinvoScraper from 'linvo-scraper';
import * as puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ headless: false });
const page = await browser.newPage();
//provides access to Chrome Dev Protocol API 
const cdp = await page.target().createCDPSession();

// add ghost-cursor for maximum safety
await LinvoScraper.tools.loadCursor(page, true);

// Login with Linkedin
const {token} = await LinvoScraper.services.login.process(page, cdp, {
    user: 'briantgbtheonly@gmail.com',
    password: 'Pickles123!'
})

// Visit profile
const profile = await LinvoScraper.services.visit.process(page, cdp, {
    url: 'https://www.linkedin.com/in/raul-maya-395a9823a/',
    token
});

// Save profile url and profile_id
const {url, linkedin_id} = profile;