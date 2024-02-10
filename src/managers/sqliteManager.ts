import Database from '../databases/sqlitedb';

let dbInstance: Database | null = null;

export function getDatabase(): Database {
    if (!dbInstance) {
        dbInstance = Database.getInstance('starjs-db.db');
    }
    if (!dbInstance) {
        throw new Error('Instância do banco de dados não está definida.');
    }
    return dbInstance;
}
    