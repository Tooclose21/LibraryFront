import React from 'react';
import './App.css';
import LoginForm from './login-form/LoginForm';
import BookList from './BookList/BookList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoanList from './LoanList/LoanList';
import MainPage from './MainPage/MainPage';
import ApiProvider from './ApiProvider';

function App() {
  return (
    <>
      <BrowserRouter>
        <ApiProvider>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/BookList" element={<BookList />} />
          </Routes>
        </ApiProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
