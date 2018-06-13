import React,{ Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BooksGrid from './BooksGrid'
class SearchBooks extends Component {
  state= {
    books:[]
  }
  /* 组件安装后，获取显示错误信息的节点，并将其保存为实例属性*/
  componentDidMount(){
    var searchResult=document.getElementById("searchResult");
    var errorNode=searchResult.querySelector(".errorMsg");
    this.errorNode=errorNode;
  }
  /* 文本框change事件的处理函数*/
  searchItem(e) {
    const target=e.target;
    /* 若文本框被清空，则清空books数组，不显示错误信息*/
    if(target.value===''){
      this.errorNode.style.display="none";
      this.setState({books:[]});
      return;
    }
    BooksAPI.search(target.value).then(books=>{
       /* 如果books是数组，则执行两层循环，
        * 外层循环遍历查询结果，内层循环遍历书架上的书籍，
        * 如果查询结果中有已存在于书架上的书，则将book变量指向书架上
        * 的那个book对象，并在外层循环中返回各book变量，从而
        * 构成一个新的books数组，最后把books数组保存到state中。
        */
       if(Array.isArray(books)) {
          
          /* 由于网络请求是个异步过程，所以当拿到后端返回的结果后
           * 需再次检查文本框的值，若此时文本框为空，即使返回的结果有效，
           * 也不显示。
           */
          if(target.value===''){
            this.errorNode.style.display="none";
            this.setState({books:[]});
            return;
        }
          books=books.map((book,bookidx)=>{
            this.props.markedBooks.forEach((mkbook,mkbookidx)=>{
              if(mkbook.id===book.id){
                book=mkbook;
              }
            })
          return book;
          });
          this.errorNode.style.display="none";
          this.setState({books:books})
       }
       /* 如果books不是数组，说明未查询到图书，显示错误信息，清空books数组*/
       else {
          this.errorNode.style.display="block";
          this.setState({books:[]})
       }
    })
  }
	render() {
		return (
			<div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/" >Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"
                  onChange={(e)=>{this.searchItem(e);}}
                />

              </div>
            </div>
            <div className="search-books-results" id='searchResult'>
             <BooksGrid books={ this.state.books }
             changeBookType={this.props.changeBookType}
             fromSearchPage={true}
              />
              <span className="errorMsg">No matched books for your query</span>
            </div>
          </div>
			);
	}
}
export default SearchBooks