export var LINKEDIN_ERRORS;
(function (LINKEDIN_ERRORS) {
    LINKEDIN_ERRORS[LINKEDIN_ERRORS["DISCONNECTED"] = 0] = "DISCONNECTED";
    LINKEDIN_ERRORS[LINKEDIN_ERRORS["INVALID_CREDENTIALS"] = 1] = "INVALID_CREDENTIALS";
    LINKEDIN_ERRORS[LINKEDIN_ERRORS["DELAY"] = 2] = "DELAY";
})(LINKEDIN_ERRORS || (LINKEDIN_ERRORS = {}));
export class LinkedinErrors {
    constructor(text, url, additional) {
        this.text = text;
        this.url = url;
        this.additional = additional;
    }
}
//# sourceMappingURL=linkedin.errors.js.map