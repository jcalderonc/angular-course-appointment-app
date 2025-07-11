import { createReducer, on } from "@ngrx/store";
import { Book } from "../models/book";
import { addBook, addBookSuccess, addBookFailure, removeBook } from "./book.action";    

export const initialState:Book[] = [];
export const BookReducer = createReducer(
    initialState,
    on(addBook, (state) => {return state}),
    on(addBookSuccess, (state, { book }) => [...state, book]),
    on(addBookFailure, (state, {error})=> {
        console.error('Error adding book:', error);
        return state;
    }),
    on(removeBook, (state, { id }) => state.filter(book => book.id !== id)),
)