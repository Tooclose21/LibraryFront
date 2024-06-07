import React, { useCallback, useState } from 'react';
import './AddBook.css';
import {
  TextField,
  Container,
  Paper,
  Box,
  Typography,
  Button,
} from '@mui/material';
import { useApi } from '../ApiProvider';
import { useTranslation } from 'react-i18next';

const AddBookForm: React.FC = () => {
  const Api = useApi();
  const [formValues, setFormValues] = useState({
    isbn: '',
    title: '',
    author: '',
    publisher: '',
    yearOfPublish: '',
    availableCopies: '',
  });

  const { t, i18n } = useTranslation();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const onAddBook = useCallback(() => {
    console.log(formValues);
    Api.addBook(formValues)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  }, [Api, formValues]);

  return (
    <Container maxWidth="sm" className="main-page">
      <Paper elevation={3}>
        <Box p={3}>
          <Typography variant="h4" align="center" gutterBottom>
            {t('Add New Book')}
          </Typography>
          <form className="add-book-form" noValidate>
            <TextField
              id="isbn"
              label="ISBN"
              variant="outlined"
              name="isbn"
              fullWidth
              margin="normal"
              onChange={handleChange}
              value={formValues.isbn}
            />
            <TextField
              id="title"
              label={t('Title')}
              variant="outlined"
              name="title"
              fullWidth
              margin="normal"
              onChange={handleChange}
              value={formValues.title}
            />
            <TextField
              id="author"
              label={t('Author')}
              variant="outlined"
              name="author"
              fullWidth
              margin="normal"
              onChange={handleChange}
              value={formValues.author}
            />
            <TextField
              id="publisher"
              label={t('Publisher')}
              variant="outlined"
              name="publisher"
              fullWidth
              margin="normal"
              onChange={handleChange}
              value={formValues.publisher}
            />
            <TextField
              id="yearOfPublish"
              label={t('Year of Publish')}
              variant="outlined"
              type="number"
              name="yearOfPublish"
              fullWidth
              margin="normal"
              onChange={handleChange}
              value={formValues.yearOfPublish}
            />
            <TextField
              id="availableCopies"
              label={t('Available Copies')}
              variant="outlined"
              type="number"
              name="availableCopies"
              fullWidth
              margin="normal"
              onChange={handleChange}
              value={formValues.availableCopies}
            />
          </form>
        </Box>
      </Paper>
      <Button onClick={onAddBook}>{t('Confirm')}</Button>
    </Container>
  );
};

export default AddBookForm;
