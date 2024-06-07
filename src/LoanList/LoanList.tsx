import './LoanList.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { Loan } from '../dto/loan.dto';
import { useTranslation } from 'react-i18next';

function LoanList({ loans }: { loans: Loan[] }) {
  const { t, i18n } = useTranslation();
  return (
    <div className="book-list-container">
      <table>
        <thead className="table--labels">
          <tr>
            <th>{t('User')}</th>
            <th>{t('Title')}</th>
            <th>{t('Author')}</th>
            <th>{t('Publisher')}</th>
            <th>{t('Loan date')}</th>
            <th>{t('Return deadline')}</th>
            <th>{t('Return date')}</th>
          </tr>
        </thead>
        <tbody className="list">
          {loans.map((loans, index) => (
            <tr key={index}>
              <td>{loans.user?.username}</td>
              <td>{loans.book?.title}</td>
              <td>{loans.book?.author}</td>
              <td>{loans.book?.publisher}</td>
              <td>{loans.loanDate}</td>
              <td>{loans.returnDeadline}</td>
              <td>{loans.dateOfReturn}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LoanList;
