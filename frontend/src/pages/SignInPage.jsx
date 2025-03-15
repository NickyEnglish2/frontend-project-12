import { useFormik } from 'formik';
import { Button, Form as BootstrapForm, Container, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import signInSchema from '../validations/signInSchema.js';
import signInImage from '../assets/avatar_1.jpg';

const SignInPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post('/api/v1/signup', {
        username: values.username,
        password: values.password,
      });
      console.log(response.data);
      navigate('/');
    } catch (err) {
      console.error('Ошибка регистрации:', err.response?.data?.message || err.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signInSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}
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
              <h1 className="text-center mb-4">Регистрация</h1>
              <form onSubmit={formik.handleSubmit}>
                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label>Имя пользователя</BootstrapForm.Label>
                  <BootstrapForm.Control
                    type="text"
                    name="username"
                    placeholder="Введите имя пользователя"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.username && !!formik.errors.username}
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    {formik.errors.username}
                  </BootstrapForm.Control.Feedback>
                </BootstrapForm.Group>

                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label>Пароль</BootstrapForm.Label>
                  <BootstrapForm.Control
                    type="password"
                    name="password"
                    placeholder="Введите пароль"
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
                  <BootstrapForm.Label>Подтвердите пароль</BootstrapForm.Label>
                  <BootstrapForm.Control
                    type="password"
                    name="confirmPassword"
                    placeholder="Подтвердите пароль"
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
                  <Button variant="primary" type="submit">
                    Зарегистрироваться
                  </Button>
                </div>

                <Row className="mt-3">
                  <Col className="text-center">
                    <Button variant="secondary" onClick={() => navigate('/login')}>
                      Назад
                    </Button>
                  </Col>
                </Row>
              </form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignInPage;
