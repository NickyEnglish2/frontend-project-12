/* eslint-disable object-curly-newline */

import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { logout } from '../slices/authSlice';
import { PATHS } from '../routes/paths';

const Header = ({ showLogoutButton }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleLogout = () => {
    dispatch(logout());
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
