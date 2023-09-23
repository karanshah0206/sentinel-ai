import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AppComponent } from './app.component';
import { RawFootageComponent } from './raw-footage/raw-footage.component';
import { RouterModule } from '@angular/router';
import { ProcessedFootageComponent } from './processed-footage/processed-footage.component';
import { KeyFramesComponent } from './key-frames/key-frames.component';
import { KeyActionsComponent } from './key-actions/key-actions.component';
import { HistoricalDataComponent } from './historical-data/historical-data.component';
import { SearchPipe } from './search.pipe';
import { CurrentTargetComponent } from './current-target/current-target.component';
import { LogoComponent } from './logo/logo.component';

@NgModule({
  declarations: [
    AppComponent,
    RawFootageComponent,
    ProcessedFootageComponent,
    KeyFramesComponent,
    KeyActionsComponent,
    HistoricalDataComponent,
    SearchPipe,
    CurrentTargetComponent,
    LogoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
    ]),
    FormsModule,
    NgxDatatableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
