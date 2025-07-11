import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BookListComponent } from './book-list/book-list.component';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {MatSnackBarModule} from '@angular/material/snack-bar'; // Import the MatSnackBarModule

import { StoreModule } from '@ngrx/store';
import { AppState } from './app.state';
import { BookReducer } from './books/book.reducer';

import { EffectsModule } from '@ngrx/effects';
import { BookEffects } from './books/book.effect';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSnackBarModule,

    StoreModule.forRoot<AppState>({ book: BookReducer }), // Register the BookReducer with the key 'book'
    EffectsModule.forRoot([BookEffects]),// Register the BookEffects

    StoreDevtoolsModule.instrument()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
