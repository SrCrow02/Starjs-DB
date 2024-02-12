import fs from 'fs';

interface KeyValueData {
    key: string;
    value: any;
}

export class JsonDBManager {
    private static instance: JsonDBManager | null = null;
    private dbFilePath: string;

    private constructor(dbFilePath: string) {
        this.dbFilePath = dbFilePath;
        if (!fs.existsSync(dbFilePath)) {
            fs.writeFileSync(dbFilePath, JSON.stringify({ data: [] }));
        }
    }

    public static getInstance(dbFilePath: string): JsonDBManager {
        if (!JsonDBManager.instance) {
            JsonDBManager.instance = new JsonDBManager(dbFilePath);
        }
        return JsonDBManager.instance;
    }

    public get(): any[] {
        const data = fs.readFileSync(this.dbFilePath, 'utf-8');
        const jsonData = JSON.parse(data).data;
        return jsonData.map((item: any) => item);
    }
    

    public getById(key: string): any {
        const data = this.get();
        return data.find((item: any) => item.key === key);
    }

    public add(key: string, value: any): void {
        const data = this.get();
        const existingIndex = data.findIndex((item: any) => item.key === key);
        if (existingIndex !== -1) {
            if (typeof data[existingIndex].value === 'number' && typeof value === 'number') {
                data[existingIndex].value += value;
            } else {
                data[existingIndex].value = value;
            }
        } else {
            const newData: KeyValueData = { key, value };
            data.push(newData);
        }
        this.saveData(data);
    }

    public update(key: string, newValue: any): void {
        const data = this.get();
        const index = data.findIndex((item: any) => item.key === key);
        if (index !== -1) {
            data[index].value = newValue;
            this.saveData(data);
        }
    }

    public delete(key: string): void {
        let data = this.get();
        data = data.filter((item: any) => item.key !== key);
        this.saveData(data);
    }

    private saveData(data: any[]): void {
        fs.writeFileSync(this.dbFilePath, JSON.stringify({ data }));
    }
}