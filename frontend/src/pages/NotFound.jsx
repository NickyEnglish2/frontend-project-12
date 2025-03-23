import { Container, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PATHS } from '../routes/paths';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleGoHome = () => {
    navigate(PATHS.MAIN);
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh' }}
    >
      <Card className="text-center shadow-lg" style={{ width: '100%', maxWidth: '600px', padding: '20px' }}>
        <Card.Body>
          <h1 className="display-4">{t('notFoundPage.title')}</h1>
          <p className="lead">
            {t('notFoundPage.body1')}
          </p>
          <hr className="my-4" />
          <p>
            {t('notFoundPage.body2')}
          </p>
          <Button variant="primary" onClick={handleGoHome}>
            {t('notFoundPage.backButton')}
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default NotFoundPage;
