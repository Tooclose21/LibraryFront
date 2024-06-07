import './BookList.css';
import React, { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Book } from '../dto/book.dto';
import { useTranslation } from 'react-i18next';
import { useApi } from '../ApiProvider';

function BookList({ books }: { books: Book[] }) {
  const { t, i18n } = useTranslation();
  const Api = useApi();
  const onLoan = useCallback(
    (id: number | undefined) => {
      Api.loan(id!)
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
    },
    [Api],
  );

  useEffect(() => {
    console.log(books);
  }, []);
  return (
    <div className="book-list-container">
      <label>{t('Book list')}</label>
      <table>
        <thead className="table--labels">
          <tr>
            <th>ISBN</th>
            <th>{t('Title')}</th>
            <th>{t('Author')}</th>
            <th>{t('Publisher')}</th>
            <th>{t('Year of publish')}</th>
            <th>{t('Available copies')}</th>
          </tr>
        </thead>
        <tbody className="list">
          {books.map((book, index) => (
            <tr key={index}>
              <td>{book.isbn}</td>
              <td onClick={() => onLoan(book.id)}>{book.title}</td>
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
