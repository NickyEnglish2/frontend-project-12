/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-one-expression-per-line */

import { useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import fetchChannels from '../../utilities/fetchChannels.js';
import { addChannel, removeChannel, updateChannel } from '../../slices/channelsSlice.js';
import { addMessage } from '../../slices/messagesSlice.js';
import socket from '../../utilities/socket.js';
import ModalRoot from '../../modals/ModalRoot.jsx';
import Header from '../Header.jsx';
import ChannelsSidebar from './ChannelsSidebar.jsx';
import ChatArea from './ChatArea.jsx';

const MainPage = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchChannels(token));
  }, [dispatch, token]);

  useEffect(() => {
    if (token) {
      socket.auth = { token };
      socket.connect();

      socket.on('newMessage', (payload) => {
        dispatch(addMessage(payload));
      });

      socket.on('newChannel', (payload) => {
        dispatch(addChannel(payload));
        toast.success(t('toasters.newChannel'), {
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

      socket.on('removeChannel', (payload) => {
        dispatch(removeChannel(payload.id));
        toast.error(t('toasters.deletedChannel'), {
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

      socket.on('renameChannel', (payload) => {
        dispatch(updateChannel(payload));
        toast.warn(t('toasters.editedChannel'), {
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

      socket.on('connect_error', (err) => {
        console.error('Ошибка подключения:', err.message);
        toast.warn(t('toasters.networkErr'), {
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

      socket.on('reconnect', () => {
        console.log('Подключение восстановлено');
        toast.success(t('toasters.networkRestored'), {
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
    }

    return () => {
      socket.off('newMessage');
      socket.off('newChannel');
      socket.off('removeChannel');
      socket.off('renameChannel');
      socket.off('connect_error');
      socket.off('reconnect');
    };
  }, [dispatch, token, t]);

  return (
    <>
      <Header showLogoutButton />
      <ToastContainer />
      <Container fluid style={{ height: 'calc(100vh - 56px)' }}>
        <Row className="h-100">
          <Col md={3} className="bg-light border-end p-3">
            <ChannelsSidebar />
          </Col>
          <Col md={9} className="p-3">
            <ChatArea />
          </Col>
        </Row>
        <ModalRoot />
      </Container>
    </>
  );
};

export default MainPage;
