/* eslint-disable object-curly-newline */

import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext.jsx';
import PATHS from '../routes/paths';

const Header = ({ showLogoutButton }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { logOut } = useAuth();

  const handleLogout = () => {
    logOut();
    navigate(PATHS.LOGIN);
  };

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand
          href={PATHS.MAIN}
          style={{ cursor: 'pointer', color: 'black', fontWeight: 'bold' }}
        >
          Hexlet Chat
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {showLogoutButton && (
              <Button variant="outline-primary" onClick={handleLogout}>
                {t('header.logoutBtn')}
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
