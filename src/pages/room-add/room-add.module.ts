import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoomAddPage } from './room-add';
import { BrMaskerModule } from 'brmasker-ionic-3';

@NgModule({
  declarations: [
    RoomAddPage,
  ],
  imports: [
    BrMaskerModule,
    IonicPageModule.forChild(RoomAddPage),
  ],
})
export class RoomAddPageModule {}
