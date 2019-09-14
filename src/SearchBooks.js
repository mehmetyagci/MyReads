/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react';
import Books from './Books';
import {Link} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import PropTypes from 'prop-types';

class SearchBooks extends Component {
  constructor (props) {
    super (props);
    this.state = {
      searchTerm: '',
      filteredBooks: [],
      error: false,
    };
    this.onChange = this.onChange.bind (this); // binding this because onChange is called in another scope
  }

  onChange (event) {
    const value = event.target.value.toLowerCase ();
    if (value === undefined || value.trim ().length <= 0) {
      this.setState ({
        searchTerm: value,
        filteredBooks: [],
      });
      return;
    }

    BooksAPI.search (value, 10)
      .then (searchedBooks => {
        const tempMyBooks = this.props.myReadBooks;
        if (Array.isArray (searchedBooks)) {
          searchedBooks.forEach (function (searchedBook) {
            if (tempMyBooks.length > 0) {
              const myRead = tempMyBooks.find (y => y.id === searchedBook.id);
              if (myRead !== undefined) {
                searchedBook['shelf'] = myRead.shelf;
              }
            }
          });

          this.setState ({
            searchTerm: value,
            filteredBooks: searchedBooks,
          });
        } else {
          this.setState ({
            searchTerm: value,
            filteredBooks: [],
          });
        }
      })
      .catch (err => {
        console.log (err);
        this.setState ({error: true});
      });
  }

  renderSearchedBooks () {
    if (this.state.filteredBooks.length > 0) {
      return (
        <div className="search-books-results">
          <Books
            books={this.state.filteredBooks}
            changeBookShelf={this.props.changeBookShelf}
          />
        </div>
      );
    } else if (this.state.searchTerm.length > 0) {
      return (
        <div className="search-books-results">
          <h4>No result for: "{this.state.searchTerm}"</h4>
        </div>
      );
    }
  }

  render () {
    if (this.state.error) {
      return <div>An error occured. Please, try again later.</div>;
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              onChange={this.onChange}
              placeholder="Search by title or author"
              autoFocus
            />
          </div>
        </div>
        {this.renderSearchedBooks ()}
      </div>
    );
  } // end of render
} // end of component

SearchBooks.propTypes = {
  myReadBooks: PropTypes.array,
  changeBookShelf: PropTypes.func.isRequired,
};

export default SearchBooks;
