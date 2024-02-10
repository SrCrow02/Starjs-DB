import sqlite3 from 'sqlite3';

interface Row {
    value: string;
}

export default class Database {
    private static instance: Database | null = null; 
    private db: sqlite3.Database;

    private constructor(databaseName: string) {
        this.db = new sqlite3.Database(databaseName);
        this.initDatabase();
    }

    private initDatabase(): void {
        this.db.run(`CREATE TABLE IF NOT EXISTS data (
            key TEXT PRIMARY KEY,
            value TEXT
        )`);
    }

    public static getInstance(databaseName: string): Database {
        if (!Database.instance) {
            Database.instance = new Database(databaseName);
        }
        return Database.instance;
    }

    public add(key: string, value: string): void {
        this.db.run('INSERT OR REPLACE INTO data (key, value) VALUES (?, ?)', [key, value], (err) => {
            if (err) {
                console.error('Erro ao inserir dados:', err);
            } else {
                console.log('Dados inseridos com sucesso!');
            }
        });
    }

    public async get(key: string): Promise<string | undefined> {
        return new Promise((resolve, reject) => {
            this.db.get('SELECT value FROM data WHERE key = ?', [key], (err, row: Row) => {
                if (err) {
                    console.error('Erro ao recuperar dados:', err);
                    reject(err);
                } else {
                    resolve(row ? row.value : undefined);
                }
            });
        });
    }

    public async set(key: string, value: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.db.run('UPDATE data SET value = ? WHERE key = ?', [value, key], (err) => {
                if (err) {
                    console.error('Erro ao atualizar dados:', err);
                    reject(err);
                } else {
                    console.log('Dados atualizados com sucesso!');
                    resolve();
                }
            });
        });
    }

    public async delete(key: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.db.run('DELETE FROM data WHERE key = ?', [key], (err) => {
                if (err) {
                    console.error('Erro ao deletar dados:', err);
                    reject(err);
                } else {
                    console.log('Dados deletados com sucesso!');
                    resolve();
                }
            });
        });
    }

    public async getAll(): Promise<{ key: string; value: string }[]> {
        return new Promise((resolve, reject) => {
            this.db.all('SELECT * FROM data', (err, rows: { key: string; value: string }[]) => {
                if (err) {
                    console.error('Erro ao recuperar todos os dados:', err);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    public close(): void {
        this.db.close((err) => {
            if (err) {
                console.error('Erro ao fechar o banco de dados:', err);
            } else {
                console.log('Conexão com o banco de dados fechada com sucesso!');
            }
        });
    }
}
