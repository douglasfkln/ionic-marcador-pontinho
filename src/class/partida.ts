export class Partida {
  ID: number;
  NOME: string;
  STATUS: string;
  DATA: string;
  VALOR_REENTRADA: string;
  TIPO_REENTRADA: number;

  constructor() {
  }

  public getId() {
    return this.ID;
  }
  public setId(id) {
    this.ID = id;
  }
  public getNome() {
    return this.NOME;
  }
  public setNome(nome) {
    this.NOME = nome;
  }
  public getStatus() {
    return this.STATUS;
  }
  public setStatus(status) {
    this.STATUS = status;
  }
  public getData() {
    return this.DATA;
  }
  public setData(data) {
    this.DATA = data;
  }
  public getValor_reentrada() {
    return this.VALOR_REENTRADA;
  }
  public setValor_reentrada(valor_reentrada) {
    this.VALOR_REENTRADA = valor_reentrada;
  }
  public getTipo_reentrada() {
    return this.TIPO_REENTRADA;
  }
  public setTipo_reentrada(tipo_reentrada) {
    this.TIPO_REENTRADA = tipo_reentrada;
  }
}