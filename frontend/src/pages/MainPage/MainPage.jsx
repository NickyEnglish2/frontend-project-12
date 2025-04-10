/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-one-expression-per-line */

import { useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import { useApi } from '../../contexts/ApiContext.jsx';
import ModalRoot from '../../modals/ModalRoot.jsx';
import Header from '../Header.jsx';
import ChannelsSidebar from './ChannelsSidebar.jsx';
import ChatArea from './ChatArea.jsx';

const MainPage = () => {
  const { fetchChannels } = useApi();

  useEffect(() => {
    fetchChannels();
  }, [fetchChannels]);

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
