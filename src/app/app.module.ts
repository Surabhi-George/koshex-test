import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgxEchartsModule  } from 'ngx-echarts';
import { DragAndDropModule } from 'angular-draggable-droppable';


import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    DragAndDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
