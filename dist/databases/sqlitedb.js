"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite3_1 = __importDefault(require("sqlite3"));
class Database {
    static instance = null;
    db;
    constructor(databaseName) {
        this.db = new sqlite3_1.default.Database(databaseName);
        this.initDatabase();
    }
    initDatabase() {
        this.db.run(`CREATE TABLE IF NOT EXISTS data (
            key TEXT PRIMARY KEY,
            value TEXT
        )`);
    }
    static getInstance(databaseName) {
        if (!Database.instance) {
            Database.instance = new Database(databaseName);
        }
        return Database.instance;
    }
    add(key, value) {
        this.db.run('INSERT OR REPLACE INTO data (key, value) VALUES (?, ?)', [key, value], (err) => {
            if (err) {
                console.error('Erro ao inserir dados:', err);
            }
            else {
                console.log('Dados inseridos com sucesso!');
            }
        });
    }
    async get(key) {
        return new Promise((resolve, reject) => {
            this.db.get('SELECT value FROM data WHERE key = ?', [key], (err, row) => {
                if (err) {
                    console.error('Erro ao recuperar dados:', err);
                    reject(err);
                }
                else {
                    resolve(row ? row.value : undefined);
                }
            });
        });
    }
    async set(key, value) {
        return new Promise((resolve, reject) => {
            this.db.run('UPDATE data SET value = ? WHERE key = ?', [value, key], (err) => {
                if (err) {
                    console.error('Erro ao atualizar dados:', err);
                    reject(err);
                }
                else {
                    console.log('Dados atualizados com sucesso!');
                    resolve();
                }
            });
        });
    }
    async delete(key) {
        return new Promise((resolve, reject) => {
            this.db.run('DELETE FROM data WHERE key = ?', [key], (err) => {
                if (err) {
                    console.error('Erro ao deletar dados:', err);
                    reject(err);
                }
                else {
                    console.log('Dados deletados com sucesso!');
                    resolve();
                }
            });
        });
    }
    async getAll() {
        return new Promise((resolve, reject) => {
            this.db.all('SELECT * FROM data', (err, rows) => {
                if (err) {
                    console.error('Erro ao recuperar todos os dados:', err);
                    reject(err);
                }
                else {
                    resolve(rows);
                }
            });
        });
    }
    close() {
        this.db.close((err) => {
            if (err) {
                console.error('Erro ao fechar o banco de dados:', err);
            }
            else {
                console.log('Conexão com o banco de dados fechada com sucesso!');
            }
        });
    }
}
exports.default = Database;
