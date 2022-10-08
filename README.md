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
- [x] <a href = "./tutorials/login"> Login </a>
- [x] <a href = "./tutorials/scrape_profiles"> Scrape profiles: Sales Nav / Normal </a>
- [x] <a href = "./tutorials/connection_request"> Connection Request </a>
- [x] <a href = "./tutorials/follow_message"> Follow message </a>
- [x] <a href = "./tutorials/endorse_profile"> Endorse Profile </a>
- [x] <a href = "./tutorials/visit_profile"> Visit Profile </a>
- [x] <a href = "./tutorials/like_posts"> Like posts </a>
- [x] <a href = "./tutorials/random_engagement"> Random Engagement </a>

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

## Repository Structure
<ul>
  <li>
    <em>dist</em>: minimized production code
    <ul>
      <li>
        sub-folders
      </li>
    </ul>
  </li>
  <li>
    <em>lib</em>: development code
    <ul>
      <li>
        <em>enums</em>: defines enums
      </li>
      <li>
        <em>helpers</em>: defines helper classes, functions, and variables
      </li>
      <li>
        <em>linkedin</em>: primary services to automate puppeteer
      </li>
    </ul>
    <li>
      linkedin.service.ts: bundles and exports all services as a combined object for use 
    </li>
  </li>
  <li>
    .gitignore: stops git from tracking certain files and directories
  </li>
  <li>
    CODE_OF_CONDUCT.md: defines community rules for contributors
  </li>
  <li>
    LICENSE: terms of service agreement
  </li>
  <li>
    package-lock.json: lists dependencies' dependencies
  </li>
  <li>
    package-lock.json: outlines dependencies and their exact version used for this project
  </li>
  <li>
    package.json: outlines dependencies used in this project
  </li>
  <li>
    README.md: introductory document for curious users
  </li>
  <li>
    tsconfig.json: TypeScript compilation configuration file
  </li>
</ul>

```
LINVO-SCRAPER (project)
│   README.md
│   file001.txt    
│
└───folder1
│   │   file011.txt
│   │   file012.txt
│   │
│   └───subfolder1
│       │   file111.txt
│       │   file112.txt
│       │   ...
│   
└───folder2
    │   file021.txt
    │   file022.txt
```

## 📝 License

This project is [MIT License](https://opensource.org/licenses/MIT) licensed.

***
We accept contribution with great love! Show your interest! Contribute!
