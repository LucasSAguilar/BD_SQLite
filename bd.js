// USO DO SQLITE BÁSICO

/*

Para começar, inicie o npm: npm init -y
Instale o pacote sqlite: npm instal sqlite3

*/


import sqlite3 from 'sqlite3';
const dbName = 'exemplo.db';



// Dados que serão inseridos
const nome = 'João Silva';
const email = 'joao.silva@example.com';
const mensagem = 'Olá, estou interessado no seu produto.';






// Criar o banco de dados e inserir dados na tabela
const db = new sqlite3.Database(dbName, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log(`Conectado ao banco de dados: ${dbName}`);
    createTable();
  }
});



// Função para criar a tabela
function createTable() {
  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      email TEXT,
      mensagem TEXT
    )
  `, (err) => {
    if (err) {
      console.error(err.message);
      db.close();
    } else {
      console.log('Tabela "usuarios" criada com sucesso');
      insertData();
    }
  });
}




// Função para inserir dados na tabela
function insertData() {


  const stmt = db.prepare(`
    INSERT INTO usuarios (nome, email, mensagem)
    VALUES (?, ?, ?)
  `);
  
  stmt.run(nome, email, mensagem, function(err) {
    if (err) {
      console.error(err.message);
    } else {
      console.log(`Dados inseridos com sucesso. ID: ${this.lastID}`);
    }
    stmt.finalize();
    retrieveData();
  });
}





// Função para recuperar e exibir os dados da tabela
function retrieveData() {
  db.all('SELECT * FROM usuarios', (err, rows) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('Dados da tabela "usuarios":');
      rows.forEach((row) => {
        console.log(`ID: ${row.id}, Nome: ${row.nome}, Email: ${row.email}, Mensagem: ${row.mensagem}`);
      });
    }
    db.close((err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log('Conexão com o banco de dados fechada');
      }
    });
  });
}
