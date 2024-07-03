"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    webServer: {
        command: "npm run build && npm run preview",
        port: 4173,
    },
    testDir: "tests",
    testMatch: /(.+\.)?(test|spec)\.[jt]s/,
};
exports.default = config;
