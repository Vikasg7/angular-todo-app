import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { RouterModule } from "@angular/router"
import { HttpModule } from "@angular/http"
import { FormsModule } from "@angular/forms"

import { AppComponent } from './components/app'
import { HeaderComponent } from './components/header';
import { BodyComponent } from './components/body';
import { TodoSrv } from './services/todo';
import { StorageSrv } from './services/storage';
import { ContentEditableOnHover } from './directives/contentEditableOnHover';
import { TodoText } from './components/todoText';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    ContentEditableOnHover,
    TodoText
   ],
   imports: [
      BrowserModule,
      // RouterModule.forRoot(routes, {useHash: true}),
      HttpModule,
      FormsModule
  ],
  providers: [TodoSrv, StorageSrv],
  bootstrap: [AppComponent]
})
export class AppModule { }