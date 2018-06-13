import React,{ Component } from 'react'
import Book from './Book'
class BooksGrid extends Component {
	render() {
		return (
			<ol className="books-grid">
				{
					this.props.books.map((book)=>{
						return (
							<li key={ book.id }>
								<Book  book={ book }
								changeBookType={ this.props.changeBookType }
								fromSearchPage={ this.props.fromSearchPage}/>
							</li>
							)
					})
				}
			</ol>
			);
	}
}
export default BooksGrid