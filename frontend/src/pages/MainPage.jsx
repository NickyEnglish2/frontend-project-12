import { useEffect, useState } from 'react';
import { Button, ListGroup, Form, Row, Col, Container, Card, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { logout } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { BiAddToQueue } from 'react-icons/bi';
import { FaEllipsisV } from "react-icons/fa";
import fetchChannels from '../utilities/fetchChannels.js';
import sendMessageApi from '../utilities/sendMessageApi.js';
import removeChannelApi from '../utilities/removeChannelApi.js';
import removeMessageApi from '../utilities/removeMessagesApi.js';
import { setCurrentChannel, addChannel, removeChannel, updateChannel } from '../slices/channelsSlice.js';
import { addMessage, removeMessage } from '../slices/messagesSlice.js';
import socket from '../utilities/socket.js';
import AddChannelModal from '../modals/AddChannelModal.jsx';
import ConfirmDeleteModal from '../modals/ConfirmDeleteModal.jsx';
import EditChannelModal from '../modals/EditChannelModal.jsx';

const MainPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { channels, currentChannelId } = useSelector((state) => state.channels);
  const { messages } = useSelector((state) => state.messages);
  const { token, username } = useSelector((state) => state.auth);

  const [showAddChannelModal, setShowAddChannelModal] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [showEditChannelModal, setShowEditChannelModal] = useState(false);
  const [channelToDelete, setChannelToDelete] = useState(null);
  const [channelToEdit, setChannelToEdit] = useState(null);

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

  const handleDeleteChannel = async () => {
    if (channelToDelete) {
      try {
        const messagesToDelete = messages.filter((msg) => msg.channelId === channelToDelete);

        await Promise.all(
          messagesToDelete.map((msg) => removeMessageApi(msg.id, token))
        );

        await removeChannelApi(channelToDelete, token);

        dispatch(removeMessage(channelToDelete));

        setShowConfirmDeleteModal(false);
      } catch (err) {
        console.error('Ошибка при удалении', err);
      }
    }
  };

  const handleEditChannel = (channel) => {
    setChannelToEdit(channel);
    setShowEditChannelModal(true);
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

      socket.on('newChannel', (payload) => {
        dispatch(addChannel(payload));
      });

      socket.on('removeChannel', (payload) => {
        dispatch(removeChannel(payload.id));
      });

      socket.on('renameChannel', (payload) => {
        console.log('Получены данные:', payload)
        dispatch(updateChannel(payload));
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
      socket.off('newChannel');
      socket.off('removeChannel');
      socket.off('renameChannel');
      socket.off('connect_error');
      socket.off('reconnect');
    };
  }, [dispatch, token]);

  return (
    <Container fluid className="vh-100">
      <Row className="h-100">
        <Col md={3} className="bg-light border-end p-3 d-flex flex-column">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">Каналы</h5>
            <Button
              variant="link"
              onClick={() => setShowAddChannelModal(true)}
              className="p-0"
              title="Добавить канал"
            >
              <BiAddToQueue size={20} />
            </Button>
          </div>
          <ListGroup variant="flush" className="flex-grow-1 mb-3">
            {channels.map((channel) => (
              <ListGroup.Item
                key={channel.id}
                action
                active={channel.id === currentChannelId}
                onClick={() => dispatch(setCurrentChannel(channel.id))}
                style={{ cursor: 'pointer' }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <span># {channel.name}</span>
                  {channel.removable && (
                    <Dropdown onClick={(e) => e.stopPropagation()}>
                      <Dropdown.Toggle 
                        variant="link"
                        id="dropdown-channel-actions"
                        className="p-1 rounded bg-light border-0"
                        style={{
                          backgroundColor: "#a4a4a4",
                          borderRadius: "4px",
                          padding: "4px 8px",
                        }}
                      >
                        <FaEllipsisV size={16} />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() => handleEditChannel(channel)}
                        >Редактировать</Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => {
                            setChannelToDelete(channel.id);
                            setShowConfirmDeleteModal(true);
                          }}
                        >
                          Удалить
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                </div>
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

      <AddChannelModal
        show={showAddChannelModal}
        onHide={() => setShowAddChannelModal(false)}
      />

      <ConfirmDeleteModal
        show={showConfirmDeleteModal}
        onHide={() => setShowConfirmDeleteModal(false)}
        onConfirm={handleDeleteChannel}
        channelName={channels.find((ch) => ch.id === channelToDelete)?.name || ''}
      />

      <EditChannelModal
        show={showEditChannelModal}
        onHide={() => setShowEditChannelModal(false)}
        channel={channelToEdit}
      />
    </Container>
  );
};

export default MainPage;
