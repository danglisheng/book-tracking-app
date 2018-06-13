import React,{ Component } from 'react'
import { Link } from 'react-router-dom'
import ListBooksTitle from './ListBooksTitle'
import ListBooksContent from './ListBooksContent'
class ListBooks extends Component {
	render(){
		return (
			<div className="list-books">
            <ListBooksTitle/>
            <ListBooksContent books={this.props.books} 
              changeBookType={this.props.changeBookType}
            />
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
			);
	}
}
export default ListBooks