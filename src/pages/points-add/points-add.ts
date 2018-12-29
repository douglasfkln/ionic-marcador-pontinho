import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { HistoricPage } from '../historic/historic';
import { Pontuacao } from '../../class/pontuacao';
import { Partida } from '../../class/partida';
import { DaoPartidaProvider } from '../../providers/dao-partida/dao-partida';

/**
 * Generated class for the PointsAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-points-add',
  templateUrl: 'points-add.html',
})
export class PointsAddPage {

  pontuacao: Pontuacao;
  partida: Partida;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public daoPartida: DaoPartidaProvider,
              public toast: ToastController) {
    this.pontuacao = new Pontuacao();
    this.partida = new Partida();

    this.partida.ID = this.navParams.data.partida_id;
    this.pontuacao.JOGADORES_ID = this.navParams.data.jogador_id;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PointsAddPage');
  }

  bateu() {
    this.pontuacao.PONTO = 0;
    this.pontuacao.STATUS = "B";
    this.pontuacao.BATEU = "S";
    // Adicionar lógica para quando o jogador passar dos 100 pontos
    // Necessita de um valor de reentrada (pegar o valor do maior pontuador do jogo)
    this.pontuacao.VALOR_REENTRADA = 0;
    this.salvar();
  }

  savePoints() {
    if (this.pontuacao.PONTO == null || this.pontuacao.PONTO == undefined) {
      this.alertCtrl.create({
        title: 'Atenção!',
        subTitle: 'Informe a Pontuação!',
        buttons: [ {
          text: 'Ok'
        }]
      }).present();
      return false;
    }

    this.pontuacao.STATUS = "P";
    this.pontuacao.BATEU = "N";
    // Adicionar lógica para quando o jogador passar dos 100 pontos
    // Necessita de um valor de reentrada (pegar o valor do maior pontuador do jogo)
    this.pontuacao.VALOR_REENTRADA = 0;
    this.salvar();
  }

  salvar() {
    this.daoPartida.insertPontuacao(this.pontuacao).then((data:any) => {
      this.pontuacao.ID = data.ID;
      this.toast.create({
        message: 'Pontuação inserida!',
        duration: 1000,
        position: 'botton'
      }).present();
      this.navCtrl.setRoot(HomePage, {"room_id":this.partida.ID});
    })
    .catch((e) => {
      this.toast.create({
        message: e,
        duration: 1500,
        position: 'botton'
      }).present();
    });
  }
  toHistoric() {
    this.navCtrl.push(HistoricPage);
  }
}
