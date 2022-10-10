import { LinkedinAbstractService } from './linkedin.abstract.service';
import { gotoUrl } from "../helpers/gotoUrl";
import { timer } from "../helpers/timer";
import { createLinkedinLink } from "../helpers/create.linkedin.url";
export class LinkedinVisitService extends LinkedinAbstractService {
    async process(page, cdp, data) {
        const { url } = data;
        const theUrl = url.indexOf("linkedin.com") !== -1
            ? url
            : `https://www.linkedin.com${data.url}`;
        gotoUrl(page, theUrl);
        await this.waitForLoader(page);
        await page.waitForSelector(".pv-top-card--list > li, .pv-top-card__photo");
        await timer(3000);
        const newUrl = await page.evaluate(() => {
            return window.location.href;
        });
        return { url: theUrl, linkedin_id: createLinkedinLink(newUrl, false) };
    }
}
//# sourceMappingURL=linkedin.visit.service.js.map