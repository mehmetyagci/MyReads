import React, { Component }  from 'react'
import * as BooksAPI from './BooksAPI'

class BookShelfChanger extends React.Component {
  constructor(props) {
    super(props);
    //console.log("BookShelfChanger:props", this.props);
    //const { book, changeBookShelf } = props	
    this.state = {bookShelf: this.props.book.shelf};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    //console.log("event:", event)
    this.setState({
      	bookShelf: event.target.value
    }, function() {
     // console.log("BookShelfChanger:Book", this.props.book)
	  //console.log("BookShelfChanger:handleChange1=", this.state.bookShelf)
      this.props.changeBookShelf(this.props.book.id, this.state.bookShelf);
    });
  }
  
  render () {
    return (
          <div className="book-shelf-changer">
              <select defaultValue='move' onChange={this.handleChange}>
                <option value="move" disabled="disabled">Move to...</option>
                <option value="currentlyReading" disabled={this.state.bookShelf === "currentlyReading" ? true : null}>Currently Reading</option>
                <option value="wantToRead" disabled={this.state.bookShelf === "wantToRead" ? true : null}>Want to Read</option>
                <option value="read" disabled={this.state.bookShelf === "read" ? true : null}>Read</option>
                <option value="none">None</option>
              </select>
    		</div>
    	)
	}
}

export default BookShelfChanger