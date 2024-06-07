import React, { useCallback } from 'react';
import './ListOfUsers.css';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { User } from '../dto/user.dto';

function ListOfUsers() {
  const navigate = useNavigate();
  const location = useLocation();
  const listofusers: User[] = location.state.users;
  const { t, i18n } = useTranslation();
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
            </tr>
          </thead>
          <tbody className="users--list">
            {listofusers.map((user) => (
              <tr key={user.username}>
                <td>{user.username}</td>
                <td>{user.fullUsername}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListOfUsers;
