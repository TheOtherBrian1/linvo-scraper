import { LinkedinAbstractService } from "./linkedin.abstract.service";
import { timer } from "../helpers/timer";
import { LINKEDIN_ERRORS, LinkedinErrors } from "../enums/linkedin.errors";
export class LinkedinLoginService extends LinkedinAbstractService {
    async process(page, cdp, data) {
        var _a, _b, _c, _d;
        try {
            await page.goto("https://www.linkedin.com/login");
            await page.waitForSelector("#username");
            await timer(4000);
            await ((_a = (await page.$("#username"))) === null || _a === void 0 ? void 0 : _a.type(data.user, { delay: 30 }));
            await timer(500);
            await ((_b = (await page.$("#password"))) === null || _b === void 0 ? void 0 : _b.type(data.password, { delay: 30 }));
            await timer(1000);
            await ((_c = (await page.$("button[type=submit]"))) === null || _c === void 0 ? void 0 : _c.click());
            await timer(3000);
            await page.waitForSelector(".search-global-typeahead__input", {
                timeout: 30000,
            });
            const token = await page.cookies();
            return {
                user: data.user,
                token: (_d = token === null || token === void 0 ? void 0 : token.find((t) => t.name === "li_at")) === null || _d === void 0 ? void 0 : _d.value,
            };
        }
        catch (err) {
            throw new LinkedinErrors("Could not login to linkedin, please update you credentials", '/accounts', {
                values: LINKEDIN_ERRORS.INVALID_CREDENTIALS,
            });
        }
    }
}
//# sourceMappingURL=linkedin.login.service.js.map