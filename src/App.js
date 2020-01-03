import React, {Component} from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import ListBooks from './ListBooks';
import {Route} from 'react-router-dom';
import SearchBooks from './SearchBooks';

class BooksApp extends Component {
  constructor (props) {
    super (props);
    this.state = {
      myBooks: [],
      searchBooks: [],
      error: false,
    };
  }

  componentDidMount = () => {
    this.getAllBooksFromAPI ();
  };

  getAllBooksFromAPI () {
    BooksAPI.getAll ()
      .then (apiAllBooksResponse => {
        this.setState ({
          myBooks: apiAllBooksResponse,
        });
      })
      .catch (err => {
        console.log (err);
        this.setState ({error: true});
      });
  }

  onChangeBookShelf = (book, shelf) => {
    BooksAPI.update (book, shelf)
      .then (apiUpdateResponse => {
        // console.log ('update:result:', apiUpdateResponse);
      })
      .catch (err => {
        console.log (err);
        this.setState ({error: true});
      });

    if (shelf === 'none') 
    {
      this.setState(prevState => ({
        myBooks: prevState.myBooks.filter(b => b.id !== book.id)
      }));
    } 
    else 
    {
     book.shelf = shelf;
      this.setState(prevState => ({
        myBooks: prevState.myBooks.filter(b => b.id !== book.id).concat(book)
      }));
    }
    // console.log ('onChangeBookShelf:this.state.myBooks', this.state.myBooks);
  };

  onSearchBooks = searchTerm => {
    BooksAPI.search (searchTerm, 10)
      .then (apiSearchedBooks => {
        // console.log ('apiSearchedBooks', apiSearchedBooks);
        if (Array.isArray (apiSearchedBooks)) {
          // console.log ('search1');
          let newItems = apiSearchedBooks.map (apiSearchedBook => {
            this.state.myBooks.map (myBook => {
              if (myBook.id === apiSearchedBook.id) {
                apiSearchedBook.shelf = myBook.shelf;
                // console.log ('apiSearchedBook.shelf', myBook.title + ' ' + apiSearchedBook.shelf);
              }
              return myBook;
            });
            return apiSearchedBook;
          });
          // console.log ('newItems:', newItems);
          //this.setState ({filteredBooks: newItems});
          this.setState ({
            searchBooks: newItems,
          });
        } else {
          // console.log ('search2');
          this.setState ({
            searchBooks: [],
          });
        }
      })
      .catch (err => {
        console.log (err);
        this.setState ({error: true});
      });
  };

  onClearSearchBooks = () => {
    this.setState ({searchBooks: []});
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
              books={this.state.myBooks}
              changeBookShelf={this.onChangeBookShelf}
            />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <SearchBooks
              filteredBooks={this.state.searchBooks}
              myReadBooks={this.state.myBooks}
              changeBookShelf={this.onChangeBookShelf}
              searchBooks={this.onSearchBooks}
              clearSearchBooks={this.onClearSearchBooks}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
