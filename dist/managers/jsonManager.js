"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDatabase = void 0;
const jsondb_1 = require("../databases/jsondb");
let dbInstance = null;
function getDatabase() {
    if (!dbInstance) {
        dbInstance = jsondb_1.JsonDBManager.getInstance('db.json');
    }
    if (!dbInstance) {
        throw new Error('Instância do banco de dados não está definida.');
    }
    return dbInstance;
}
exports.getDatabase = getDatabase;
