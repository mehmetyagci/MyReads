import React from 'react'
import { Link } from 'react-router-dom';
import _ from 'lodash';
import BookShelf from './BookShelf';

function ListBooks(props) {
    console.log("ListBooks:props:", props)
    const { books, changeBookShelf } = props;

    const shelfBooks = Object.entries(_.groupBy(books, 'shelf'));

    const arrangedBooks = shelfBooks.map(([shelf, shelfBooks]) => {
        return (
            <div key={shelf}>
                <BookShelf
                    name={shelf}
                    shelfBooks={shelfBooks}
                    changeBookShelf={changeBookShelf}
                />
            </div>
        );
    });

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    {arrangedBooks}
                </div>
            </div>
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
        </div>
    )
}

export default ListBooks;