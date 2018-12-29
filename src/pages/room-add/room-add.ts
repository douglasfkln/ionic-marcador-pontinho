import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';

import { Partida } from '../../class/partida';
import { DaoPartidaProvider } from '../../providers/dao-partida/dao-partida';

/**
 * Generated class for the RoomAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-room-add',
  templateUrl: 'room-add.html',
})
export class RoomAddPage {

  public partida: Partida;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public daoPartida: DaoPartidaProvider,
              public toast: ToastController,
              public alertCtrl: AlertController) {
    this.partida = new Partida();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomAddPage');
  }

  saveRoom() {

    if (this.partida.NOME == null || this.partida.NOME == undefined) {
      this.alertCtrl.create({
        title: 'Atenção!',
        subTitle: 'Informe o nome da Partida!',
        buttons: [ {
          text: 'Ok'
        }]
      }).present();
      return false;
    }

    if (this.partida.VALOR_REENTRADA == null || this.partida.VALOR_REENTRADA == '') {
      this.partida.setValor_reentrada(0);
    }
    if (this.partida.TIPO_REENTRADA == null || this.partida.TIPO_REENTRADA == undefined) {
      this.partida.setTipo_reentrada(1);
    }

    this.partida.setStatus("NOVA");
    this.partida.setData(new Date());
    
    this.daoPartida.insert(this.partida).then((data:any) => {
      this.partida.setId(data.ID);
      this.toast.create({
        message: 'Partida criada com sucesso!',
        duration: 1500,
        position: 'botton'
      }).present();
      this.navCtrl.setRoot(HomePage, {"room_id":data.ID});
    })
    .catch((e) => {
      console.error(e)
      this.toast.create({
        message: e,
        duration: 1500,
        position: 'botton'
      }).present();
    });
  }
}
