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
            data[existingIndex].value = value;
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

describe('JsonDBManager', () => {
    let db: JsonDBManager;

    const num = 1;
    const num2 = 2;

    beforeEach(() => {
        db = JsonDBManager.getInstance('test-db.json');
    });
    
    it('Test add and get', async () => {
        await db.add('teste', 'teste');
        await db.add(`user_${num}`, `${num2}`);

        console.log(await db.get());

    }); '';
    it('Test set and get', async () => {
        await db.update('teste', 'a');

        console.log(await db.getById('teste'));
    }); '';
    
    it('Test delete and get', async () => {
        await db.delete('teste');

        console.log(await db.getById('teste'));
    });'';
});

