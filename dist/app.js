"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqliteManager_1 = require("./managers/sqliteManager");
const jsonManager_1 = require("./managers/jsonManager");
module.exports = {
    getSQLiteDatabase: sqliteManager_1.getDatabase,
    getJsonDatabase: jsonManager_1.getDatabase
};
