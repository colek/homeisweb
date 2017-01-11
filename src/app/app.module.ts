import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { RegistersComponent } from './registers/registers.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MainNavBarComponent } from './main-nav-bar/main-nav-bar.component';
import { FoldersComponent } from './folders/folders.component';
import { FolderComponent } from './folder/folder.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { NewfolderComponent } from './newfolder/newfolder.component';


@NgModule({
  declarations: [
    AppComponent,
    RegistersComponent,
    MainNavBarComponent,
    FoldersComponent,
    FolderComponent,
    PageNotFoundComponent,
    NewfolderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
