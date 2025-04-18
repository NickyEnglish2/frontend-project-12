/* eslint-disable object-curly-newline */

import { useState } from 'react';
import { useFormik } from 'formik';
import { Button, Form as BootstrapForm, Container, Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext.jsx';
import { signUpApi } from '../utilities/index';
import createSignInSchema from '../validations/signInSchema.js';
import signInImage from '../assets/avatar_1.jpg';
import Header from './Header.jsx';
import PATHS from '../routes/paths.js';

const SignInPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { logIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [signUpError, setSignUpError] = useState(null);

  const signUpSchema = createSignInSchema(t);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signUpSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      setSignUpError(null);
      try {
        const response = await signUpApi(values);
        logIn({ token: response.token, username: response.username });
        navigate(PATHS.MAIN);
      } catch (err) {
        setSignUpError(t('errors.signUpErr'));
        console.error('Ошибка регистрации:', err.message);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <>
      <Header showLogoutButton={false} />
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '80vh', backgroundColor: '#f8f9fa' }}
      >
        <Row className="g-0 shadow-lg" style={{ maxWidth: '800px', width: '100%', borderRadius: '20px', overflow: 'hidden' }}>
          <Col md={6} className="d-none d-md-flex justify-content-center align-items-center" style={{ backgroundColor: '#f8f9fa' }}>
            <img
              src={signInImage}
              alt="Signup"
              style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '50%' }}
            />
          </Col>

          <Col md={6} style={{ backgroundColor: '#f8f9fa' }}>
            <Card style={{ height: '100%', borderRadius: '0', border: 'none' }}>
              <Card.Body className="p-4">
                <h1 className="text-center mb-4">{t('signUpPage.title')}</h1>
                <form onSubmit={formik.handleSubmit}>
                  <BootstrapForm.Group className="mb-3">
                    <BootstrapForm.Label htmlFor="username">{t('signUpPage.nameInput.label')}</BootstrapForm.Label>
                    <BootstrapForm.Control
                      id="username"
                      type="text"
                      name="username"
                      placeholder={t('signUpPage.nameInput.placeholder')}
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={
                        (formik.touched.username && !!formik.errors.username)
                        || !!signUpError
                      }
                    />
                    <BootstrapForm.Control.Feedback type="invalid">
                      {formik.errors.username || signUpError}
                    </BootstrapForm.Control.Feedback>
                  </BootstrapForm.Group>

                  <BootstrapForm.Group className="mb-3">
                    <BootstrapForm.Label htmlFor="password">{t('signUpPage.passwordInput.label')}</BootstrapForm.Label>
                    <BootstrapForm.Control
                      id="password"
                      type="password"
                      name="password"
                      placeholder={t('signUpPage.passwordInput.placeholder')}
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.password && !!formik.errors.password}
                    />
                    <BootstrapForm.Control.Feedback type="invalid">
                      {formik.errors.password}
                    </BootstrapForm.Control.Feedback>
                  </BootstrapForm.Group>

                  <BootstrapForm.Group className="mb-3">
                    <BootstrapForm.Label htmlFor="confirmPassword">{t('signUpPage.confirmPasswordInput.label')}</BootstrapForm.Label>
                    <BootstrapForm.Control
                      id="confirmPassword"
                      type="password"
                      name="confirmPassword"
                      placeholder={t('signUpPage.confirmPasswordInput.placeholder')}
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
                    />
                    <BootstrapForm.Control.Feedback type="invalid">
                      {formik.errors.confirmPassword}
                    </BootstrapForm.Control.Feedback>
                  </BootstrapForm.Group>

                  <div className="d-grid">
                    <Button variant="primary" type="submit" disabled={isLoading}>
                      {isLoading ? t('signUpPage.button.loading') : t('signUpPage.button.signUp')}
                    </Button>
                  </div>

                  <Row className="mt-3">
                    <Col className="text-center">
                      <Button variant="secondary" onClick={() => navigate(PATHS.LOGIN)}>
                        {t('signUpPage.button.back')}
                      </Button>
                    </Col>
                  </Row>
                </form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SignInPage;
