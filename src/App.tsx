import React from 'react';
import './App.css';
import LoginForm from './login-form/LoginForm';
import BookList from './BookList/BookList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoanList from './LoanList/LoanList';
import MainPage from './MainPage/MainPage';
import ApiProvider from './ApiProvider';
import UserBookList from './UserBookList/UserBookList';
import ListOfUsers from './ListOfUsers/ListOfUsers';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import AddBook from './AddElemeents/AddBook';
import AddUser from './AddElemeents/AddUser';

function App() {
  return (
    <>
      <BrowserRouter>
        <I18nextProvider i18n={i18n}>
          <ApiProvider>
            <Routes>
              <Route path="/" element={<LoginForm />} />
              {/*<Route path="/BookList" element={<BookList />} />*/}
              <Route path="/home" element={<MainPage />} />
              <Route path="/LoanList" element={<LoanList loans={[]} />} />
              <Route path="/UserBookList" element={<UserBookList />} />
              <Route path="/ListOfUsers" element={<ListOfUsers />} />
              <Route path="/AddBook" element={<AddBook />} />
              <Route path="/AddUser" element={<AddUser />} />
            </Routes>
          </ApiProvider>
        </I18nextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
