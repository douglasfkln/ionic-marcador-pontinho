import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlayerAddPage } from './player-add';

@NgModule({
  declarations: [
    PlayerAddPage,
  ],
  imports: [
    IonicPageModule.forChild(PlayerAddPage),
  ],
})
export class PlayerAddPageModule {}
