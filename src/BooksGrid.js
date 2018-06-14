import React from 'react'
import Book from './Book'
function BooksGrid(props) {
	return (
			<ol className="books-grid">
				{
					props.books.map((book)=>{
						return (
							<li key={ book.id }>
								<Book  book={ book }
								changeBookType={ props.changeBookType }
								fromSearchPage={ props.fromSearchPage}/>
							</li>
							)
					})
				}
			</ol>
			);
}
export default BooksGrid