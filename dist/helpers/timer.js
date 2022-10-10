export function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
export const timer = (num) => {
    return new Promise(res => {
        setTimeout(() => {
            res(true);
        }, num + randomIntFromInterval(-1000, 1000));
    });
};
//# sourceMappingURL=timer.js.map