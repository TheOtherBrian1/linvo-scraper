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
    user: 'Email',
    password: 'Password'
})