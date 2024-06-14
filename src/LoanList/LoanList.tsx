import './LoanList.css';
import React, { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loan } from '../dto/loan.dto';
import { useTranslation } from 'react-i18next';
import { useApi } from '../ApiProvider';

function LoanList({
  loans,
  func,
  label,
}: {
  loans: Loan[];
  func: (loan: Loan) => void;
  label: string;
}) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const Api = useApi();
  // const onReturn = useCallback(
  //   (loan: Loan) => {
  //     Api.return(loan)
  //       .then((response) => {
  //         Api.getForMe()
  //           .then((respose) => {
  //             navigate('/UserBookList', { state: { loans: respose.data } });
  //           })
  //           .catch((error) => console.log(error));
  //       })
  //       .catch((error) => console.log(error));
  //   },
  //   [Api, navigate],
  // );
  return (
    <div className="loan-list-container">
      <table>
        <thead className="loan-table--labels">
          <tr>
            <th>{t('User')}</th>
            <th>{t('Title')}</th>
            <th>{t('Author')}</th>
            <th>{t('Publisher')}</th>
            <th>{t('Loan date')}</th>
            <th>{t('Return deadline')}</th>
            <th>{t('Return date')}</th>
            <th>{t('Return')}</th>
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
              <td>
                <button
                  className="return-loan-list-button"
                  onClick={() => func(loans)}
                >
                  {label}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LoanList;
