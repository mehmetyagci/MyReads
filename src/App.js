/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import ListBooks from './ListBooks';
import _ from 'lodash';
import {Route} from 'react-router-dom';
import SearchBooks from './SearchBooks';

class BooksApp extends Component {
  constructor (props) {
    super (props);
    this.state = {
      books: [],
      error: false,
    };
  }

  componentDidMount = () => {
    this.getAllBooksFromAPI ();
  };

  getAllBooksFromAPI () {
    BooksAPI.getAll ()
      .then (apiResponse => {
        this.setState ({
          books: apiResponse,
        });
      })
      .catch (err => {
        console.log (err);
        this.setState ({error: true});
      });
  }

  changeBookShelf = (book, shelf) => {
    BooksAPI.update (book, shelf)
      .then (apiResponse => {
        this.getAllBooksFromAPI ();
      })
      .catch (err => {
        console.log (err);
        this.setState ({error: true});
      });
  };

  render () {
    if (this.state.error) {
      return <div>An error occured. Please, try again later.</div>;
    }

    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <ListBooks
              books={this.state.books}
              changeBookShelf={this.changeBookShelf}
            />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <SearchBooks
              changeBookShelf={this.changeBookShelf}
              myReadBooks={this.state.books}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
