import './BookList.css';
import React from 'react';

function BookList() {
  const books = [
    {
      isbn: '123456789',
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      publisher: 'Publisher A',
      yearOfPublish: 1960,
      availableCopies: 5,
    },
    {
      isbn: '987654321',
      title: '1984',
      author: 'George Orwell',
      publisher: 'Publisher B',
      yearOfPublish: 1949,
      availableCopies: 3,
    },
  ];
  return (
    <div className="book-list-container">
      <label>Book list</label>
      <table>
        <thead className="table--labels">
          <tr>
            <th>ISBN</th>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>Year of publish</th>
            <th>Available copies</th>
          </tr>
        </thead>
        <tbody className="list">
          {books.map((book, index) => (
            <tr key={index}>
              <td>{book.isbn}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publisher}</td>
              <td>{book.yearOfPublish}</td>
              <td>{book.availableCopies}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookList;
