import React,{ Component } from 'react'
import BookShelf from './BookShelf'
class ListBooksContent extends  Component {
  render() {
    const titles=['Currently Reading','Want to Read','Read'];
    const shelves=['currentlyReading','wantToRead','read'];
    /* 标题数组和书架数组是一一对应的，遍历标题数组，
     * 对于每个title,都利用filter()方法从原数组books中
     * 筛选出具有与它相对应的shelf属性的图书，组成一个新数组classifiedBooks。
     * 然后，把classifiedBooks作为books属性传递给BookShelf组件。
     * 最后返回BookShelf组件，作为数组bookShelves的元素。
    */
    const bookShelves=titles.map((title,idx)=>{
      const classifiedBooks=this.props.books.filter(
        (book)=>book.shelf===shelves[idx]);
      
      return <BookShelf title={title} books={ classifiedBooks } key={ shelves[idx] }
        changeBookType={ this.props.changeBookType }
      />
      }); 
    
		return (
			<div className="list-books-content">
        <div>
          { bookShelves }
        </div>
      </div>
			);
	}
}
export default ListBooksContent