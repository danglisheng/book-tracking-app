import React,{ Component } from 'react'
class Book extends Component {
  componentDidMount() {
    /* 获取代表该Book组件的DOM节点，并将它保存为实例属性。*/
    const bookNode=document.getElementById(`${this.props.book.id}`);
    var curShelf=this.props.book.shelf;
    this.bookNode=bookNode;
    /* 将该Book组件里下拉列表中value值为"move"的项设为选中状态。*/
    bookNode.querySelector(`option[value="move"]`).setAttribute("selected","");
    /* 如果这本书在某个书架上，则将下拉列表中该书架项隐藏；*/
    if(curShelf){
      bookNode.querySelector(`option[value=${curShelf}]`).style.display="none";
    }
    /* 否则，把下拉列表中value值为“none”的项隐藏。*/
    else {
      bookNode.querySelector(`option[value='none']`).style.display="none";
    }
  }
  /* 下拉列表change事件的处理函数 */
  handleSelect(e) {
    const prevShelf=this.props.book.shelf;
    const curShelf=e.target[e.target.selectedIndex].value;
    const bookNode=this.bookNode;
    /* 如果该图书以前就放在书架上，则显示之前隐藏的上个书架 */
    if(prevShelf){
      bookNode.querySelector(`option[value=${prevShelf}]`).style.display="block";
    }
    /* 若该图书以前不在书架上，则显示value值为"none"的项 */
    else{
      bookNode.querySelector(`option[value="none"]`).style.display="block";
    }
    /* 把新选中的书架隐藏 */
    bookNode.querySelector(`option[value=${curShelf}]`).style.display="none";
    /* 调用定义在app.js中的回调函数 */
    this.props.changeBookType(this.props.book,curShelf);
    
  }
	render() {
    const book=this.props.book;
    const shelves={
      "currentlyReading":"Currently Reading",
      "wantToRead":"Want to Read",
      "read":"Read"
    }
		return (
			<div className="book" id={book.id}>
        <div className="book-top">
          <div className="book-cover" 
          style={{ width: 128, height: 193, 
            backgroundImage: `url(${(book.imageLinks&&book.imageLinks.thumbnail)?book.imageLinks.thumbnail:''})` }}>
              {/*如果处于搜索页面且图书位于书架上，则显示书架信息，否则不显示*/}
              {(this.props.fromSearchPage&&book.shelf)?
               (<span className="shelf-desc">{shelves[book.shelf]}</span>):
               (<span></span>)}
          </div>
          <div className="book-shelf-changer">
            <select onChange={this.handleSelect.bind(this)}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{(book.authors)?
          book.authors.join(';'):''}</div>
        
      </div>
			);
	}
}
export default Book