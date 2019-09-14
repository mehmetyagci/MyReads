/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import ListBooks from './ListBooks';
import _ from 'lodash';
import {Route} from 'react-router-dom';
import SearchBooks from './SearchBooks'

class BooksApp extends Component {
  constructor (props) {
    super(props);
    this.state = {
      books: [],
    };
  }

  componentDidMount = () => {
    this.booksAPIgetAll();
  };

  booksAPIgetAll () {
    try {
        BooksAPI.getAll().then(apiResponse => {
        //console.log ('App-booksAPIgetAll', apiResponse);
        this.setState (
          {
            books: apiResponse,
          },
          function () {
            //console.log ('App.js-componentDidMount1-this.state.books',this.state.books);
            //const shelfGroups = _.groupBy (this.state.books, 'shelf');
            //console.log ('App.js-componentDidMount2-shelfGroups', shelfGroups);
          }
        );
      });
    } catch (e) {
      console.log ('Exception', e);
      return;
    }
  }  

  changeBookShelf = (book, shelf) => {
    //debugger;
    //const bookId = book.id;
    //const currentBook = this.state.books.find(x => x.id === bookId);
    //console.log('changeBookShelf:book', book);
    //console.log('changeBookShelf:shelf', shelf)
    BooksAPI.update (book, shelf).then (apiResponse => {
      console.log ('App-changeBookShelf-apiResponse', apiResponse);
      this.booksAPIgetAll();
      /*
      this.setState (previousState => ({
        books: previousState.books.map (
          item =>  item.id === bookId ? Object.assign (item, {shelf: shelf}) : item
        ),
      }));
      */
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
            <SearchBooks changeBookShelf={this.changeBookShelf} myReadBooks={this.state.books} />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
