import React from 'react';
import BookShelfChanger from './BookShelfChanger';
import PropTypes from 'prop-types';

function Book (props) {
  const {book, changeBookShelf} = props;

  return book !== undefined
    ? <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${(book.imageLinks && book.imageLinks.smallThumbnail) || '../public/book.jpg'})`,
            }}
          />
          <BookShelfChanger book={book} changeBookShelf={changeBookShelf} />
        </div>
        <div className="book-title">{book.title}</div>
        {book.authors
          ? book.authors.length > 1
              ? book.authors.map (author => (
                  <div key={author} className="book-authors">{author}</div>
                ))
              : <div className="book-authors">{book.authors}</div>
          : <div className="book-authors">Unknown</div>}

      </div>
    : <div />;
}

Book.propTypes = {
  books: PropTypes.object,
  changeBookShelf: PropTypes.func.isRequired,
};

export default Book;
