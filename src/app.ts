import { getDatabase as getSQLiteDatabase } from './managers/sqliteManager';
import { getDatabase as getJsonDatabase } from './managers/jsonManager';

module.exports = {
    getSQLiteDatabase,
    getJsonDatabase
};
