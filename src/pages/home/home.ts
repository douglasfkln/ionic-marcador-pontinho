import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RoomAddPage } from '../room-add/room-add';
import { PlayerAddPage } from '../player-add/player-add';
import { HistoricPage } from '../historic/historic';
import { PointsAddPage } from '../points-add/points-add';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  addRoom() {
    this.navCtrl.push(RoomAddPage);
  }

  addPlayer() {
    this.navCtrl.push(PlayerAddPage);
  }

  toHistoric() {
    this.navCtrl.push(HistoricPage);
  }

  addPoints() {
    this.navCtrl.push(PointsAddPage);
  }
}
