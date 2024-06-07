import React, { useCallback, useState } from 'react';
import './MainPage.css';
import BookList from '../BookList/BookList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useApi } from '../ApiProvider';
import { useTranslation } from 'react-i18next';

function MainPage() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const location = useLocation();
  const books = location.state.books;
  const LoanList = '/LoanList';
  const api = useApi();

  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const onBookClick = useCallback(() => {
    api
      .getForMe()
      .then((respose) => {
        navigate('/UserBookList', { state: { loans: respose.data } });
      })
      .catch((error) => console.log(error));
  }, [api, navigate]);

  const onLogout = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const onAddBooks = useCallback(() => {
    navigate('/AddBook');
  }, [navigate]);

  const onListOfUsers = useCallback(() => {
    api
      .getAllUsers()
      .then((respose) => {
        navigate('/ListOfUsers', { state: { users: respose.data } });
      })
      .catch((error) => console.log(error));
  }, [api, navigate]);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="main-page">
      <header className="header">
        <h1>{t('welcome to the library')}</h1>
        <p>{t('explore our vast collection of books')}</p>
        <div className="account-icon" onClick={toggleDropdown}>
          <FontAwesomeIcon icon={faUser} />
          {dropdownVisible && (
            <div className="dropdown">
              <Button onClick={onBookClick}>{t('Your books')}</Button>
              <Button onClick={onListOfUsers}>{t('Menage users')}</Button>
              <Button onClick={onAddBooks}>{t('Add Books')}</Button>
              <Button onClick={onLogout}>{t('Logout')}</Button>
            </div>
          )}
        </div>
      </header>
      <section className="search-bar">
        <input type="text" placeholder={t('Search for books')} />
        <button>{t('Search')}</button>
      </section>
      <section className="book-list">
        <BookList books={books} />
      </section>
    </div>
  );
}

export default MainPage;
