import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Book } from '../models/book';
@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor() { }

  addBook(book: Book): Observable<Book>  {
    if(isNaN(book.id)){
      return throwError(() => new Error(' Invalid book ID'));
    }
    // Simulate an HTTP request to add a book
    return of(book); // Simulate a successful addition
  }
}
