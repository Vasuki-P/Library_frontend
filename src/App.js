import './App.css';
import { useState } from 'react';
import Axios from 'axios';

function App() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setISBN] = useState(0);
  const [genre, setGenre] = useState("");
  const [publisher, setPublisher] = useState("");
  const [publication_year, setPublication] = useState(0);
  const [no_of_copies, setCopies] = useState(0);

  const [bookList, setBookList] = useState([]);

  const addbook = () => {
    Axios.post('http://localhost:3001/create', {
      title: title,
      author: author,
      isbn: isbn,
      genre: genre,
      publisher: publisher,
      publication_year: publication_year,
      no_of_copies: no_of_copies,
    }).then(() => {
      console.log("success");
      alert('Book added successfully!');
    }).catch((error) => {
      console.error('Error adding book:', error);
      alert('Failed to add book.');
    });
  };

  const getBooks = () => {
    Axios.get('http://localhost:3001/books')
    .then((response) => {
      console.log(response.data);
      setBookList(response.data);

    });
  };

  return (
    <div className="App">
      <h1>Library Management System</h1>
      <div className="information">
        <label>Title</label>
        <input type="text"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <label>Author</label>
        <input type="text"
          onChange={(event) => {
            setAuthor(event.target.value);
          }}
        />
        <label>ISBN</label>
        <input type="number"
          onChange={(event) => {
            setISBN(event.target.value);
          }}
        />
        <label>Genre</label>
        <input type="text"
          onChange={(event) => {
            setGenre(event.target.value);
          }}
        />
        <label>Publisher</label>
        <input type="text"
          onChange={(event) => {
            setPublisher(event.target.value);
          }}
        />
        <label>Publication year</label>
        <input type="number"
          onChange={(event) => {
            setPublication(event.target.value);
          }}
        />
        <label>No Of Copies</label>
        <input type="number"
          onChange={(event) => {
            setCopies(event.target.value);
          }}
        />
        <button onClick={addbook}>Add Book</button>
      
        <button onClick={getBooks}>Show Books</button>
      </div>
      <div className='books'>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>ISBN</th>
              <th>Genre</th>
              <th>Publisher</th>
              <th>Publication Year</th>
              <th>No Of Copies</th>
            </tr>
          </thead>
          <tbody>
            {bookList.map((val, key) => (
              <tr key={key}>
                <td>{val.title}</td>
                <td>{val.author}</td>
                <td>{val.isbn}</td>
                <td>{val.genre}</td>
                <td>{val.publisher}</td>
                <td>{val.publication_year}</td>
                <td>{val.no_of_copies}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
