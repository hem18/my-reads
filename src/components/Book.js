import BookShelfChanger from "./BookShelfChanger";
import PropTypes from "prop-types";

const Book = ({ book, onUpdate }) => {
    const shelfChange = (shelf, changedBook) => {
        if (onUpdate) {
           onUpdate(changedBook, shelf, "update");
        }
    };

    return (
            <div className="book">
                <div className="book-top">
                    <div
                        className="book-cover"
                        style={{
                            width: 128,
                            height: 192,
                            backgroundImage: `url(${book.imageLinks.thumbnail})`                            
                        }}
                    ></div>
                    <BookShelfChanger value={book.shelf} onBookChange={(shelf) => shelfChange(shelf, book)} />
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors}</div>
            </div>
    );
};

Book.propTypes = {
    book: PropTypes.object.isRequired,
    onUpdate: PropTypes.func.isRequired
};
export default Book;
