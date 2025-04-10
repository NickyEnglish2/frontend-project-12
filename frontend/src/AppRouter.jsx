import { Routes, Route, Navigate } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import NotFoundPage from './pages/NotFound.jsx';
import SignInPage from './pages/SignInPage.jsx';
import { useAuth } from './contexts/AuthContext.jsx';
import PATHS from './routes/paths.js';

const AppRouter = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path={PATHS.MAIN}
        element={isAuthenticated ? <MainPage /> : <Navigate to="/login" />}
      />
      <Route
        path={PATHS.LOGIN}
        element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />}
      />
      <Route
        path={PATHS.SIGNUP}
        element={!isAuthenticated ? <SignInPage /> : <Navigate to="/" />}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;
