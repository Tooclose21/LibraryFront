import React, { useCallback, useState } from 'react';
import './AddUser.css';
import {
  TextField,
  Container,
  Paper,
  Box,
  Typography,
  Button,
  styled,
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useApi } from '../ApiProvider';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const AddUserForm: React.FC = () => {
  const Api = useApi();
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
    role: '',
    email: '',
    fullUsername: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const { t, i18n } = useTranslation();
  const onAddBook = useCallback(() => {
    console.log(formValues);
    Api.addUser(formValues)
      .then((response) => {
        setMsg(t('User added'));
        setOpen(true);
      })
      .catch((err) => console.log(err));
  }, [Api, formValues]);

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
      <Container maxWidth="sm" className="main-page">
        <Paper elevation={3}>
          <Box p={3}>
            <Typography variant="h4" align="center" gutterBottom>
              {t('Add New User')}
            </Typography>
            <form className="add-book-form" noValidate>
              <TextField
                id="username"
                label={t('Username')}
                variant="outlined"
                name="username"
                fullWidth
                margin="normal"
                onChange={handleChange}
                value={formValues.username}
              />
              <TextField
                id="password"
                label={t('Password')}
                variant="outlined"
                name="password"
                fullWidth
                margin="normal"
                onChange={handleChange}
                value={formValues.password}
              />
              <TextField
                id="role"
                label={t('Role')}
                variant="outlined"
                name="role"
                fullWidth
                margin="normal"
                onChange={handleChange}
                value={formValues.role}
              />
              <TextField
                id="email"
                label={t('Email')}
                variant="outlined"
                name="email"
                fullWidth
                margin="normal"
                onChange={handleChange}
                value={formValues.email}
              />
              <TextField
                id="fullUsername"
                label={t('Full username')}
                variant="outlined"
                name="fullUsername"
                fullWidth
                margin="normal"
                onChange={handleChange}
                value={formValues.fullUsername}
              />
            </form>
          </Box>
        </Paper>
        <Button onClick={onAddBook}>{t('Confirm')}</Button>
      </Container>
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
};

export default AddUserForm;
