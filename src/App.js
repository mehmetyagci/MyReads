/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import Books from './Books'
import _ from "lodash";

class BooksApp extends Component {
  
  constructor(props) { 
    super(props); 
    this.state = { 
     /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: true,
    books: [],
    filteredBooks: []
    }; 
    this.onChange = this.onChange.bind(this); // binding this because onChange is called in another scope
  }   
  
  onChange(event) {
    const value = event.target.value.toLowerCase();
    console.log("onChange:",value)
    const filteredBooks = this.state.books.slice().filter((item)=> {
            // algorithm to search through the `data` array
       		return item.title.toLowerCase().indexOf(value) !== -1;  // returns true or false
    })
    this.setState({
       		filteredBooks: filteredBooks
     	}, function () {
		   console.log('filteredBooks', filteredBooks);    
		})
  }
    
  booksAPIgetAll() {
   	BooksAPI.getAll()
    .then(apiResponse =>  {
  		console.log("App.js-componentDidMount-apiResponse", apiResponse);
     	this.setState({
       		books: apiResponse,
            filteredBooks: apiResponse
     	}, function () {
 		   console.log("App.js-componentDidMount-this.state.books", this.state.books);
           const shelfGroups = _.groupBy(this.state.books,  'shelf')
		   console.log("App.js-componentDidMount-shelfGroups", shelfGroups)
		})
   	})      
  }
  
 componentDidMount = () => {
   this.booksAPIgetAll()   
  };

renderBooks() {
	return Object.entries(_.groupBy(this.state.books,  'shelf')).map(([shelf, shelfBooks]) => {
        return (
            <div key={shelf}>              
				<BookShelf name={shelf} shelfBooks={shelfBooks} onChangeBookShelf={this.changeBookShelf}  />
            </div>
        )
    })
}

changeBookShelf = (bookId, shelf) => {
    const currentBook = this.state.books.filter(x => x.id === bookId)
  	console.log("currentBook", currentBook);
    BooksAPI.update(currentBook, shelf)
    .then(apiResponse =>  {
      console.log("App.js-changeBookShelf-apiResponse", apiResponse);
      this.setState((previousState) => ({
      	books: previousState.books.map(item => item.id === bookId 
        	? Object.assign(item, {shelf: shelf}) 
        	: item)
    	}));
   	})     
}

  render() {   
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
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
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
          		{this.renderBooks()}
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
