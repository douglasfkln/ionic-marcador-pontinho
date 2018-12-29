import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Jogador } from '../../class/jogador';
import { DaoPartidaProvider } from '../../providers/dao-partida/dao-partida';

/**
 * Generated class for the PlayerAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-player-add',
  templateUrl: 'player-add.html',
})
export class PlayerAddPage {

  jogador: Jogador;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public daoPartida: DaoPartidaProvider,
              public toast: ToastController) {
    this.jogador = new Jogador();
    this.jogador.PARTIDAS_ID = this.navParams.data.partida_id;
    // Aqui vou ter que fazer uma regra pra pegar o valor do maior pontuador da partida atual quando uma pessoa entrar no meio da partida
    // ou zero quando o jogador está entrando no inicio
    this.jogador.PONTOS_ENTRADA = 0;
  }

  ionViewDidLoad() { }

  savePlayer() {

    if (this.jogador.NOME == null || this.jogador.NOME == undefined) {
      this.alertCtrl.create({
        title: 'Atenção!',
        subTitle: 'Informe o nome do Jogador!',
        buttons: [ {
          text: 'Ok'
        }]
      }).present();
      return false;
    }

    this.jogador.STATUS = "NOVO";
    this.daoPartida.insertJogador(this.jogador).then((data:any) => {
      this.jogador.ID = data.ID;
      this.toast.create({
        message: 'Jogador Adicionado!',
        duration: 1000,
        position: 'botton'
      }).present();
      this.navCtrl.setRoot(HomePage, {"room_id":this.jogador.PARTIDAS_ID});
    })
    .catch((e) => {
      this.toast.create({
        message: e,
        duration: 1500,
        position: 'botton'
      }).present();
    });
  }
}
