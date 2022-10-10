import emojiStrip from 'emoji-strip';
export class MessagesService {
    static _replace(content, name, value) {
        if (content.indexOf('{{') === -1) {
            return content;
        }
        const reg = new RegExp(`\{\{${name}\}\}`, 'g');
        return content.replace(reg, value);
    }
    async messagesList(prospectName, page) {
        await page.waitForSelector('.message-overlay__conversation article');
        return page.evaluate((fullName) => {
            return [
                ...Array.from(document.querySelectorAll('.message-overlay__conversation article')),
            ].map((current) => {
                var _a, _b, _c, _d;
                return ({
                    from: ((_b = (_a = current
                        .querySelector('address')) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim().indexOf(fullName)) > -1
                        ? 'Prospect'
                        : 'Me',
                    message: (_d = (_c = current.lastElementChild) === null || _c === void 0 ? void 0 : _c.textContent) === null || _d === void 0 ? void 0 : _d.trim(),
                });
            });
        }, prospectName);
    }
    async createMessage(message, params) {
        for (let param of params) {
            message = MessagesService._replace(message, param.label, emojiStrip(param.value || ''));
        }
        return message.trim();
    }
}
//# sourceMappingURL=messages.service.js.map