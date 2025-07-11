import { createAction, props} from '@ngrx/store';
import { Book } from '../models/book';  

export const addBook = createAction(
  '[Book] Add Book', 
  props<{ book: Book }>()
);

export const addBookSuccess = createAction(
  '[Book] Add Book Success', 
  props<{ book: Book }>()
);

export const addBookFailure = createAction(
  '[Book] Add Book Failure', 
  props<{ error:any }>()
);


export const removeBook = createAction(
  '[Book] Remove Book', 
  props<{ id: number }>()
);
