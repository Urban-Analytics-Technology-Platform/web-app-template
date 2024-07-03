"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
(0, vitest_1.describe)("sum test", () => {
    (0, vitest_1.it)("adds 1 + 2 to equal 3", () => {
        (0, vitest_1.expect)(1 + 2).toBe(3);
    });
});
