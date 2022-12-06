import {Link} from "react-router-dom";
import { useState } from "react";
import * as BooksApi from "../BooksAPI";
import BookShelfChanger from "./BookShelfChanger";

const Search = ({onSearch}) => {
    const [query, setQuery] = useState("");
    const [searchResults, setSearchresults] = useState([]);

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
                        setSearchresults(res);
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
                    searchResults.map(o =>
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
                                        <BookShelfChanger value="none" onBookChange={(shelf) => shelfChange(shelf, o)}/>
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