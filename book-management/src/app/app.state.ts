import { Book } from './models/book';
export interface AppState {
   readonly book: Book[]; //ngrx name convention is to use the feature name as the key
   
}
