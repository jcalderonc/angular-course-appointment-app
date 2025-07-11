import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType} from '@ngrx/effects';

import { Book } from '../models/book';
import * as BookActions from './book.action';
import { BookService } from './book.service';
import { mergeMap, map, catchError, of} from 'rxjs';

@Injectable()
export class BookEffects {

    addBook$: any; // Declare property to hold the effect 
     constructor(
        private actions$: Actions,
        private bookService: BookService    
    ){
        // 🎧 LISTENER: Crea un "oyente" que escucha TODAS las acciones despachadas en la app
        this.addBook$ = createEffect(() => this.actions$.pipe(
            
            // 🔍 FILTRO: "Solo me interesan las acciones de tipo 'addBook', ignoro el resto"
            ofType(BookActions.addBook),
            
            // 🔄 TRANSFORMADOR: "Por cada addBook que llegue, hago algo asíncrono"
            mergeMap((action) => this.bookService.addBook(action.book) // 📞 Llamo al servicio HTTP
            .pipe(
                // ✅ SI TODO SALE BIEN (HTTP 200-299): 
                // "Creo y despacho una nueva acción de ÉXITO con el libro guardado"
                map(book => BookActions.addBookSuccess({ book })),
                
                // ❌ SI ALGO SALE MAL (HTTP 400-500+): 
                // "Creo y despacho una nueva acción de ERROR con el mensaje de falla"
                catchError(error => of(BookActions.addBookFailure({ error })))
            ))
        ));



        // 🎯 RESUMEN: 
        // "Escucho addBook → Llamo HTTP → Si funciona: addBookSuccess, Si falla: addBookFailure"
        // Es como un "traductor automático" de intenciones a resultados

   }
}