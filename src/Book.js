import React, { Component } from "react";
class Book extends Component {
  constructor(props) {
    super(props);
    this.dropDown = React.createRef();
  }
  /* 初始化下拉按钮选项 */
  initializeDropdownItem(dropDown, curShelf) {
    /* 将该Book组件里下拉列表中value值为"move"的项设为选中状态。*/
    dropDown.querySelector(`option[value="move"]`).setAttribute("selected", "");
    /* 如果这本书在某个书架上，则将下拉列表中该书架项隐藏；*/
    if (curShelf) {
      dropDown.querySelector(`option[value=${curShelf}]`).style.display =
        "none";
    } else {
    /* 否则，把下拉列表中value值为“none”的项隐藏。*/
      dropDown.querySelector(`option[value='none']`).style.display = "none";
    }
  }
  componentDidMount() {
    const dropDown = this.dropDown.current;
    var curShelf = this.props.book.shelf;
    this.initializeDropdownItem(dropDown, curShelf);
  }
  /* 下拉列表change事件的处理函数 */
  handleSelect(e) {
    const curShelf = e.target[e.target.selectedIndex].value;
    const dropDown = this.dropDown.current;
    /* 调用定义在app.js中的回调函数 */
    this.props.changeBookType(this.props.book, curShelf, dropDown);
  }
  render() {
    const book = this.props.book;
    const shelves = {
      currentlyReading: "Currently Reading",
      wantToRead: "Want to Read",
      read: "Read"
    };
    return (
      <div className="book" id={book.id}>
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${
                book.imageLinks && book.imageLinks.thumbnail
                  ? book.imageLinks.thumbnail
                  : ""
              })`
            }}
          >
            {/*如果处于搜索页面且图书位于书架上，则显示书架信息，否则不显示*/}
            {this.props.fromSearchPage && book.shelf ? (
              <span className="shelf-desc">{shelves[book.shelf]}</span>
            ) : (
              <span />
            )}
          </div>
          <div className="book-shelf-changer">
            <select onChange={this.handleSelect.bind(this)} ref={this.dropDown}>
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {book.authors ? book.authors.join(";") : ""}
        </div>
      </div>
    );
  }
}
export default Book;
