/* eslint-disable object-curly-newline */

import { useFormik } from 'formik';
import { Button, Form as BootstrapForm, Container, Card, Row, Col, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { loginStart, loginSuccess, loginFailure } from '../slices/authSlice.js';
import loginApi from '../utilities/loginAPI.js';
import loginImage from '../assets/avatar.jpg';
import createLoginValidation from '../validations/loginPage.js';
import Header from './Header.jsx';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { status, loginErr } = useSelector((state) => state.auth);

  const loginValidationSchema = createLoginValidation(t);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      dispatch(loginStart());
      try {
        const response = await loginApi(values);
        dispatch(loginSuccess({ token: response.token, username: response.username }));
        navigate('/');
      } catch (err) {
        dispatch(loginFailure(t('errors.loginErr')));
        console.error(err.message);
      }
    },
  });

  return (
    <>
      <Header showLogoutButton={false} />
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '80vh' }}
      >
        <Row className="g-0 shadow-lg" style={{ maxWidth: '800px', width: '100%' }}>
          <Col md={6} className="d-none d-md-flex justify-content-center align-items-center" style={{ backgroundColor: '#ffffff' }}>
            <Image
              src={loginImage}
              alt="Login"
              roundedCircle
              style={{ width: '200px', height: '200px', objectFit: 'cover' }}
            />
          </Col>

          <Col md={6}>
            <Card style={{ height: '100%', borderRadius: '0', border: 'none' }}>
              <Card.Body className="p-4">
                <h1 className="text-center mb-4">{t('loginPage.title')}</h1>
                <form onSubmit={formik.handleSubmit}>
                  <BootstrapForm.Group className="mb-3">
                    <BootstrapForm.Label htmlFor="username">{t('loginPage.labels.username')}</BootstrapForm.Label>
                    <BootstrapForm.Control
                      id="username"
                      type="text"
                      name="username"
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={(formik.touched.username && !!formik.errors.username) || !!loginErr}
                    />
                    <BootstrapForm.Control.Feedback type="invalid">
                      {formik.errors.username || loginErr}
                    </BootstrapForm.Control.Feedback>
                  </BootstrapForm.Group>

                  <BootstrapForm.Group className="mb-3">
                    <BootstrapForm.Label htmlFor="password">{t('loginPage.labels.password')}</BootstrapForm.Label>
                    <BootstrapForm.Control
                      id="password"
                      type="password"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.password && !!formik.errors.password}
                    />
                    <BootstrapForm.Control.Feedback type="invalid">
                      {formik.errors.password}
                    </BootstrapForm.Control.Feedback>
                  </BootstrapForm.Group>

                  <div className="d-grid">
                    <Button variant="primary" type="submit" disabled={status === 'loading'}>
                      {status === 'loading' ? t('loginPage.button.loading') : t('loginPage.button.enter')}
                    </Button>
                  </div>
                </form>
              </Card.Body>

              <Card.Footer className="text-center p-3">
                <span>
                  {t('loginPage.footer.noAccount')}
                </span>
                &nbsp;
                <Link to="/signup">{t('loginPage.footer.signUp')}</Link>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LoginPage;
