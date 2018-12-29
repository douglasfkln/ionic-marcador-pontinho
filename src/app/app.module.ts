import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SQLite } from '@ionic-native/sqlite'

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RoomAddPageModule } from '../pages/room-add/room-add.module';
import { PlayerAddPageModule } from '../pages/player-add/player-add.module';
import { HistoricPageModule } from '../pages/historic/historic.module';
import { PointsAddPageModule } from '../pages/points-add/points-add.module';
import { RoomsPageModule } from '../pages/rooms/rooms.module';

import { DatabaseProvider } from '../providers/database/database';
import { DaoPartidaProvider } from '../providers/dao-partida/dao-partida';
import { ToastProvider } from '../providers/toast/toast';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    RoomAddPageModule,
    PlayerAddPageModule,
    HistoricPageModule,
    PointsAddPageModule,
    RoomsPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite,
    DatabaseProvider,
    DaoPartidaProvider,
    ToastProvider
  ]
})
export class AppModule {}
