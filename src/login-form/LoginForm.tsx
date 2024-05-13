import React, { useCallback, useMemo } from 'react';
import './LoginForm.css';
import { Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';

const LoginForm = () => {
  const onSubmit = useCallback(
    (values: { username: string; password: string }, formik: any) => {
      console.log(values);
    },
    [],
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

  return (
    <div>
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
              label="Username"
              variant="outlined"
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && !!formik.errors.username}
              helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              type="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && !!formik.errors.password}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button
              variant="contained"
              type="submit"
              form="signForm"
              disabled={!(formik.isValid && formik.dirty)}
            >
              Log-in
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};
export default LoginForm;
