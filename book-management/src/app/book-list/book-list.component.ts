import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addBook, removeBook } from '../books/book.action';
import { Book } from '../models/book';
import { AppState } from '../app.state';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar for notifications

@Component({
  selector: 'app-book-list',
  standalone: false,
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent {

  books$: Observable<Book[]>; //suscribe to the book state
  constructor(private store: Store<AppState>, private snackBar: MatSnackBar) {
    this.books$ = this.store.pipe(select('book')); //select the specific slice of state, in this case 'book'
  }

  addBook(id:string, title: string, author: string) {
    const book: Book = {
      id: Number(id),
      title: title,
      author: author,
    }
    this.store.dispatch(addBook({ book }));
    this.snackBar.open(`Book "${title}" added successfully!`, 'Close');
  }

  removeBook(id: number) {
    this.store.dispatch(removeBook({ id })); 
    this.snackBar.open(`Book with ID ${id} removed successfully!`, 'Close');
  }

}