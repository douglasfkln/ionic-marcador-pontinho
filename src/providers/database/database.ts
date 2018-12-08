import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite } from '@ionic-native/sqlite'
import { Platform } from 'ionic-angular';

const DB_NAME: string = 'marcador_pontinho.db';
const win: any = window;
const TABLE_PARTIDAS = "CREATE TABLE IF NOT EXISTS PARTIDAS ("+
                        	"ID	INTEGER PRIMARY KEY AUTOINCREMENT,"+
                        	"NOME	TEXT,"+
                        	"STATUS	TEXT,"+
                        	"DATA	TEXT,"+
                        	"VALOR_REENTRADA	REAL,"+
                        	"TIPO_REENTRADA	INTEGER"+
                        ")";
const TABLE_JOGADORES = "CREATE TABLE IF NOT EXISTS JOGADORES ("+
                        	"ID	INTEGER PRIMARY KEY AUTOINCREMENT,"+
                        	"NOME	TEXT,"+
                        	"STATUS	TEXT,"+
                        	"PONTOS_ENTRADA	INTEGER,"+
                        	"PARTIDAS_ID	INTEGER,"+
                        	"FOREIGN KEY (PARTIDAS_ID) REFERENCES PARTIDAS(ID)"+
                        ")";
const TABLE_PONTUACAO = "CREATE TABLE IF NOT EXISTS PONTUACAO ("+
                        	"ID	INTEGER PRIMARY KEY AUTOINCREMENT,"+
                        	"PONTO	INTEGER,"+
                        	"BATEU	INTEGER,"+
                        	"STATUS	TEXT,"+
                        	"VALOR_REENTRADA	REAL,"+
                        	"JOGADORES_ID	INTEGER,"+
                        	"FOREIGN KEY (JOGADORES_ID) REFERENCES JOGADORES(ID)"+
                        ")";

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  private db: any;

  constructor(public sqlite: SQLite, public platform: Platform) {
    if (win.sqlitePlugin) {
      this.db = win.sqlitePlugin.openDatabase({
        name: DB_NAME,
        location: 2,
        createFromLocation: 0
      });
    } else {
      console.warn('Storage: SQLite plugin not installed, falling back to WebSQL. Make sure to install cordova-sqlite-storage in production!');
      this.db = win.openDatabase(DB_NAME, '1', 'database', 5 * 1024 * 1024);
    }
  }

  public getDB() {
    return this.db;
  }

    /**
   * Cria a estrutura inicial do banco de dados
   */
  public createDatabase() {
    // Cria as tabelas
    this.createTables();

    // // Seta configurações padrões
    // this.setConfigs();
  }

  
 /**
  * Criando as tabelas no banco de dados
  * @param db
  */
  private createTables() {
    // Criando as tabelas
    // sqlBatch podeexecutar mais de uma query
    // Em caso de erro, todas as alterações em um lote sql serão descartadas automaticamente usando ROLLBACK.
    this.query(TABLE_PARTIDAS);
    this.query(TABLE_JOGADORES);
    this.query(TABLE_PONTUACAO);
    // this.query('CREATE TABLE IF NOT EXISTS PARTIDAS (ID	INTEGER PRIMARY KEY AUTOINCREMENT, NOME	TEXT, STATUS	TEXT, DATA	TEXT, VALOR_REENTRADA	REAL, TIPO_REENTRADA	INTEGER)');
  }
  
  public async query(query: string, params: any[] = []): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.db.transaction((tx: any) => {
          tx.executeSql(query, params,
          (tx: any, res: any) => resolve({ tx: tx, res: res }),
          (tx: any, err: any) => reject({ tx: tx, err: err }));
        },
        (err: any) => reject({ err: err }));
      } catch (err) {
        reject({ err: err });
      }
    });
  }
  
  public setConfigs() {
    this.query('SELECT COUNT(ID) AS QNTD FROM TESTE').then((data: any) => {
      if (data.res.rows.item(0).QNTD == 0) {
        // Insere contas
        this.query('INSERT INTO TESTE (NAME) VALUES (?)', ["TESTE"])
          .then(() => console.log('Setado configurações padrões!'))
          .catch(e => console.error(e));
      }
    }).catch(e => console.error(e));
  }
}
