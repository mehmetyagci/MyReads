import React from 'react'
import BookCover from './BookCover'
import BookShelfChanger from './BookShelfChanger'

function Book(props) {
  const { book, onChangeBookShelf } = props;
  console.log("Book:props=", props)
  return(
     <div className="book">
        <div className="book-top">
        	<BookCover width={128} height={193} backgroundImage= {`url(${book.imageLinks.smallThumbnail})`} />
    		<BookShelfChanger book={book}  onChangeBookShelf={onChangeBookShelf} />
    	</div>
    	<div className="book-title">{book.title}</div>
    	<div className="book-authors">{book.authors}</div>
    </div>
  )
}

export default Book