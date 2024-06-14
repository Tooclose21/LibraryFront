import React, { useCallback } from 'react';
import './ListOfUsers.css';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { User } from '../dto/user.dto';
import { Book } from '../dto/book.dto';
import { useApi } from '../ApiProvider';

function ListOfUsers() {
  const navigate = useNavigate();
  const location = useLocation();
  const listofusers: User[] = location.state.users;
  const Api = useApi();
  const { t, i18n } = useTranslation();
  const onDeleteUser = useCallback(
    (user: User) => {
      Api.deleteUser(user).then((response) => {
        if (!response.success) {
          console.log(response);
          return;
        }
        navigate('/ListOfUsers', { state: { users: response.data } });
      });
    },
    [Api, navigate],
  );

  const onUserDetails = useCallback(
    (id: number) => {
      Api.getLoansForUser(id).then((response) => {
        if (!response.success) {
          console.log(response);
          return;
        }
        navigate('/UserDetails', { state: { loans: response.data, id: id } });
      });
    },
    [navigate],
  );

  const onAddUser = useCallback(() => {
    navigate('/AddUser');
  }, [navigate]);

  return (
    <div className="users--list--page">
      <header className="users--list-header">
        <h1>{t('Our users')}</h1>
      </header>
      <div className="users--list-container">
        <button onClick={onAddUser} className="add-user--button">
          {t('Add user')}
        </button>
        <table>
          <thead className="table--labels">
            <tr>
              <th>{t('User')}</th>
              <th>{t('Full username')}</th>
              <th>{t('Email address')}</th>
              <th>{t('Delete')}</th>
              <th>{t('Details')}</th>
            </tr>
          </thead>
          <tbody className="users--list">
            {listofusers.map((user) => (
              <tr key={user.username}>
                <td>{user.username}</td>
                <td>{user.fullUsername}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className="delete-user-list-button"
                    onClick={() => onDeleteUser(user)}
                  >
                    {t('Delete')}
                  </button>
                </td>
                <td>
                  <button
                    className="details-user-list-button"
                    onClick={() => onUserDetails(user.id!)}
                  >
                    {t('Details')}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListOfUsers;
