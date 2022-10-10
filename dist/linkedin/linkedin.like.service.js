import { LinkedinAbstractService } from "./linkedin.abstract.service";
import { createLinkedinLink } from "../helpers/create.linkedin.url";
import { gotoUrl } from "../helpers/gotoUrl";
import { timer } from "../helpers/timer";
export class LinkedinLikeService extends LinkedinAbstractService {
    async process(page, cdp, data) {
        const { url } = data;
        const theUrl = createLinkedinLink(url, true);
        gotoUrl(page, theUrl);
        await this.waitForLoader(page);
        await timer(8000);
        const onlyUrl = await page.evaluate(() => {
            return window.location.href;
        });
        await page.goto("about:blank");
        const newUrl = createLinkedinLink(onlyUrl, false);
        gotoUrl(page, onlyUrl + "/detail/recent-activity/shares/");
        try {
            await this.waitForLoader(page);
            await page.waitForSelector(".social-actions-button", {
                visible: true,
                timeout: 7000,
            });
            const all = await page.evaluate(() => {
                var _a, _b, _c;
                return (_c = (_b = (_a = Array.from(document.querySelectorAll("[data-urn]"))) === null || _a === void 0 ? void 0 : _a.reduce((all, current) => {
                    var _a;
                    return [
                        ...all,
                        (_a = current === null || current === void 0 ? void 0 : current.querySelector(".social-actions-button")) === null || _a === void 0 ? void 0 : _a.getAttribute("id"),
                    ];
                }, [])) === null || _b === void 0 ? void 0 : _b.filter((f) => f)) === null || _c === void 0 ? void 0 : _c.slice(0, 1);
            }, []);
            if (!all.length) {
                return { linkedin_id: createLinkedinLink(newUrl, false), url: theUrl };
            }
            await this.moveAndClick(page, `#${all[0]}`);
            return { linkedin_id: createLinkedinLink(newUrl, false), url: theUrl };
        }
        catch (err) {
            return { linkedin_id: createLinkedinLink(newUrl, false), url: theUrl };
        }
    }
}
//# sourceMappingURL=linkedin.like.service.js.map