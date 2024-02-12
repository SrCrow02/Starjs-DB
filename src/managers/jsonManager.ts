import { JsonDBManager } from '../databases/jsondb';

let dbInstance: JsonDBManager | null = null;

export function getDatabase(): JsonDBManager {
    if (!dbInstance) {
        dbInstance = JsonDBManager.getInstance('db.json');
    }
    if (!dbInstance) {
        throw new Error('Instância do banco de dados não está definida.');
    }
    return dbInstance;
}
