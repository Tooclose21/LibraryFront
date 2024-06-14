import React, { useCallback, useState } from 'react';
import { useApi } from '../ApiProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import { Book } from '../dto/book.dto';
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

const EditBookForm: React.FC = () => {
  const Api = useApi();
  const location = useLocation();
  const navigate = useNavigate();

  const book: Book = location.state.book;
  const [formValues, setFormValues] = useState({
    id: book.id,
    isbn: book.isbn,
    title: book.title,
    author: book.author,
    publisher: book.publisher,
    yearOfPublish: book.yearOfPublish,
    availableCopies: book.availableCopies,
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
    Api.patchBook(formValues)
      .then((response) => {
        if (!response.success) {
          return;
        }
        Api.allBooks().then((response) => {
          if (!response.success) {
            return;
          }
          navigate('/home', { state: { books: response.data } });
        });
        console.log(response);
      })
      .catch((err) => console.log(err));
  }, [Api, formValues, navigate]);

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

export default EditBookForm;
