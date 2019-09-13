/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import Books from './Book'
import { Link } from 'react-router-dom'

function SearchBooks(props) {
  console.log("SearchBooks:props", props)   
  const { books, onChange, changeBookShelf } = props;  
    console.log("SearchBooks:props", props)   
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              onChange={this.onChange}
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          <Books
            books={books}
            changeBookShelf={changeBookShelf}
          />
        </div>
      </div>
    )  
}

export default SearchBooks;
