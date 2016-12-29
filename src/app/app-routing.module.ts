import { RouterModule, Routes } from '@angular/router';
import { NgModule }              from '@angular/core';
import {FoldersComponent} from './folders/folders.component'
import {FolderComponent} from './folder/folder.component'
import {PageNotFoundComponent} from './page-not-found/page-not-found.component'

const appRoutes: Routes = [
  { path: 'folders', component:  FoldersComponent},
  { path: 'folder/id', component: FolderComponent },
  { path: '',   redirectTo: '/heroes', pathMatch: 'full' },
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