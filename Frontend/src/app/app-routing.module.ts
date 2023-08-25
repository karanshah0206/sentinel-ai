import { NgModule } from '@angular/core';
import { Injectable } from '@angular/core'
import { RouterModule, Routes } from '@angular/router';
import { TitleStrategy } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { RawFootageComponent } from './raw-footage/raw-footage.component';

const routes : Routes = [
  {path: 'raw-footage', component: RawFootageComponent}
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
