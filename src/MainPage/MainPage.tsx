import React, { useCallback, useState } from 'react';
import './MainPage.css';
import BookList from '../BookList/BookList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  styled,
} from '@mui/material';
import { useApi } from '../ApiProvider';
import { useTranslation } from 'react-i18next';
import { Book } from '../dto/book.dto';
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function MainPage() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const location = useLocation();
  const books: Book[] = location.state.books;
  const [condition, setCondition] = useState('');
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
    api.test().then((response) => {
      if (!response.success) {
        setMsg(t('You do not have permission to enter this page'));
        setOpen(true);
        return;
      }
      navigate('/AddBook');
    });
  }, [api, navigate]);

  const onListOfUsers = useCallback(() => {
    api
      .getAllUsers()
      .then((response) => {
        if (!response.success) {
          setMsg(t('You do not have permission to enter this page'));
          setOpen(true);
          return;
        }
        navigate('/ListOfUsers', { state: { users: response.data } });
      })
      .catch((error) => console.log(error));
  }, [api, navigate]);

  const [open, setOpen] = React.useState(false);
  const [message, setMsg] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <>
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
          <input
            value={condition}
            onChange={(a) => setCondition(a.target.value)}
            type="text"
            placeholder={t('Search for books')}
          />
          <button>{t('Search')}</button>
        </section>
        <section className="book-list">
          <BookList
            books={books.filter(
              (it) =>
                condition === '' ||
                it.title?.toLowerCase().includes(condition.toLowerCase()) ||
                it.author?.toLowerCase().includes(condition.toLowerCase()),
            )}
          />
        </section>
      </div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {t('Unauthorized')}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>{message}</DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Ok
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}

export default MainPage;
