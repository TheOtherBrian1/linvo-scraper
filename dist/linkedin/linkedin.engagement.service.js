import { LinkedinAbstractService } from "./linkedin.abstract.service";
import { gotoUrl } from "../helpers/gotoUrl";
import { timer } from "../helpers/timer";
import { shuffle } from "lodash";
export class LinkedinEngagementService extends LinkedinAbstractService {
    async process(page, cdp, data) {
        gotoUrl(page, "https://www.linkedin.com/feed/");
        await this.waitForLoader(page);
        await page.mouse.wheel({
            deltaY: 1500,
        });
        await timer(4000);
        await page.waitForFunction(() => {
            return (Array.from(document.querySelectorAll('[type="like-icon"], [type="thumbs-up-outline"]')) || [])
                .map((curr) => {
                var _a;
                return (_a = curr
                    .closest("button:not(.react-button--active)")) === null || _a === void 0 ? void 0 : _a.getAttribute("id");
            })
                .filter((f) => f);
        });
        const ids = await page.evaluate(() => {
            return (Array.from(document.querySelectorAll('[type="like-icon"], [type="thumbs-up-outline"]')) || [])
                .map((curr) => {
                var _a, _b, _c, _d, _e, _f, _g;
                const parent = (_a = curr === null || curr === void 0 ? void 0 : curr.closest("button:not(.react-button--active)")) === null || _a === void 0 ? void 0 : _a.closest(".social-details-social-activity");
                return {
                    like: (_c = (_b = parent
                        .querySelector('[type="thumbs-up-outline"]')) === null || _b === void 0 ? void 0 : _b.closest("button")) === null || _c === void 0 ? void 0 : _c.getAttribute("id"),
                    comment: (_d = parent
                        .querySelector(".comment-button")) === null || _d === void 0 ? void 0 : _d.getAttribute("id"),
                    id: parent === null || parent === void 0 ? void 0 : parent.getAttribute("id"),
                    totalLikes: +(((_g = (_f = (_e = parent === null || parent === void 0 ? void 0 : parent.querySelector(".social-details-social-counts__reactions-count, .social-details-social-counts__social-proof-text")) === null || _e === void 0 ? void 0 : _e.textContent) === null || _f === void 0 ? void 0 : _f.match(/\d/g)) === null || _g === void 0 ? void 0 : _g.join('')) || 0),
                };
            })
                .filter((f) => f.id)
                .slice(0, 4);
        });
        if (!ids.length) {
            return;
        }
        for (const id of ids) {
            try {
                await this.moveMouseAndScroll(page, `#${id.like}`, undefined, false, -700);
                await timer(1000);
                await this.moveAndClick(page, `#${id.like}`);
                await timer(1000);
                if (id.totalLikes > 30) {
                    await this.moveMouseAndScroll(page, `#${id.comment}`, undefined, false, -700);
                    await timer(1000);
                    await this.moveAndClick(page, `#${id.comment}`);
                    await timer(1000);
                    await page.keyboard.type(shuffle([
                        "Thank you for sharing",
                        "Great Share",
                        "Cool",
                        "Thanks for posting 💯🔥",
                        "💯💯",
                        "Great content keep it up 👌🏼",
                        "Great 👍",
                        "Awesome!!",
                    ])[0], { delay: 20 });
                    await timer(1000);
                    await this.moveAndClick(page, ".comments-comment-box__submit-button");
                }
            }
            catch (err) { }
        }
    }
}
//# sourceMappingURL=linkedin.engagement.service.js.map