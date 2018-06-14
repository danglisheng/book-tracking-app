import React from "react";
import { Link } from "react-router-dom";
import ListBooksTitle from "./ListBooksTitle";
import ListBooksContent from "./ListBooksContent";
function ListBooks(props) {
  return (
    <div className="list-books">
      <ListBooksTitle />
      <ListBooksContent
        books={props.books}
        changeBookType={props.changeBookType}
      />
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
}
export default ListBooks;
