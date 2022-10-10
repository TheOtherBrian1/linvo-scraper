import { LinkedinAbstractService } from './linkedin.abstract.service';
import { createLinkedinLink } from "../helpers/create.linkedin.url";
import { gotoUrl } from "../helpers/gotoUrl";
import { timer } from "../helpers/timer";
export class LinkedinEmailService extends LinkedinAbstractService {
    async process(page, cdp, data) {
        const { url } = data;
        const theUrl = createLinkedinLink(url, true);
        try {
            gotoUrl(page, theUrl);
            await this.waitForLoader(page);
            await timer(3000);
            const newUrl = await page.evaluate(() => {
                return window.location.href;
            });
            await page.evaluate(() => {
                history.pushState({}, '', window.location.href + 'overlay/contact-info/');
                history.pushState({}, '', window.location.href + 'overlay/contact-info/');
                history.back();
            });
            return Object.assign(Object.assign({}, await this.extractEmail(page)), { url: theUrl, linkedin_id: createLinkedinLink(newUrl, false) });
        }
        catch (err) {
            const newUrl = await page.evaluate(() => {
                return window.location.href;
            });
            return { url: theUrl, linkedin_id: createLinkedinLink(newUrl, false) };
        }
    }
}
//# sourceMappingURL=linkedin.email.service.js.map