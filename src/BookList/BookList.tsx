import './BookList.css';
import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Book } from '../dto/book.dto';
import { useTranslation } from 'react-i18next';
import { useApi } from '../ApiProvider';
import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  styled,
} from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BookList({ books }: { books: Book[] }) {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const Api = useApi();
  const onLoan = useCallback(
    (id: number | undefined) => {
      Api.loan(id!)
        .then((response) => {
          setMsg(t('Book loaned'));
          setOpen(true);
        })
        .catch((error) => console.log(error));
    },
    [Api],
  );
  const onDeleteBook = useCallback(
    (book: Book) => {
      Api.deleteBook(book).then((response) => {
        if (!response.success) {
          setMsg(t('You do not have permission to enter this page'));
          setOpen(true);
          return;
        }
        navigate('/home', { state: { books: response.data } });
        setMsg(t('Book deleted'));
        setOpen(true);
      });
    },
    [Api, navigate],
  );

  const onEdit = useCallback(
    (book: Book) => {
      Api.getBook(book.id).then((response) => {
        if (!response.success) {
          setMsg(t('You do not have permission to enter this page'));
          setOpen(true);
          return;
        }
        navigate('/EditBook', { state: { book: response.data } });
      });
    },
    [Api, navigate],
  );

  const [open, setOpen] = React.useState(false);
  const [message, setMsg] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    console.log(books);
  }, []);
  return (
    <>
      <div className="book-list-container">
        <label>{t('Book list')}</label>
        <table>
          <thead className="table--labels">
            <tr>
              <th>ISBN</th>
              <th>{t('Title')}</th>
              <th>{t('Author')}</th>
              <th>{t('Publisher')}</th>
              <th>{t('Year of publish')}</th>
              <th>{t('Available copies')}</th>
              <th>{t('Loan')}</th>
              <th>{t('Delete')}</th>
            </tr>
          </thead>
          <tbody className="list">
            {books.map((book, index) => (
              <tr key={index}>
                <td onClick={() => onEdit(book)}>{book.isbn}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.publisher}</td>
                <td>{book.yearOfPublish}</td>
                <td>{book.availableCopies}</td>
                <td>
                  <button
                    className="loan-book-list-button"
                    onClick={() => onLoan(book.id)}
                  >
                    {t('Loan')}
                  </button>
                </td>
                <td>
                  <button
                    className="delete-book-list-button"
                    onClick={() => onDeleteBook(book)}
                  >
                    {t('Delete')}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {t('Message')}
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

export default BookList;
