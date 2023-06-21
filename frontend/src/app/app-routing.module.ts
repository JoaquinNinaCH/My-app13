import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemComponent } from './item/item.component';
import { MusicaComponent } from './musica/musica.component';

const routes: Routes = [
  { path: 'items', component: ItemComponent },
  { path: 'musicas', component: MusicaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
