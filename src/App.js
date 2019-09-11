/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import BookShelf from './BookShelf';
import Books from './Books';
import _ from 'lodash';
import {Route} from 'react-router-dom';
import {Link} from 'react-router-dom';

class BooksApp extends Component {
  constructor (props) {
    super (props);
    this.state = {
      books: [],
      filteredBooks: [],
    };
    this.onChange = this.onChange.bind (this); // binding this because onChange is called in another scope
  }

  onChange (event) {
    const value = event.target.value.toLowerCase ();
    console.log ('onChange1:', value);
    BooksAPI.search (value, 10).then (apiResponse => {
      console.log ('App:search:onChange2', apiResponse);
      console.log ('typeof:', typeof apiResponse);
      console.log ('IsArray:', Array.isArray (apiResponse));

      if (Array.isArray (apiResponse)) {
        this.setState (
          {
            filteredBooks: apiResponse,
          },
          function () {
            console.log ('App:search:onChange3', this.state.filteredBooks);
          }
        );
      } 
      else {
        this.setState (
          {
            filteredBooks: [],
          },
          function () {
            console.log ('App:search:onChange4', this.state.filteredBooks);
          }
        );
      }
    });
  }

  booksAPIgetAll () {
    try {
      BooksAPI.getAll ().then (apiResponse => {
        console.log ('App.js-componentDidMount-apiResponse', apiResponse);
        this.setState (
          {
            books: apiResponse,
          },
          function () {
            console.log (
              'App.js-componentDidMount-this.state.books',
              this.state.books
            );
            const shelfGroups = _.groupBy (this.state.books, 'shelf');
            console.log ('App.js-componentDidMount-shelfGroups', shelfGroups);
          }
        );
      });
    } catch (e) {
      console.log ('Exception', e);
      return;
    }
  }

  componentDidMount = () => {
    this.booksAPIgetAll ();
  };

  renderBooks () {
    return Object.entries (
      _.groupBy (this.state.books, 'shelf')
    ).map (([shelf, shelfBooks]) => {
      return (
        <div key={shelf}>
          <BookShelf
            name={shelf}
            shelfBooks={shelfBooks}
            onChangeBookShelf={this.changeBookShelf}
          />
        </div>
      );
    });
  }

  changeBookShelf = (bookId, shelf) => {
    const currentBook = this.state.books.filter (x => x.id === bookId);
    console.log ('currentBook', currentBook);
    BooksAPI.update (currentBook, shelf).then (apiResponse => {
      console.log ('App.js-changeBookShelf-apiResponse', apiResponse);
      this.setState (previousState => ({
        books: previousState.books.map (
          item =>
            item.id === bookId ? Object.assign (item, {shelf: shelf}) : item
        ),
      }));
    });
  };

  render () {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  {this.renderBooks ()}
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          )}
        />
        <Route
          path="/search"
          render={() => (
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
                  books={this.state.filteredBooks}
                  onChangeBookShelf={this.changeBookShelf}
                />
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
