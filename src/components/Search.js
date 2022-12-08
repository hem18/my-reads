import {Link} from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import * as BooksApi from "../BooksAPI";
import BookShelfChanger from "./BookShelfChanger";
import useDebounce from "./useDebounce";
import PropTypes from "prop-types";

const Search = ({books, onSearch}) => {
    const [query, setQuery] = useState("");
    const [searchResults, setSearchresults] = useState([]);
    const debouncedValue = useDebounce(query, 500);
    const bookMap = useMemo(() => {
        let map = new Map(); 
        books.forEach(e => {
            map.set(e.id, e.shelf);
        });
        return map;
    }, [books]);

    const updateQuery = (q) => {
        setQuery(q);
        if (q === "") {
            setSearchresults([]);
        }
    };
    const shelfChange = (shelf, book) => {
        onSearch(book, shelf, "add");
    };

    useEffect(() => {
            const bookSearch = async () => {
                if (debouncedValue !== "") {
                    const res = await BooksApi.search(debouncedValue);
                    if (res && !res.error) {
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
    }, [bookMap, debouncedValue]);
    
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

Search.propTypes = {
    books: PropTypes.array.isRequired, 
    onSearch: PropTypes.func.isRequired
};

export default Search;