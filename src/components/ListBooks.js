import Book from "./Book";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

const ListBooks = ({books, onUpdate}) => {
    return (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {
                        books.filter(e => e.shelf === "currentlyReading").map(o =>
                          <li key={o.id}>
                            <Book book={o} onUpdate={onUpdate}/>
                          </li>
                        )
                    }
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {
                        books.filter(e => e.shelf === "wantToRead").map(o =>
                          <li key={o.id}>
                            <Book book={o} onUpdate={onUpdate}/>
                          </li>
                        )
                    }
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {
                        books.filter(e => e.shelf === "read").map(o =>
                          <li key={o.id}>
                            <Book book={o} onUpdate={onUpdate}/>
                          </li>
                        )
                    }
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="open-search">
            <Link to={"/search"} className="add-contact">
              Add Contact
            </Link>
          </div>
        </div>
    );
}

ListBooks.propTypes = {
  books: PropTypes.array.isRequired,
  onUpdate: PropTypes.func.isRequired
};

export default ListBooks;