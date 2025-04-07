/* eslint-disable react/function-component-definition */

import { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider, ErrorBoundary } from '@rollbar/react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import AppRouter from './AppRouter.jsx';
import i18n from './i18n.js';
import createSocket from './utilities/socket.js';
import { addMessage } from './slices/messagesSlice.js';
import { addChannel, removeChannel, updateChannel } from './slices/channelsSlice.js';
import { addRussianDictionary } from './utilities/censorText.js';

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const rollbarConfig = {
    accessToken: import.meta.env.VITE_ROLLBAR_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    environment: 'production',
  };

  useEffect(() => {
    if (!token) return undefined;
    if (token) {
      const socketInstance = createSocket();
      socketInstance.auth = { token };
      socketInstance.connect();

      socketInstance.on('newMessage', (payload) => {
        dispatch(addMessage(payload));
      });

      socketInstance.on('newChannel', (payload) => {
        dispatch(addChannel(payload));
        toast.success(i18n.t('toasters.newChannel'), {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      });

      socketInstance.on('removeChannel', (payload) => {
        dispatch(removeChannel(payload.id));
        toast.error(i18n.t('toasters.deletedChannel'), {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      });

      socketInstance.on('renameChannel', (payload) => {
        dispatch(updateChannel(payload));
        toast.warn(i18n.t('toasters.editedChannel'), {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      });

      socketInstance.on('connect_error', (err) => {
        console.error('Ошибка подключения:', err.message);
        toast.warn(i18n.t('toasters.networkErr'), {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      });

      socketInstance.on('reconnect', () => {
        console.log('Подключение восстановлено');
        toast.success(i18n.t('toasters.networkRestored'), {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      });

      return () => {
        socketInstance.off('newMessage');
        socketInstance.off('newChannel');
        socketInstance.off('removeChannel');
        socketInstance.off('renameChannel');
        socketInstance.off('connect_error');
        socketInstance.off('reconnect');
        socketInstance.disconnect();
      };
    }
  }, [dispatch, token]);

  addRussianDictionary('ru');

  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <I18nextProvider i18n={i18n} defaultNS="translation">
          <AppRouter />
        </I18nextProvider>
      </ErrorBoundary>
    </Provider>
  );
}

export default App;
