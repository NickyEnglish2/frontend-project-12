import { Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage.jsx';
import LoginPage from './pages/LoginPage.jsx'
import NotFoundPage from './pages/NotFound.jsx';

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<MainPage />}/>
      <Route path='/login' element={<LoginPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;
