import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

function Books (props) {
  const {books, changeBookShelf} = props;

  return (
    <ol className="books-grid">
      {books &&
        books.map ((book, index) => (
          <li key={index}>
            <Book book={book} changeBookShelf={changeBookShelf} />
          </li>
        ))}
    </ol>
  );
}

Books.propTypes = {
  books: PropTypes.array,
  changeBookShelf: PropTypes.func.isRequired,
};

export default Books;
