import { useFormik } from 'formik';
import { Button, Form as BootstrapForm, Container, Card, Row, Col, Image, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../slices/authSlice.js';
import loginApi from '../utilities/loginAPI.js';
import { useNavigate, Link } from 'react-router-dom';
import loginImage from '../assets/avatar.jpg';
import loginPage from '../validations/loginPage.js';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, loginErr } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginPage,
    onSubmit: async (values) => {
      dispatch(loginStart());
      try {
        const response = await loginApi(values);
        dispatch(loginSuccess({ token: response.token, username: response.username }));
        navigate('/');
      } catch (err) {
        dispatch(loginFailure('Неправильный логин или пароль'));
        console.error(err.message);
      }
    },
  });

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
              <form onSubmit={formik.handleSubmit}>
                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Control
                    type="text"
                    name="username"
                    placeholder="Ник пользователя"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.username && !!formik.errors.username || !!loginErr}
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    {formik.errors.username || loginErr}
                  </BootstrapForm.Control.Feedback>
                </BootstrapForm.Group>

                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Control
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.password && !!formik.errors.password || !!loginErr}
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    {formik.errors.password || loginErr}
                  </BootstrapForm.Control.Feedback>
                </BootstrapForm.Group>

                <div className="d-grid">
                  <Button variant="primary" type="submit" disabled={status === 'loading'}>
                    {status === 'loading' ? 'Загрузка...' : 'Войти'}
                  </Button>
                </div>
              </form>
            </Card.Body>

            <Card.Footer className="text-center p-3">
              <span>Нет аккаунта? </span>
              <Link to="/signup">Зарегистрироваться</Link>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
