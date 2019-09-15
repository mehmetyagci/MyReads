/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react';
import Books from './Books';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

class SearchBooks extends Component {
  constructor (props) {
    super (props);
    // console.log ('SearchBooks:props:', props);
    this.state = {
      searchTerm: '',
    };
    this.onChange = this.onChange.bind (this); // binding this because onChange is called in another scope
  }

  onChange (event) {
    const value = event.target.value.toLowerCase ();
    this.setState (
      {
        searchTerm: value,
      },
      function () {
        if (value !== undefined && value.length > 0) {
          this.props.searchBooks (value);
        } else {
          this.props.clearSearchBooks ();
        }
      }
    );
  }

  renderSearchedBooks () {
    if (this.props.filteredBooks.length > 0) {
      return (
        <div className="search-books-results">
          <Books
            books={this.props.filteredBooks}
            changeBookShelf={this.props.changeBookShelf}
          />
        </div>
      );
    } else if (this.state.searchTerm.length > 0) {
      return (
        <div className="search-books-results">
          <h4>No result found for: "{this.state.searchTerm}"</h4>
        </div>
      );
    }
  }

  handleClick = event => {
      this.props.clearSearchBooks ();
  };

  render () {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to="/"
            className="close-search"
            onClick={this.handleClick.bind (this)}
          >
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              onChange={this.onChange}
              placeholder="Search by title or author"
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
