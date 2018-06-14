import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import ListBooks from "./ListBooks";
import SearchBooks from "./SearchBooks";
import { Route } from "react-router-dom";
class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { books: [] };
    this.changeBookType = this.changeBookType.bind(this);
  }

  /* 当组件BooksApp安装完成后，从后端获取图书数据。*/
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books: books });
    });
  }
  /* 显示下拉列表的选项 */
  displayDropdownItem(prevShelf, curShelf, dropDown) {
    /* 如果该图书以前就放在书架上，则显示之前隐藏的上个书架 */
    if (prevShelf) {
      dropDown.querySelector(`option[value=${prevShelf}]`).style.display =
        "block";
    } else {
      /* 若该图书以前不在书架上，则显示value值为"none"的项 */
      dropDown.querySelector(`option[value="none"]`).style.display = "block";
    }
    /* 把新选中的书架隐藏 */
    dropDown.querySelector(`option[value=${curShelf}]`).style.display = "none";
  }
  /* 更改客户端的books数组 */
  changeLocalBooksArr(book, curShelf) {
    const books = this.state.books;
    var idx = books.indexOf(book);
    /* 若图书已置于书架上 */
    if (book.shelf) {
      /* 若下拉列表选中了"None",则把该图书的shelf属性删除，
       * 同时从数组中删除该图书
      */
      if (curShelf === "none") {
        delete book.shelf;
        books.splice(idx, 1);
      } else {
        /* 若下拉列表选了除“None”以外的值，则修改数组中该图书的shelf属性*/
        books[idx]["shelf"] = curShelf;
      }
    } else {
      /* 若书架上没有图书*/
      book.shelf = curShelf;
      books.push(book);
    }
    this.setState({ books: books });
  }
  changeBookType(book, curShelf, dropDown) {
    BooksAPI.update(book, curShelf)
      .then(result => {
        this.displayDropdownItem(book.shelf, curShelf, dropDown);
        this.changeLocalBooksArr(book, curShelf);
      })
      .catch(error => {
        console.log(error);
        alert(
          "An error happens,the changes can't be saved on the server:" +
            error.toString()
        );
      });
  }

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <ListBooks
              books={this.state.books}
              changeBookType={this.changeBookType}
            />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <SearchBooks
              changeBookType={this.changeBookType}
              markedBooks={this.state.books}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
