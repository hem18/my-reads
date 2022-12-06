import BookShelfChanger from "./BookShelfChanger";
import {Link} from "react-router-dom";

const ListBooks = ({books, onUpdate}) => {
    const shelfChange = (shelf, book) => {
        if (onUpdate) {
           onUpdate(book, shelf);
        }
    }
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
                                <div className="book">
                                    <div className="book-top">
                                        <div
                                            className="book-cover"
                                            style={{
                                            width: 128,
                                            height: 192,
                                            backgroundImage: `url(${o.imageLinks.thumbnail})`                            
                                            }}
                                        ></div>
                                        <BookShelfChanger value="currentlyReading" onBookChange={(shelf) => shelfChange(shelf, o)} />
                                    </div>
                                    <div className="book-title">
                                        {o.title}
                                    </div>
                                    <div className="book-authors">{o.authors}</div>
                                </div>
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
                                <div className="book">
                                    <div className="book-top">
                                        <div
                                            className="book-cover"
                                            style={{
                                            width: 128,
                                            height: 192,
                                            backgroundImage:`url(${o.imageLinks.thumbnail})`
                                            }}
                                        ></div>
                                        <BookShelfChanger value="wantToRead" onBookChange={(shelf) => shelfChange(shelf, o)}/>
                                    </div>
                                    <div className="book-title">
                                        {o.title}
                                    </div>
                                    <div className="book-authors">{o.authors}</div>
                                </div>
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
                                <div className="book">
                                    <div className="book-top">
                                        <div
                                            className="book-cover"
                                            style={{
                                            width: 128,
                                            height: 192,
                                            backgroundImage: `url(${o.imageLinks.thumbnail})`                                            
                                            }}
                                        ></div>
                                        <BookShelfChanger value="read" onBookChange={(shelf) => shelfChange(shelf, o)}/>
                                    </div>
                                    <div className="book-title">
                                        {o.title}
                                    </div>
                                    <div className="book-authors">{o.authors}</div>
                                </div>
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

export default ListBooks;