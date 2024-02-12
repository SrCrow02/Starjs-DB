"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonDBManager = void 0;
const fs_1 = __importDefault(require("fs"));
class JsonDBManager {
    static instance = null;
    dbFilePath;
    constructor(dbFilePath) {
        this.dbFilePath = dbFilePath;
        if (!fs_1.default.existsSync(dbFilePath)) {
            fs_1.default.writeFileSync(dbFilePath, JSON.stringify({ data: [] }));
        }
    }
    static getInstance(dbFilePath) {
        if (!JsonDBManager.instance) {
            JsonDBManager.instance = new JsonDBManager(dbFilePath);
        }
        return JsonDBManager.instance;
    }
    get() {
        const data = fs_1.default.readFileSync(this.dbFilePath, 'utf-8');
        const jsonData = JSON.parse(data).data;
        return jsonData.map((item) => item);
    }
    getById(key) {
        const data = this.get();
        return data.find((item) => item.key === key);
    }
    add(key, value) {
        const data = this.get();
        const existingIndex = data.findIndex((item) => item.key === key);
        if (existingIndex !== -1) {
            if (typeof data[existingIndex].value === 'number' && typeof value === 'number') {
                data[existingIndex].value += value;
            }
            else {
                data[existingIndex].value = value;
            }
        }
        else {
            const newData = { key, value };
            data.push(newData);
        }
        this.saveData(data);
    }
    update(key, newValue) {
        const data = this.get();
        const index = data.findIndex((item) => item.key === key);
        if (index !== -1) {
            data[index].value = newValue;
            this.saveData(data);
        }
    }
    delete(key) {
        let data = this.get();
        data = data.filter((item) => item.key !== key);
        this.saveData(data);
    }
    saveData(data) {
        fs_1.default.writeFileSync(this.dbFilePath, JSON.stringify({ data }));
    }
}
exports.JsonDBManager = JsonDBManager;
