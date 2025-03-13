import { Container, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh' }}
    >
      <Card className="text-center shadow-lg" style={{ width: '100%', maxWidth: '600px', padding: '20px' }}>
        <Card.Body>
          <h1 className="display-4">404 - Страница не найдена</h1>
          <p className="lead">
            Извините, запрашиваемая страница не существует. Возможно, она была удалена или перемещена.
          </p>
          <hr className="my-4" />
          <p>
            Вы можете вернуться на главную страницу, нажав на кнопку ниже.
          </p>
          <Button variant="primary" onClick={handleGoHome}>
            Вернуться на главную
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default NotFoundPage;
