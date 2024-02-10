"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDatabase = void 0;
const sqlitedb_1 = __importDefault(require("../databases/sqlitedb"));
let dbInstance = null;
function getDatabase() {
    if (!dbInstance) {
        dbInstance = sqlitedb_1.default.getInstance('starjs-db.db');
    }
    if (!dbInstance) {
        throw new Error('Instância do banco de dados não está definida.');
    }
    return dbInstance;
}
exports.getDatabase = getDatabase;
