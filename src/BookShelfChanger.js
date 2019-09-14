import React, {Component} from 'react';
import PropTypes from 'prop-types';

class BookShelfChanger extends Component {
  constructor (props) {
    super (props);
    this.state = {
      bookShelf: this.props.book.shelf ? this.props.book.shelf : 'none',
    };
    this.handleChange = this.handleChange.bind (this);
  }

  handleChange (event) {
    this.setState (
      {
        bookShelf: event.target.value,
      },
      function () {
        this.props.changeBookShelf (this.props.book, this.state.bookShelf);
      }
    );
  }

  render () {
    return (
      <div className="book-shelf-changer">
        <select value={this.state.bookShelf} onChange={this.handleChange}>
          <option value="move" disabled="disabled">Move to...</option>
          <option
            value="currentlyReading"
            disabled={this.state.bookShelf === 'currentlyReading' ? true : null}
          >
            Currently Reading
          </option>
          <option
            value="wantToRead"
            disabled={this.state.bookShelf === 'wantToRead' ? true : null}
          >
            Want to Read
          </option>
          <option
            value="read"
            disabled={this.state.bookShelf === 'read' ? true : null}
          >
            Read
          </option>
          <option
            value="none"
            disabled={
              !(this.state.bookShelf === 'currentlyReading' ||
                this.state.bookShelf === 'wantToRead' ||
                this.state.bookShelf === 'read')
                ? true
                : null
            }
          >
            None
          </option>
        </select>
      </div>
    );
  }
}

BookShelfChanger.propTypes = {
  book: PropTypes.object,
  changeBookShelf: PropTypes.func.isRequired,
};

export default BookShelfChanger;
