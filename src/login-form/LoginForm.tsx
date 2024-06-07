import React, { useEffect, useCallback, useMemo } from 'react';
import i18n from '../i18n';
import './LoginForm.css';
import {
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Box,
  IconButton,
} from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../ApiProvider';
import { LibraryClient } from '../library-client';
import { useTranslation } from 'react-i18next';

const LoginForm = () => {
  const navigate = useNavigate();
  const apiClient: LibraryClient = useApi();
  const { t, i18n } = useTranslation();
  useEffect(() => {
    // Add class to the body
    document.body.classList.add('body-login');

    // Remove class when component unmounts
    return () => {
      document.body.classList.remove('body-login');
    };
  }, []);

  const onSubmit = useCallback(
    (values: { username: string; password: string }, formik: any) => {
      apiClient.login(values).then((response) => {
        if (response.success) {
          console.log(response);
          navigate('/home', { state: { books: response.data?.books } });
        } else {
          formik.setFieldError('username', 'Invalid username or password');
        }
      });
    },
    [apiClient, navigate],
  );

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        username: yup.string().required('Username is required'),
        password: yup
          .string()
          .required('Password is required')
          .min(8, 'Password must contain at least 8 characters'),
      }),
    [],
  );
  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3}>
        <Box p={3} position="relative">
          <div>
            <Button onClick={() => handleLanguageChange('eng')}>English</Button>
            <Button onClick={() => handleLanguageChange('pl')}>Polski</Button>
          </div>
          <Typography variant="h4" align="center" gutterBottom>
            {t('Log in to your library')}
          </Typography>
          <Formik
            initialValues={{ username: '', password: '' }}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            validateOnChange
            validateOnBlur
          >
            {(formik: any) => (
              <form
                className="login-form"
                id="signForm"
                noValidate
                onSubmit={formik.handleSubmit}
              >
                <TextField
                  id="username"
                  label={t('Username')}
                  variant="outlined"
                  name="username"
                  fullWidth
                  margin="normal"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.username && !!formik.errors.username}
                  helperText={formik.touched.username && formik.errors.username}
                />
                <TextField
                  id="password"
                  label={t('Password')}
                  variant="outlined"
                  type="password"
                  name="password"
                  fullWidth
                  margin="normal"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && !!formik.errors.password}
                  helperText={formik.touched.password && formik.errors.password}
                />
                <Box mt={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    disabled={!(formik.isValid && formik.dirty)}
                  >
                    {t('Log - in')}
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginForm;
