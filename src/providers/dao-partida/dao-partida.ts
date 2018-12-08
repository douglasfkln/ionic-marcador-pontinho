import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Partida } from '../../class/partida';
import { DatabaseProvider } from '../database/database';
import { SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the DaoPartidaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DaoPartidaProvider {

  constructor(public dbProvider: DatabaseProvider) {
    console.log('Hello DaoPartidaProvider Provider');
  }

  
  getList() {
    // return this.dbProvider.getDB()
    //            .then((db: SQLiteObject) => {
    //               return db.executeSql("SELECT L.*, C.DESCRICAO AS CONTA_DESCRICAO FROM LANCAMENTOS L LEFT JOIN CONTAS C ON C.ID = L.CONTA_ID WHERE TIPO = ? AND L.REFERENCIA_MES = ? AND L.REFERENCIA_ANO = ? ORDER BY L.DESCRICAO", [tipo, mes, ano])
    //                        .then((data: any) => {
    //                          if (data.rows.length > 0) {
    //                            let lancamentos:any[] = [];
    //                            for (var i=0; i < data.rows.length; i++) {
    //                              let lancamento = data.rows.item(i);
    //                              lancamentos.push(lancamento);
    //                            }
    //                            return lancamentos;
    //                          }
    //                          return null;
    //                        })
    //                        .catch(e => console.error(e));
    //            })
    //            .catch(e => console.error());
  }

  get(id) {
    // return this.dbProvider.getDB()
    //               .then((db: SQLiteObject) => {
    //                 return db.executeSql('SELECT * FROM LANCAMENTOS WHERE ID = ?', [id])
    //                          .then((data: any) => {
    //                            console.log("Lançamento");
    //                            console.log(data);
    //                            if (data.rows.length > 0) {
    //                              let item = data.rows.item(0);
    //                              let lancamento = new Lancamento();
    //                              lancamento.ID = item.ID;
    //                              lancamento.DESCRICAO = item.DESCRICAO;
    //                              lancamento.VALOR = item.VALOR;
    //                              lancamento.REFERENCIA_MES = item.REFERENCIA_MES;
    //                              lancamento.REFERENCIA_ANO = item.REFERENCIA_ANO;
    //                              lancamento.CONTA = item.CONTA_ID;
    //                              lancamento.TIPO = item.TIPO;
    //                              lancamento.PAGO = item.PAGO;
    //                              return lancamento;
    //                            }
    //                            return null;
    //                          })
    //                          .catch(e => console.error("Erro ao buscar lançamento", e));
    //               })
    //               .catch(e => console.error("Erro ao abrir banco", e));
  }

  insert(partida) {
    return this.dbProvider.query("INSERT INTO PARTIDAS (NOME, STATUS, DATA, VALOR_REENTRADA, TIPO_REENTRADA) VALUES (?, ?, ?, ?, ?)", [partida.NOME, partida.STATUS, partida.DATA, partida.VALOR_REENTRADA, partida.TIPO_REENTRADA])
               .then((data:any) => {
                partida.setId(data.res.insertId);
                return partida;
               })
               .catch(e => console.error(e));
  }

  update(lancamento) {
    return this.dbProvider.getDB()
               .then((db: SQLiteObject) => {
                  return db.executeSql("UPDATE LANCAMENTOS SET DESCRICAO = ?, VALOR = ?, REFERENCIA_MES = ?, REFERENCIA_ANO = ?, CONTA_ID = ?, TIPO = ?, PAGO = ? WHERE ID = ?", [lancamento.DESCRICAO, lancamento.VALOR, lancamento.REFERENCIA_MES, lancamento.REFERENCIA_ANO, lancamento.CONTA, lancamento.TIPO, lancamento.PAGO, lancamento.ID])
                            .catch(e => console.error("Erro ao atualizar lançamento", e));
               })
               .catch(e => console.error("Erro ao brir banco", e));
  }

  delete(id) {
    return this.dbProvider.getDB()
               .then((db:SQLiteObject) => {
                 return db.executeSql("DELETE FROM LANCAMENTOS WHERE ID = ?", [id]).catch(e => console.error(e));
               })
               .catch(e => console.error(e));
  }
}
