import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RoomAddPage } from '../room-add/room-add';
import { PlayerAddPage } from '../player-add/player-add';

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
}
