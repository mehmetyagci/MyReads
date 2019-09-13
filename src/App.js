/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import ListBooks from './ListBooks';
import BookShelf from './BookShelf';
import Books from './Books';
import _ from 'lodash';
import {Route} from 'react-router-dom';
import {Link} from 'react-router-dom';
import SearchBooks from './SearchBooks'

class BooksApp extends Component {
  constructor (props) {
    super(props);
    this.state = {
      books: [],
      filteredBooks: [],
    };
    this.onChange = this.onChange.bind(this); // binding this because onChange is called in another scope
  }

  componentDidMount = () => {
    this.booksAPIgetAll();
  };

  booksAPIgetAll () {
    try {
      BooksAPI.getAll().then(apiResponse => {
        console.log ('App-booksAPIgetAll', apiResponse);
        this.setState (
          {
            books: apiResponse,
          },
          function () {
            console.log ('App.js-componentDidMount1-this.state.books',this.state.books);
            const shelfGroups = _.groupBy (this.state.books, 'shelf');
            console.log ('App.js-componentDidMount2-shelfGroups', shelfGroups);
          }
        );
      });
    } catch (e) {
      console.log ('Exception', e);
      return;
    }
  }  


  onChange (event) {
    const value = event.target.value.toLowerCase ();
    //console.log ('onChange1:', value);
    BooksAPI.search (value, 10).then (apiResponse => {
      //console.log ('App:search:onChange2', apiResponse);
      //console.log ('typeof:', typeof apiResponse);
      //console.log ('IsArray:', Array.isArray (apiResponse));

      if (Array.isArray (apiResponse)) {
        this.setState (
          {
            filteredBooks: apiResponse,
          },
          function () {
            //console.log ('App:search:onChange3', this.state.filteredBooks);
          }
        );
      } 
      else {
        this.setState (
          {
            filteredBooks: [],
          },
          function () {
            //console.log ('App:search:onChange4', this.state.filteredBooks);
          }
        );
      }
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
            <ListBooks books={this.state.books} changeBookShelf={this.changeBookShelf} />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <SearchBooks books={this.state.filteredBooks} onChange={this.onChange} changeBookShelf={this.changeBookShelf} />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
