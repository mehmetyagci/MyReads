import React from 'react';
import Books from './Books';
import PropTypes from 'prop-types';

function BookShelf (props) {
  const {name, shelfBooks, changeBookShelf} = props;

  function findCorrectShelfName (shelfName) {
    if (name === 'currentlyReading') {
      return 'Currently Reading';
    } else if (name === 'wantToRead') {
      return 'Want To Read';
    } else if (name === 'read') {
      return 'Read';
    } else {
      return name;
    }
  }

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{findCorrectShelfName (name)}</h2>
      <div className="bookshelf-books">
        <Books books={shelfBooks} changeBookShelf={changeBookShelf} />
      </div>
    </div>
  );
}

BookShelf.propTypes = {
  name: PropTypes.string,
  shelfBooks: PropTypes.array,
  changeBookShelf: PropTypes.func.isRequired,
};

export default BookShelf;
