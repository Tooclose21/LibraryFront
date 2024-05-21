import './LoanList.css';
import React from 'react';
import { Link } from 'react-router-dom';

function LoanList() {
  const loan = [
    {
      user: 'jane_smith',
      title: '1984',
      author: 'George Orwell',
      publisher: 'Secker & Warburg',
      loanDate: '2024-03-15',
      returnDeadline: '2024-04-15',
      dateOfReturn: '2024-04-13',
    },
    {
      user: 'alice_jones',
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      publisher: 'J.B. Lippincott & Co.',
      loanDate: '2024-02-20',
      returnDeadline: '2024-03-20',
      dateOfReturn: '2024-03-18',
    },
    {
      user: 'charlie_adams',
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      publisher: 'T. Egerton',
      loanDate: '2024-05-10',
      returnDeadline: '2024-06-10',
      dateOfReturn: '2024-06-09',
    },
    {
      user: 'frank_green',
      title: 'War and Peace',
      author: 'Leo Tolstoy',
      publisher: 'The Russian Messenger',
      loanDate: '2024-02-10',
      returnDeadline: '2024-03-10',
      dateOfReturn: '2024-03-08',
    },
    {
      user: 'grace_hall',
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      publisher: 'George Allen & Unwin',
      loanDate: '2024-04-05',
      returnDeadline: '2024-05-05',
      dateOfReturn: '2024-05-03',
    },
  ];
  return (
    <div className="book-list-container">
      <label>User's loan list</label>
      <table>
        <thead className="table--labels">
          <tr>
            <th>User</th>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>Year of publish</th>
            <th>Loan date</th>
            <th>Return deadline</th>
            <th>Return date</th>
          </tr>
        </thead>
        <tbody className="list">
          {loan.map((loan, index) => (
            <tr key={index}>
              <td>{loan.user}</td>
              <td>{loan.title}</td>
              <td>{loan.author}</td>
              <td>{loan.publisher}</td>
              <td>{loan.loanDate}</td>
              <td>{loan.returnDeadline}</td>
              <td>{loan.dateOfReturn}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LoanList;
