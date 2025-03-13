import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="text-center mt-5">
      <h1>Главная страница</h1>
      <p>Добро пожаловать на главную страницу :)</p>
      <Button variant="danger" onClick={handleLogout}>
        Выйти
      </Button>
    </div>
  );
};

export default MainPage;
