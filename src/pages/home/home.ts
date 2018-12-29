import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RoomAddPage } from '../room-add/room-add';
import { PlayerAddPage } from '../player-add/player-add';
import { HistoricPage } from '../historic/historic';
import { PointsAddPage } from '../points-add/points-add';
import { DaoPartidaProvider } from '../../providers/dao-partida/dao-partida';
import { Partida } from '../../class/partida';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public partida: Partida;
  public listJogadores: any[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public daoPartida: DaoPartidaProvider) {
    
    this.partida = new Partida();

    // Busca todos os jogadores de uma determinada partida
    // Caso tiver um código vindo por parâmetro senão pega a última partida cadastrada
    let partida_id = -1;
    if (this.navParams.data.room_id) {
      partida_id = this.navParams.data.room_id;
    }
    this.daoPartida.get(partida_id)
      .then((result: any) => {
        this.partida = result;
        this.daoPartida.getJogadores(result.ID)
          .then((result: any) => {
            this.listJogadores = result;
            console.log(this.listJogadores);
          });
      });
  }

  addRoom() {
    this.navCtrl.push(RoomAddPage);
  }

  addPlayer() {
    this.navCtrl.push(PlayerAddPage, {"partida_id":this.partida.ID});
  }

  toHistoric() {
    this.navCtrl.push(HistoricPage);
  }

  addPoints() {
    this.navCtrl.push(PointsAddPage);
  }
}
