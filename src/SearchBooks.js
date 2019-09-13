/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react';
import Books from './Books';
import {Link} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';

class SearchBooks extends Component {
  constructor (props) {
    super (props);
    this.state = {
      searchTerm: "",
      filteredBooks: [],
    };
    this.onChange = this.onChange.bind (this); // binding this because onChange is called in another scope
    //console.log("SearchBooks2:props", props)
    //const { books, onChange, changeBookShelf } = props;
    //console.log("SearchBooks:props", props)
  }

  onChange (event) {
    const value = event.target.value.toLowerCase ();
    console.log ('onChange1:', value);
    if(value.length <= 0) 
    {
      this.setState({
        searchTerm: value,
        filteredBooks: []
      })
      return; 
    }

    BooksAPI.search (value, 10).then (apiResponse => {
      //console.log ('App:search:onChange2', apiResponse);
      console.log ('typeof:', typeof apiResponse);
      //console.log ('IsArray:', Array.isArray (apiResponse));

      if (Array.isArray (apiResponse)) {
        this.setState (
          {
            searchTerm: value,
            filteredBooks: apiResponse,
          },
          function () {
            console.log ('App:search:onChange3', this.state.filteredBooks);
          }
        );
      } else {
        this.setState (
          {
            searchTerm: value,
            filteredBooks: [],
          },
          function () {
            console.log ('App:search:onChange4', this.state.filteredBooks);
          }
        );
      }
    });
  }

  renderSearchedBooks () {
    console.log ('renderSearchedBooks');
    if (this.state.filteredBooks.length > 0) {
      console.log ('if');
      return (
        <div className="search-books-results">
          <Books
            books={this.state.filteredBooks}
            changeBookShelf={this.props.changeBookShelf}
          />
        </div>
      );
    } 
    else if(this.state.searchTerm.length > 0) 
    {
      console.log ('else');
      console.log ('this.state.searchTerm:', this.state.searchTerm);
      return <div className="search-books-results">No books find!</div>;
    }
  }

  render () {
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
        {this.renderSearchedBooks ()}
      </div>
    );
  }
} // end of component

export default SearchBooks;
