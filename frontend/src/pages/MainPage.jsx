import { useEffect } from 'react';
import { Button, ListGroup, Form, Row, Col, Container, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { logout } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import fetchChannels from '../utilities/fetchChannels.js';
import sendMessageApi from '../utilities/sendMessageApi.js';
import { setCurrentChannel } from '../slices/channelsSlice.js';
import { addMessage } from '../slices/messagesSlice.js';
import socket from '../utilities/socket.js';

const MainPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { channels, currentChannelId } = useSelector((state) => state.channels);
  const { messages } = useSelector((state) => state.messages);
  const { token, username } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchChannels(token));
  }, [dispatch, token]);

  const currentMessages = messages.filter((msg) => msg.channelId === currentChannelId);

  const formatMessageCount = (count) => {
    if (count === 1) return `${count} сообщение`;
    if (count > 1 && count < 5) return `${count} сообщения`;
    return `${count} сообщений`;
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleSelectChannel = (channelId) => {
    dispatch(setCurrentChannel(channelId));
  };

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: (values, { resetForm }) => {
      if (values.message.trim()) {
        dispatch(sendMessageApi({ body: values.message, channelId: currentChannelId, username }));
        resetForm();
      }
    },
  });

  useEffect(() => {
    if (token) {
      socket.auth = { token };
      socket.connect();

      socket.on('newMessage', (payload) => {
        dispatch(addMessage(payload));
      });

      socket.on('connect_error', (err) => {
        console.error('Ошибка подключения:', err.message);
      });

      socket.on('reconnect', () => {
        console.log('Подключение восстановлено');
      });
    }

    return () => {
      socket.off('newMessage');
      socket.off('connect_error');
      socket.off('reconnect');
    };
  }, [dispatch, token]);

  return (
    <Container fluid className="vh-100">
      <Row className="h-100">
        <Col md={3} className="bg-light border-end p-3 d-flex flex-column">
          <h5 className="mb-3">Каналы</h5>
          <ListGroup variant="flush" className="flex-grow-1 mb-3">
            {channels.map((channel) => (
              <ListGroup.Item
                key={channel.id}
                action
                active={channel.id === currentChannelId}
                onClick={() => handleSelectChannel(channel.id)}
                style={{ cursor: 'pointer' }}
              >
                # {channel.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Button variant="danger" onClick={handleLogout} className="w-100">
            Выйти
          </Button>
        </Col>

        <Col md={9} className="d-flex flex-column h-100 p-3">
          <Card className="flex-grow-1 mb-3">
            <Card.Body className="d-flex flex-column">
              <Card.Title>
                # {channels.find((ch) => ch.id === currentChannelId)?.name}{' '}
                <small className="text-muted">
                  {formatMessageCount(currentMessages.length)}
                </small>
              </Card.Title>
              <div className="overflow-auto flex-grow-1 mb-3">
                {currentMessages.map((msg) => (
                  <div key={msg.id} className="mb-2">
                    <strong>{msg.username}: </strong>
                    {msg.body}
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>

          <Form onSubmit={formik.handleSubmit} className="mt-auto">
            <Form.Group>
              <Form.Control
                as="textarea"
                name="message"
                rows={2}
                placeholder="Введите сообщение..."
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.message && !!formik.errors.message}
                required
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" className="mt-2">
              Отправить
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default MainPage;
