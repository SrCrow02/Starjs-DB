<div align="center">
  <img src="https://img.shields.io/github/license/seu-usuario/starjs-db?color=blue" alt="License">
  <img src="https://img.shields.io/npm/v/starjs-db?color=green" alt="NPM Version">
  <img src="https://img.shields.io/npm/dt/starjs-db?color=orange" alt="Downloads">
</div>

# StarJS-DB

O `starjs-db` é um pacote de banco de dados simples para armazenar e gerenciar dados em seus projetos JavaScript/TypeScript Especialmente com Bots do Discord.

## Instalação

Para instalar o `starjs-db`, você pode usar o npm ou o yarn:

```bash
npm install starjs-db
# ou
yarn add starjs-db
```

## Uso

Aqui está um exemplo básico de como usar o `starjs-db`:

```javascript
const { getDatabase } = require('starjs-db');

// Obtendo uma instância do banco de dados
const db = getDatabase();

// Adicionando dados ao banco de dados
db.set('username', 'johndoe');

// Obtendo dados do banco de dados
const username = db.get('username');
console.log('Username:', username); // Saída: 'johndoe'
```

## Métodos Principais

- `<code>set(key: string, value: any): void</code>`: Define um valor para a chave especificada.
- `<code>get(key: string): any</code>`: Retorna o valor associado à chave especificada.

## Licença

Este projeto está licenciado sob a Licença MIT - consulte o arquivo [LICENSE](LICENSE) para obter detalhes.
