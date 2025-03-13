import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MainPage from './pages/MainPage.jsx';
import LoginPage from './pages/LoginPage.jsx'
import NotFoundPage from './pages/NotFound.jsx';
import { logout } from './slices/authSlice.js';

const AppRouter = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    }
  }, [dispatch]);

  return (
    <Routes>
      <Route
        path='/' 
        element={isAuthenticated ? <MainPage /> : <Navigate to='/login' />}
      />
      <Route
        path='/login'
        element={!isAuthenticated ? <LoginPage /> : <Navigate to='/' />}
      />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;
