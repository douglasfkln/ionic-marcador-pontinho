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
    let query = ""
    if (id == -1) {
      query = 'SELECT * FROM PARTIDAS ORDER BY ID DESC';
    } else {
      query = 'SELECT * FROM PARTIDAS WHERE ID = '+id;
    }
    return this.dbProvider.query(query)
              .then((data: any) => {
                if (data.res.rows.length > 0) {
                  let item = data.res.rows.item(0);
                  let partida = new Partida();
                  partida.ID = item.ID;
                  partida.NOME = item.NOME;
                  partida.STATUS = item.STATUS;
                  partida.DATA = item.DATA;
                  partida.VALOR_REENTRADA = item.VALOR_REENTRADA;
                  partida.TIPO_REENTRADA = item.TIPO_REENTRADA;
                  return partida;
                }
                return null;
              })
              .catch(e => console.error("Erro ao buscar partida", e));
  }

  insert(partida) {
    return this.dbProvider.query("INSERT INTO PARTIDAS (NOME, STATUS, DATA, VALOR_REENTRADA, TIPO_REENTRADA) VALUES (?, ?, ?, ?, ?)", [partida.NOME, partida.STATUS, partida.DATA, partida.VALOR_REENTRADA, partida.TIPO_REENTRADA])
               .then((data:any) => {
                partida.setId(data.res.insertId);
                return partida;
               })
               .catch(e => console.error(e));
  }

  insertJogador(jogador) {
    return this.dbProvider.query("INSERT INTO JOGADORES (NOME, STATUS, PONTOS_ENTRADA, PARTIDAS_ID) VALUES (?, ?, ?, ?)", [jogador.NOME, jogador.STATUS, jogador.PONTOS_ENTRADA, jogador.PARTIDAS_ID])
               .then((data:any) => {
                jogador.ID = data.res.insertId;
                return jogador;
               })
               .catch(e => console.error(e));
  }

  insertPontuacao(pontuacao) {
    return this.dbProvider.query("INSERT INTO PONTUACAO (PONTO, STATUS, BATEU, VALOR_REENTRADA, JOGADORES_ID) VALUES (?, ?, ?, ?, ?)", [pontuacao.PONTO, pontuacao.STATUS, pontuacao.BATEU, pontuacao.VALOR_REENTRADA, pontuacao.JOGADORES_ID])
               .then((data:any) => {
                pontuacao.ID = data.res.insertId;
                return pontuacao;
               })
               .catch(e => console.error(e));
  }

  update(lancamento) {
    // return this.dbProvider.query("UPDATE LANCAMENTOS SET DESCRICAO = ?, VALOR = ?, REFERENCIA_MES = ?, REFERENCIA_ANO = ?, CONTA_ID = ?, TIPO = ?, PAGO = ? WHERE ID = ?", [lancamento.DESCRICAO, lancamento.VALOR, lancamento.REFERENCIA_MES, lancamento.REFERENCIA_ANO, lancamento.CONTA, lancamento.TIPO, lancamento.PAGO, lancamento.ID]).catch(e => console.error("Erro ao atualizar lançamento", e));
  }

  delete(id) {
    // return this.dbProvider.query("DELETE FROM LANCAMENTOS WHERE ID = ?", [id]).catch(e => console.error(e));
  }

  getJogadores(partida_id) {
    return this.dbProvider.query("SELECT * FROM JOGADORES WHERE PARTIDAS_ID = ? ORDER BY ID ASC", [partida_id])
              .then((data: any) => {
                if (data.res.rows.length > 0) {
                  let jogadores:any[] = [];
                  for (var i=0; i < data.res.rows.length; i++) {
                    let jogador = data.res.rows.item(i);
                    jogador.TOTAL_PONTOS = 0;
                    jogador.TOTAL_BATIDAS = 0;

                    this.dbProvider.query("SELECT SUM(PONTO) AS PONTOS FROM PONTUACAO WHERE JOGADORES_ID = ?", [jogador.ID])
                                  .then((result: any) => {
                                    if (result.res.rows.length > 0) {
                                      for (var i=0; i < result.res.rows.length; i++) {
                                        jogador.TOTAL_PONTOS = result.res.rows.item(i).PONTOS;
                                      }
                                    }
                                  })
                                  .catch(e => console.error(e));
                    this.dbProvider.query("SELECT COUNT(ID) AS BATIDAS FROM PONTUACAO WHERE JOGADORES_ID = ? AND BATEU = 'S'", [jogador.ID])
                                  .then((result: any) => {
                                    if (result.res.rows.length > 0) {
                                      for (var i=0; i < result.res.rows.length; i++) {
                                        jogador.TOTAL_BATIDAS = result.res.rows.item(i).BATIDAS;
                                      }
                                    }
                                  })
                                  .catch(e => console.error(e));
                    jogadores.push(jogador);
                  }
                  return jogadores;
                }
                return null;
              })
              .catch(e => console.error(e));
  }
}
