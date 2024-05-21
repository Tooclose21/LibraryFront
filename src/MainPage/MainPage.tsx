import React from 'react';
import './MainPage.css';
import BookList from '../BookList/BookList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

function MainPage() {
  const LoanList = '/LoanList';
  return (
    <div className="main-page">
      <header className="header">
        <h1>Welcome to the Library</h1>
        <p>Explore our vast collection of books</p>
        <div className="account-icon">
          <FontAwesomeIcon icon={faUser} />
        </div>
      </header>
      <section className="search-bar">
        <input type="text" placeholder="Search for books" />
        <button>Search</button>
        <Link to={LoanList}>
          <button className="your-books-button">Your Books</button>
        </Link>
      </section>
      <section className="book-list">
        <BookList />
      </section>
    </div>
  );
}

export default MainPage;
