import { NgModule } from '@angular/core';
import { Injectable } from '@angular/core'
import { RouterModule, Routes } from '@angular/router';
import { TitleStrategy } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HistoricalDataComponent } from './historical-data/historical-data.component';
import { CurrentTargetComponent } from './current-target/current-target.component';
import { LogoComponent } from './logo/logo.component';

const routes : Routes = [
  {path: '', component: CurrentTargetComponent},
  {path: 'historical-data', component: HistoricalDataComponent}
];

@Injectable({providedIn: 'root'})
export class TemplatePageTitleStrategy extends TitleStrategy {
  constructor(private readonly title: Title) {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    if (title !== undefined) {
      this.title.setTitle(`My Application | ${title}`);
    }
  }
}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {provide: TitleStrategy, useClass: TemplatePageTitleStrategy},
  ]
})

export class AppRoutingModule { }
