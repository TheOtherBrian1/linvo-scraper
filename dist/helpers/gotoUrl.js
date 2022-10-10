export const gotoUrl = async (page, url) => {
    try {
        await page.goto(url, {
            timeout: 0
        });
    }
    catch (err) { }
};
//# sourceMappingURL=gotoUrl.js.map