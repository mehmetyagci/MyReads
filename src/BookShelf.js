import React from 'react'
import Books from './Books'

function BookShelf(props) {
    const { name,  shelfBooks, changeBookShelf } = props;
    // console.log("BookShelf:props", props)
    
    function shelfNameCorrection(shelfName) 
    {
      if(name === "currentlyReading") 
      {
          return "Currently Reading";
      } 
      else if(name === "wantToRead") 
      {
        return "Want To Read";
      } 
      else if(name === "read") 
      {
        return "Read";
      } 
      else 
      {
        return name;
      }
    } 
    // some comments

  	return (
        <div className="bookshelf">
          <h2 className="bookshelf-title">{shelfNameCorrection(name)}</h2>
          <div className="bookshelf-books">
            <Books books={shelfBooks} changeBookShelf={changeBookShelf}/>                    
          </div>
        </div>              
    )
}

export default BookShelf;