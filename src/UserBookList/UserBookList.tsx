import React, { useState } from 'react';
import './UserBookList.css';
import { Link, useLocation } from 'react-router-dom';
import LoanList from '../LoanList/LoanList';
import { useTranslation } from 'react-i18next';

function UserBookList() {
  const location = useLocation();
  const loans = location.state.loans;
  const { t, i18n } = useTranslation();
  return (
    <div className="user--loans-page">
      <header className="user--loans-header">
        <h1>{t('Find your loaned books here!')}</h1>
      </header>
      <section className="user--loans-book-list">
        <LoanList loans={loans} />
      </section>
    </div>
  );
}

export default UserBookList;
