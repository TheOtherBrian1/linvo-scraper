import * as LinvoScraper from 'linvo-scraper';
import * as puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ headless: false });
const page = await browser.newPage();
//provides access to Chrome Dev Protocol API 
const cdp = await page.target().createCDPSession();

// add ghost-cursor for maximum safety
await LinvoScraper.tools.loadCursor(page, true);

// retrieve token
const user_credentials = await LinvoScraper.services.login.process(page, cdp, {
    user: 'briantgbtheonly@gmail.com',
    password: 'Pickles123!'
});

const page_to_scrape = {
    pageNumber: 1,
    url: 'https://www.linkedin.com/in/raul-maya-395a9823a/',
    remove_overlapping: true
};

const combinedData = {...user_credentials, ...page_to_scrape};

// Login with Linkedin
const {pages, remove_overlapping, pageConnections, csv} = await LinvoScraper.services.scraper.process(page, cdp, combinedData);

console.log(pages, remove_overlapping, pageConnections, csv);



/*

// process: (page: Page, cdp: CDPSession, data: CombinedData<T>)

//Combined Data
interface Data {
    token: string;
    account: string;
}
export type CombinedData<T> = Data & T;


//returns an object with the following properties
pages: number;
remove_overlapping?: boolean;
values: PageConnections[];
csv?: string;

*/