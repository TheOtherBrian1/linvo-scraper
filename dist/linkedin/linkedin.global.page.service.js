import { LinkedinAbstractService } from "./linkedin.abstract.service";
import { LinkedinSalesPageService } from "./linkedin.sales.page.service";
import { LinkedinPageService } from "./linkedin.page.service";
import { parse, stringify } from "querystring";
const normalPage = new LinkedinPageService();
const salesPage = new LinkedinSalesPageService();
export class LinkedinGlobalPageService extends LinkedinAbstractService {
    async process(page, cdp, data) {
        const load = await this.startProcess(page, cdp, data);
        return Object.assign(Object.assign({}, load), { url: data.url });
    }
    async startProcess(page, cdp, data) {
        const { page: pageNumber, url, remove_overlapping } = data;
        if (pageNumber > 100) {
            return {
                values: [],
                pages: 0,
            };
        }
        const onlyQuery = new URL(url.replace("#", "?"));
        const parseQuery = parse(onlyQuery.search);
        if (url.indexOf("https://linvo-premium-dev-bucket.s3.us-east-2.amazonaws.com") === 0 &&
            parseQuery.run === false) {
            return {
                values: [],
                pages: 0,
            };
        }
        if (url.indexOf("https://linvo-premium-dev-bucket.s3.us-east-2.amazonaws.com") === 0) {
            return {
                values: [],
                pages: 1,
                csv: url,
                remove_overlapping,
            };
        }
        if (pageNumber === 1) {
            delete parseQuery.page;
        }
        else {
            parseQuery.page = pageNumber;
        }
        if (parseQuery === null || parseQuery === void 0 ? void 0 : parseQuery.viewAllFilters) {
            parseQuery === null || parseQuery === void 0 ? void 0 : parseQuery.viewAllFilters = "false";
        }
        const newUrl = stringify(parseQuery, onlyQuery.origin +
            onlyQuery.pathname +
            (url.indexOf("#") > -1 ? "#" : "?"));
        const info = await (url.indexOf("/sales/") > -1
            ? salesPage
            : normalPage).pagesTask(page, newUrl);
        return Object.assign(Object.assign({}, info), { remove_overlapping });
        return Promise.race([
            (url.indexOf("/sales/") > -1 ? salesPage : normalPage).pagesTask(page, newUrl),
            new Promise(async (res) => {
                try {
                    await page.waitForFunction(() => {
                        var _a, _b, _c, _d, _e, _f;
                        return (((_c = (_b = (_a = document === null || document === void 0 ? void 0 : document.body) === null || _a === void 0 ? void 0 : _a.innerText) === null || _b === void 0 ? void 0 : _b.trim()) === null || _c === void 0 ? void 0 : _c.indexOf("No results found")) >
                            -1 ||
                            ((_f = (_e = (_d = document === null || document === void 0 ? void 0 : document.body) === null || _d === void 0 ? void 0 : _d.innerText) === null || _e === void 0 ? void 0 : _e.trim()) === null || _f === void 0 ? void 0 : _f.indexOf("no results containing your search terms were found")) > -1);
                    }, {
                        timeout: 0,
                    });
                    res({
                        values: [],
                        pages: 0,
                    });
                }
                catch (err) {
                    return;
                }
            }),
        ]);
    }
}
//# sourceMappingURL=linkedin.global.page.service.js.map