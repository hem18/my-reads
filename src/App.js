import "./App.css";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import ListBooks from "./components/ListBooks";
import Search from "./components/Search";
import * as BooksApi from "./BooksAPI";

const App = () => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const getBooks = async () => {
      const res = await BooksApi.getAll();
      setBooks(res);
    };
    getBooks();
  }, []);

  const updateBooks = (book, shelf, op) => {
    const updates = async () => {
      await BooksApi.update(book, shelf);
      book.shelf = shelf;
      if (op === "update") {
        setBooks(books.map(o => {
          if (o.id === book.id) {
            o.shelf = shelf;
          }
          return o;
        }));
      } else {
        setBooks(books.concat(book));
      }
    };
    updates();
  }
  return (
    <div className="app">
      {
      <Routes>
        <Route exact path="/" element={
            <ListBooks books={books} onUpdate={updateBooks}/>
          }
        />
        <Route path="/search" element={
            <Search books={books} onSearch={updateBooks}/>
          }
        />
      </Routes>
      }
    </div>
  );
}

export default App;
