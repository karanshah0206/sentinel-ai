import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RawFootageComponent } from './raw-footage/raw-footage.component';
import { RouterModule } from '@angular/router';
import { ProcessedFootageComponent } from './processed-footage/processed-footage.component';
import { KeyFramesComponent } from './key-frames/key-frames.component';
import { KeyActionsComponent } from './key-actions/key-actions.component';
import { ViewHistoryComponent } from './view-history/view-history.component';

@NgModule({
  declarations: [
    AppComponent,
    RawFootageComponent,
    ProcessedFootageComponent,
    KeyFramesComponent,
    KeyActionsComponent,
    ViewHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
