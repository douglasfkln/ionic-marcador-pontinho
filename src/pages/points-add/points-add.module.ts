import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PointsAddPage } from './points-add';

@NgModule({
  declarations: [
    PointsAddPage,
  ],
  imports: [
    IonicPageModule.forChild(PointsAddPage),
  ],
})
export class PointsAddPageModule {}
