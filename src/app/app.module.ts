import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { RegistersComponent } from './registers/registers.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainNavBarComponent } from './main-nav-bar/main-nav-bar.component';
import { FoldersComponent } from './folders/folders.component';
import { FolderComponent } from './folder/folder.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { NewfolderComponent } from './newfolder/newfolder.component';
import { ExpressionComponent } from './expression/expression.component';
import { CodemirrorModule } from 'ng2-codemirror';
import { DevicesComponent } from './devices/devices.component';
import { DevicesItemComponent } from './devices-item/devices-item.component';
import { TagComponent } from './tag/tag.component';
import { FolderNavBarComponent } from "./folder-nav-bar/folder-nav-bar.component";
import { DeviceDetailComponent } from "./device-detail/device-detail.component";
import { LogListComponent } from './log-list/log-list.component';
import { LogDayComponent } from './log-day/log-day.component';
import { SharingService } from './services/sharing-service.service';
import { AuthComponent } from './auth/auth/auth.component';
import { ModbusService } from './services/modbus.service';
import { DevicesService } from './services/devices.service';
import { FolderService } from './services/folder.service';
import { LogService } from './services/log.service';
import { ExpressionService } from './services/expression.service';
import { TagService } from './services/tag.service';
import { MainComponent } from './components/main/main.component';


@NgModule({
  declarations: [
    AppComponent,
    RegistersComponent,
    MainNavBarComponent,
    FoldersComponent,
    FolderComponent,
    PageNotFoundComponent,
    NewfolderComponent,
    ExpressionComponent,
    DevicesComponent,
    DevicesItemComponent,
    TagComponent,
    FolderNavBarComponent,
    DeviceDetailComponent,
    LogListComponent,
    LogDayComponent,
    AuthComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    CodemirrorModule
  ],
  providers: [TagService, SharingService, ModbusService, DevicesService, FolderService, LogService, ExpressionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
