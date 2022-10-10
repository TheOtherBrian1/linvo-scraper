import { installMouseHelper } from "./show.mouse";
import { createCursor } from 'ghost-cursor';
const loadCursor = async (page, headless) => {
    if (!headless) {
        await installMouseHelper(page);
    }
    page.cursor = await createCursor(page);
};
export default loadCursor;
//# sourceMappingURL=load-cursor.js.map