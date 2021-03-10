import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LinedraggableComponent } from './linedraggable/linedraggable.component';

const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
      path: '',
      component: LinedraggableComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
