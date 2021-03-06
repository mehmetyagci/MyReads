import React from 'react';
import {Link} from 'react-router-dom';
import _ from 'lodash';
import BookShelf from './BookShelf';
import PropTypes from 'prop-types';

function ListBooks (props) {
  const {books, changeBookShelf } = props;
  // console.log("books:",books)

  var priorityIndex = {currentlyReading: 1, wantToRead: 2, read: 3 };
  books.sort((a, b) =>  priorityIndex[a.shelf] - priorityIndex[b.shelf]);
  // console.log("orderedBooks", books);
  const shelfBooks = Object.entries (_.groupBy (books, 'shelf'));

  const arrangedBooks = shelfBooks.map (([shelf, shelfBooks]) => {
    return (
      <div key={shelf}>
        <BookShelf
          name={shelf}
          shelfBooks={shelfBooks}
          changeBookShelf={changeBookShelf}
        />
      </div>
    );
  });

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>My Reads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {arrangedBooks}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
}

ListBooks.propTypes = {
  books: PropTypes.array,
  changeBookShelf: PropTypes.func.isRequired,
};

export default ListBooks;
