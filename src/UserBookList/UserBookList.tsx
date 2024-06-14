import React, { useCallback, useState } from 'react';
import './UserBookList.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LoanList from '../LoanList/LoanList';
import { useTranslation } from 'react-i18next';
import { Loan } from '../dto/loan.dto';
import { useApi } from '../ApiProvider';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  styled,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function UserBookList() {
  const location = useLocation();
  const navigate = useNavigate();
  const Api = useApi();
  const loans = location.state.loans;
  const { t, i18n } = useTranslation();

  const onReturn = useCallback(
    (loan: Loan) => {
      if (loan.dateOfReturn !== null) {
        return;
      }
      Api.return(loan)
        .then((response) => {
          Api.getForMe()
            .then((respose) => {
              navigate('/UserBookList', { state: { loans: respose.data } });
              setMsg(t('Book returned'));
              setOpen(true);
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
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

  return (
    <>
      <div className="user--loans-page">
        <header className="user--loans-header">
          <h1>{t('Find your loaned books here!')}</h1>
        </header>
        <section className="user--loans-book-list">
          <LoanList loans={loans} func={onReturn} label={t('Return')} />
        </section>
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

export default UserBookList;
