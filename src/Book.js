import React from 'react'
import BookShelfChanger from './BookShelfChanger'

function Book (props) {
  const { book, changeBookShelf } = props;
  //console.log("Book:props:book", book)

  return (
    book !== undefined ? ( 
     <div className="book">
        <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${(book.imageLinks && book.imageLinks.smallThumbnail) || "../public/book.jpg"})` }}></div>
        <BookShelfChanger book={book}  changeBookShelf={changeBookShelf} />
    	</div>
    	<div className="book-title">{book.title}</div>
    	<div className="book-authors">{book.authors}</div>
    </div>
    ) : 
    (
      <div></div>
    )
  )
}

export default Book