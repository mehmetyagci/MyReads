import React from 'react'
import Books from './Books'

function BookShelf(props) {
    const { name,  shelfBooks, changeBookShelf } = props;
    //console.log("BookShelf:props", props)
  
  	return (
                <div className="bookshelf">
                  <h2 className="bookshelf-title">{name}</h2>
                  <div className="bookshelf-books">
						        <Books books={shelfBooks} changeBookShelf={changeBookShelf}/>                    
                  </div>
                </div>              
    )
}

export default BookShelf;