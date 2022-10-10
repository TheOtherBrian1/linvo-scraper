import { LinkedinAbstractService } from "./linkedin.abstract.service";
import { LinkedinMessageService } from "./linkedin.message.service";
import { createLinkedinLink } from "../helpers/create.linkedin.url";
import { gotoUrl } from "../helpers/gotoUrl";
import { timer } from "../helpers/timer";
import { LinkedinErrors } from "../enums/linkedin.errors";
export class LinkedinMessageWithView extends LinkedinAbstractService {
    async process(page, cdp, data) {
        var _a, _b;
        const theUrl = createLinkedinLink(data.url, true);
        gotoUrl(page, theUrl);
        await this.waitForLoader(page);
        await page.waitForSelector(".pv-top-card--list > li, .pv-top-card__photo");
        await timer(3000);
        const info = await this.extractInformation(page);
        const newMessage = await this.generateMessage(data.message, Object.assign({ firstName: info.name, lastName: info.last_name, companyName: info.companyName, profilePicture: info.profilePicture }, data.extra));
        const url = await page.evaluate(() => {
            var _a, _b;
            return (_b = (_a = Array.from(document.body.querySelectorAll("*"))) === null || _a === void 0 ? void 0 : _a.find((p) => { var _a; return ((_a = p === null || p === void 0 ? void 0 : p.getAttribute("href")) === null || _a === void 0 ? void 0 : _a.indexOf("/messaging/thread")) > -1; })) === null || _b === void 0 ? void 0 : _b.getAttribute("href");
        });
        if (!url) {
            throw new LinkedinErrors("You are not connected with the prospect");
        }
        const messageService = new LinkedinMessageService();
        return messageService.process(page, cdp, Object.assign(Object.assign({}, data), { url, info: {
                currentCompanyPicture: info.currentCompanyPicture,
                companyName: info.companyName,
                current_position_title: info.currentTitle,
                location: info.location,
                headline: info.headline,
                current_position_length: info.currentPositionLength,
                name: ((_a = data === null || data === void 0 ? void 0 : data.contact) === null || _a === void 0 ? void 0 : _a.name) || info.name + " " + info.last_name,
                url: theUrl,
            }, name: ((_b = data === null || data === void 0 ? void 0 : data.contact) === null || _b === void 0 ? void 0 : _b.name) || info.name + " " + info.last_name, message: newMessage }));
    }
}
//# sourceMappingURL=linkedin.message.with.view.js.map