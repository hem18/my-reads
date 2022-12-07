import {Link} from "react-router-dom";
import { useState } from "react";
import * as BooksApi from "../BooksAPI";
import BookShelfChanger from "./BookShelfChanger";

const Search = ({books, onSearch}) => {
    const [query, setQuery] = useState("");
    const [searchResults, setSearchresults] = useState([]);
    let bookMap = new Map();
    books.forEach(e => {
        bookMap.set(e.id, e.shelf);
    });

    const updateQuery = (query) => {
        setQuery(query);
        if (query !== "") {
            searchBooks();
        } else {
            setSearchresults([]);
        }
    };
    const shelfChange = (shelf, book) => {
        onSearch(book, shelf);
    };

    const searchBooks = () => {
            const bookSearch = async () => {
                if (query.length > 0) {
                    const res = await BooksApi.search(query);
                    if (res !== "") {
                        let alteredRes = res.map(o => {
                            if (bookMap.has(o.id)) {
                                o.shelf = bookMap.get(o.id);
                            } else {
                                o.shelf = "none";
                            }
                            return o;
                        });
                        setSearchresults(alteredRes);
                    } else {
                        setSearchresults([]);
                    }
                } 
            }
            bookSearch();
    };
    return (
        <div className="search-books">
          <div className="search-books-bar">
          <Link to={"/"} className="close-search">
                Close
            </Link>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
                value={query} onChange={ (e) => updateQuery(e.target.value) }
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
                {
                    searchResults.filter(f => f.imageLinks).map(o =>
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
                                        <BookShelfChanger value={o.shelf} onBookChange={(shelf) => shelfChange(shelf, o)}/>
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
    );
};

export default Search;