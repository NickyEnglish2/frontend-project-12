import {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess, logout } from '../slices/authSlice';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [username, setUsername] = useState(localStorage.getItem('username') || null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const dispatch = useDispatch();

  const logIn = (userData) => {
    const { token: userToken, username: userName } = userData;
    localStorage.setItem('token', userToken);
    localStorage.setItem('username', userName);
    setToken(userToken);
    setUsername(userName);
    setIsAuthenticated(true);
    dispatch(loginSuccess(userData));
  };

  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setToken(null);
    setUsername(null);
    setIsAuthenticated(false);
    dispatch(logout());
  };

  // Синхронизация состояния контекста при загрузке
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');

    if (storedToken && storedUsername) {
      setToken(storedToken);
      setUsername(storedUsername);
      setIsAuthenticated(true);
      dispatch(loginSuccess({ token: storedToken, username: storedUsername }));
    }
  }, [dispatch]);

  const value = useMemo(() => ({
    token,
    username,
    isAuthenticated,
    logIn,
    logOut,
  }), [token, username, isAuthenticated, logIn, logOut]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
