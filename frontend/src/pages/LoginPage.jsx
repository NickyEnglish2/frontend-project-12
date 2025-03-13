import { Formik, Form, Field } from 'formik';
import { Button, Form as BootstrapForm, Container, Card, Row, Col, Image, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../slices/authSlice.js';
import loginApi from '../utilities/loginAPI.js';
import { useNavigate } from 'react-router-dom';
import loginImage from '../assets/avatar.jpg';
import loginPage from '../validations/loginPage.js';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, errors } = useSelector((state) => state.auth);

  const initialValues = {
    username: '',
    password: '',
  };

  const handleLogin = async (values) => {
    dispatch(loginStart());
    try {
      const token = await loginApi(values);
      dispatch(loginSuccess(token));
      navigate('/');
    } catch (err) {
      dispatch(loginFailure(err.message));
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh' }}
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
              <h1 className="text-center mb-4">Войти</h1>
              {errors && <Alert variant="danger">{errors}</Alert>}
              <Formik
                initialValues={initialValues}
                validationSchema={loginPage}
                onSubmit={handleLogin}
              >
                {({ errors, touched }) => (
                  <Form>
                    <BootstrapForm.Group className="mb-3">
                      <Field
                        as={BootstrapForm.Control}
                        type="text"
                        name="username"
                        placeholder='Ник пользователя'
                        isInvalid={touched.username && !!errors.username}
                      />
                      <BootstrapForm.Control.Feedback type="invalid">
                        {errors.username}
                      </BootstrapForm.Control.Feedback>
                    </BootstrapForm.Group>

                    <BootstrapForm.Group className="mb-3">
                      <Field
                        as={BootstrapForm.Control}
                        type="password"
                        name="password"
                        placeholder='Пароль'
                        isInvalid={touched.password && !!errors.password}
                      />
                      <BootstrapForm.Control.Feedback type="invalid">
                        {errors.password}
                      </BootstrapForm.Control.Feedback>
                    </BootstrapForm.Group>

                    <div className="d-grid">
                      <Button variant="primary" type="submit" disabled={status === 'loading'}>
                        {status === 'loading' ? 'Загрузка...' : 'Войти'}
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
