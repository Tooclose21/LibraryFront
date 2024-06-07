import React, { useState } from 'react';
import './UserDetailsPage.css';
import { useLocation } from 'react-router-dom';
import LoanList from '../LoanList/LoanList';
import { useTranslation } from 'react-i18next';

function UserDetailsPage() {
  const location = useLocation();
  // const books = location.state.books;
  const { t, i18n } = useTranslation();
  return (
    <div className="user--loans-page">
      <header className="user--loans-header">
        <h1></h1>
      </header>
      <section className="user--loans-book-list">
        <LoanList loans={[]} />
      </section>
    </div>
  );
}

export default UserDetailsPage;
