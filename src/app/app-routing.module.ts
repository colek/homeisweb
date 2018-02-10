import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FoldersComponent } from './folders/folders.component'
import { RegistersComponent } from './registers/registers.component'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { NewfolderComponent } from './newfolder/newfolder.component'
import { ExpressionComponent } from './expression/expression.component'
import { DevicesComponent } from './devices/devices.component'
import { DeviceDetailComponent } from './device-detail/device-detail.component'
import { TagComponent } from './tag/tag.component'
import { LogListComponent } from './log-list/log-list.component';
import { LogDayComponent } from 'app/log-day/log-day.component';
import { AuthComponent } from 'app/auth/auth/auth.component';


const appRoutes: Routes = [
  { path: 'folders', component: FoldersComponent },
  { path: 'folders/:id', component: FoldersComponent },
  { path: 'newfolder/:parentId', component: NewfolderComponent },
  { path: 'editfolder/:id', component: NewfolderComponent },
  { path: 'editexpression/:parentId/:id', component: ExpressionComponent },
  { path: 'edittag/:id', component: TagComponent },
  { path: 'newtag/:parentId', component: TagComponent },
  { path: 'device/:id', component: DeviceDetailComponent },
  { path: 'newdevice', component: DeviceDetailComponent },
  { path: 'newexpression/:parentId', component: ExpressionComponent },
  { path: 'dataitems', component: DevicesComponent },
  { path: 'modbus', component: RegistersComponent },
  { path: 'login', component: AuthComponent },
  { path: 'logs', component: LogListComponent },
  { path: 'log/:id', component: LogDayComponent },
  { path: '', redirectTo: '/folders', pathMatch: 'full' },
  { path: '*.html', redirectTo: '/folders', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes,{useHash:false})    
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }