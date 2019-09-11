/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import Books from './Book'
import { Link } from 'react-router-dom'

export default class SearchBooks extends Component {

  constructor(props) 
  { 
    super(props); 
    console.log("SearchBooks:props", props)
    this.state = { 
    filteredBooks: []
    }; 
  } 

    render() {
        return (
            <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/search">Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" onChange={this.onChange}  placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
			      <Books books={this.state.filteredBooks} onChangeBookShelf={this.changeBookShelf}/>                    
            </div>
          </div>
        )
    }
}
