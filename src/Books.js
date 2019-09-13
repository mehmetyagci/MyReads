import React from 'react'
import Book from './Book'

function Books(props) {
    const { books, changeBookShelf } = props;
    //console.log("Books:props", props)
  
    return (
    		<ol className="books-grid">
                {
               		 books && books.map((book, index) => (
               			 <li key={index}>
           					 <Book book={book} changeBookShelf={changeBookShelf} />
                		 </li>						
                	))
                }
            </ol>
    )
}
  
export default Books;