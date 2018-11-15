import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { HistoricPage } from '../historic/historic';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PointsAddPage');
  }

  bateu() {
    this.navCtrl.setRoot(HomePage);
  }

  savePoints() {
    this.navCtrl.setRoot(HomePage);
  }

  toHistoric() {
    this.navCtrl.push(HistoricPage);
  }
}
