<p align="center">
  <a href="https://linvo.io">
    <img  alt="logo" src="https://linvo.io/wp-content/uploads/2022/10/linvo-top.png">
  </a>
</p>
<h1 align="center">Welcome to Linvo Linkedin Scraper</h1>
<p align="center">
  <a href="https://opensource.org/licenses/MIT" target="_blank">
    <img alt="License: MIT License" src="https://img.shields.io/badge/License-MIT License-yellow.svg" />
  </a>
</p>

Here you can find tutorials for secure scraping using Puppeteer for different Linkedin actions
- [x] Login
- [x] Scrape profiles: Sales Nav / Normal
- [x] Connection Request
- [x] Follow message
- [x] Endorse Profile
- [x] Visit Profile
- [x] Like posts
- [x] Random Engagement

## Install

```sh
npm install linvo-scraper puppeteer --save
```

## Usage

```javascript
import * as LinvoScraper from 'linvo-scraper';
import * as puppeteer from 'puppeteer';

const browser = await puppeteer.launch();
const page = await browser.newPage();
const cdp = await page.target().createCDPSession();

// add ghost-cursor for maximum safety
await LinvoScraper.tools.loadCursor(page, true);

// Login with Linkedin
const {token} = await LinvoScraper.services.login.process(page, cdp, {
    user: 'bang@linvo.io',
    password: 'superStrongPass!!%'
})

// set cookies
await page.setCookie({
    name: "li_at",
    value: token,
    httpOnly: true,
    secure: true,
    sameSite: "None",
    priority: "Medium",
    path: "/",
    domain: ".www.linkedin.com",
});

await LinvoScraper.services.connect.process(page, cdp, {
    message: 'Hi Nevo! Let\'s connect!',
    url: 'https://www.linkedin.com/in/nevo-david/'
})
```

## Who made this project

This project was made by [Linvo](https://linvo.io) - The Safest Linkedin Automation Tool, and being maintained by [Nevo David](https://github.com/nevo-david)
Any contribution is welcomed!

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/linvo-io/linvo-scraper/issues).

## 📝 License

This project is [MIT License](https://opensource.org/licenses/MIT) licensed.

***
We accept contribution with great love! Show your interest! Contribute!
