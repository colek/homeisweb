import { RouterModule, Routes } from '@angular/router';
import { NgModule }              from '@angular/core';
import {FoldersComponent} from './folders/folders.component'
import {RegistersComponent} from './registers/registers.component'
import {PageNotFoundComponent} from './page-not-found/page-not-found.component'
import {NewfolderComponent} from './newfolder/newfolder.component'

const appRoutes: Routes = [
  { path: 'folders', component:  FoldersComponent},
  { path: 'folders/:id', component: FoldersComponent },
  { path: 'newfolder/:parentId', component: NewfolderComponent },
  { path: 'editfolder/:id', component: NewfolderComponent },
  { path: 'modbus', component:  RegistersComponent},
  { path: '',   redirectTo: '/folders', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}