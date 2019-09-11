/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import Books from './Books'
import _ from "lodash";
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'

class BooksApp extends Component {
  
  constructor(props) { 
    super(props); 
    this.state = { 
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


      <Route exact path='/' render={() => 
        (
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
            <Link  
            to='/search'>Add a book</Link>
          </div>
        </div>
        )
      } />
      <Route path='/search' render={() => (
        <div className="search-books">
            <div className="search-books-bar">
              <Link 
                to='/'
                className="close-search" 
                >Close</Link>
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


        
      )} />
      </div>
    )
  }
}

export default BooksApp
