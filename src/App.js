import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import { Route } from 'react-router-dom'
class BooksApp extends React.Component {
  state = {
    books:[]
  }
  /* 当组件BooksApp安装完成后，从后端获取图书数据。*/
  componentDidMount() {
    BooksAPI.getAll().then((books)=>{
      this.setState({books:books});
    })
  }
  changeBookType(book,shelf) {
    const books=this.state.books;
    var idx=books.indexOf(book);
    /* 若图书已置于书架上 */
    if(book.shelf) {
      /* 若下拉列表选中了"None",则把该图书的shelf属性删除，
       * 同时从数组中删除该图书
      */
      if(shelf==="none"){
        delete book.shelf;
        books.splice(idx,1);
      }
      /* 若下拉列表选了除“None”以外的值，则修改数组中该图书的shelf属性*/
      else {
        books[idx]["shelf"]=shelf;
      }
    }
    /* 若书架上没有图书*/
    else {
      book.shelf=shelf;
      books.push(book);
    }
    this.setState({ books:books}); 
    BooksAPI.update(book,shelf);
  }
  
  render() {
    
    return (
      <div className="app">
        <Route exact path="/" 
          render={()=>(
            <ListBooks books={this.state.books} 
              changeBookType={this.changeBookType.bind(this)}
            />)}
        />
        <Route path="/search"
          render={ ()=>(
            <SearchBooks
            changeBookType={this.changeBookType.bind(this)}
            markedBooks={ this.state.books }
            />

            )}
        />
        
      </div>
    )
  }
}

export default BooksApp
