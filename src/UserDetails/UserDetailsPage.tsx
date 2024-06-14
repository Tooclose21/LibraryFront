import React, { useCallback, useState } from 'react';
import './UserDetailsPage.css';
import { useLocation, useNavigate } from 'react-router-dom';
import LoanList from '../LoanList/LoanList';
import { useTranslation } from 'react-i18next';
import { Loan } from '../dto/loan.dto';
import { useApi } from '../ApiProvider';

function UserDetailsPage() {
  const location = useLocation();
  const Api = useApi();
  const id = location.state.id;
  const navigate = useNavigate();
  // const books = location.state.books;
  const { t, i18n } = useTranslation();
  const loans = location.state.loans;
  const handleReturn = useCallback((loan: Loan) => {
    Api.cancelReturn(loan).then((response) => {
      if (!response.success) {
        console.log(response);
        return;
      }
      console.log(response);
      Api.getLoansForUser(loan.user?.id!).then((response) => {
        if (!response.success) {
          console.log(response);
          return;
        }
        navigate('/UserDetails', { state: { loans: response.data, id: id } });
      });
    });
  }, []);
  return (
    <div className="user--loans-page">
      <header className="user--loans-header">
        <h1>User's details</h1>
      </header>
      <section className="user--loans-book-list">
        <LoanList
          loans={loans}
          func={handleReturn}
          label={t('Cancel return')}
        />
      </section>
    </div>
  );
}

export default UserDetailsPage;
