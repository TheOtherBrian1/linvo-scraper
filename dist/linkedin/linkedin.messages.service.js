import { LinkedinAbstractService } from "./linkedin.abstract.service";
import { LinkedinMessagesFromChat } from "./linkedin.messages.from.chat";
import { gotoUrl } from "../helpers/gotoUrl";
import { timer } from "../helpers/timer";
const messagesFromChat = new LinkedinMessagesFromChat();
export class LinkedinMessagesService extends LinkedinAbstractService {
    async process(page, cdp, data) {
        try {
            for (const messages of data.messages) {
                await page.goto('about:blank');
                gotoUrl(page, messages.link);
                await this.waitForLoader(page);
                try {
                    for (const message of messages.messages) {
                        await timer(5000);
                        await this.moveAndClick(page, '[contenteditable="true"]');
                        await page.keyboard.type(message, {
                            delay: 10,
                        });
                        await page.keyboard.press("Enter");
                        await timer(1000);
                        await page.waitForFunction(() => {
                            return document.querySelector(".msg-form__send-button:not(:disabled), .msg-form__hint-text");
                        });
                        const totalBefore = await page.evaluate(() => {
                            return document.querySelectorAll(".msg-s-message-list__event")
                                .length;
                        });
                        await this.moveAndClick(page, ".msg-form__send-button:not(:disabled), .msg-form__hint-text");
                        await page.waitForFunction((before) => {
                            return (document.querySelectorAll(".msg-s-message-list__event")
                                .length !== before);
                        }, {}, totalBefore);
                    }
                }
                catch (err) {
                }
            }
        }
        catch (err) {
        }
        await page.goto('https://www.linkedin.com/messaging/');
        await timer(4000);
        return messagesFromChat.continueGetAllMessagesFromChat(page);
    }
}
//# sourceMappingURL=linkedin.messages.service.js.map